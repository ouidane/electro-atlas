import { User, Token, UserDoc, TokenDoc } from "../models";
import createError from "http-errors";
import crypto from "crypto";
import { EmailService } from "./emailService";
import { CartService } from "./cartService";
import { JwtService } from "../utils/tokenUtils";
import { WishlistService } from "./wishlistService";
import { Types } from "mongoose";
import { LoginSchema, RegisterSchema } from "../middlewares/validateAuth";
import config from "../config/config";

export class AuthService {
  private static generateVerificationCode(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  private static async resendVerificationEmail(user: UserDoc) {
    const timeToRequestNewCode = 30 * 1000;
    const maxRequestsPerHour = 5;
    const oneHour = 60 * 60 * 1000;
    const currentTime = Date.now();

    // Filter out old requests
    const requestHistory = user.verificationTokenRequestHistory?.filter(
      (timestamp: Date) => currentTime - timestamp.getTime() < oneHour,
    );

    // Limit the number of requests
    if (requestHistory.length >= maxRequestsPerHour) {
      throw createError(400, "Please try again later.");
    }

    const lastRequestTime = user.verificationTokenRequestHistory[-1];
    if (lastRequestTime > new Date(Date.now() - timeToRequestNewCode)) {
      throw createError(400, "Please wait before requesting another code");
    }

    const tenMinutes = 1000 * 60 * 10;
    const verificationTokenExpirationDate = new Date(Date.now() + tenMinutes);
    const verificationCode = this.generateVerificationCode();
    const verificationToken = JwtService.generateGenericToken({
      verificationCode,
      email: user.email,
    });

    user.verificationToken = verificationToken;
    user.verificationTokenExpirationDate = verificationTokenExpirationDate;
    user.verificationTokenRequestHistory?.push(new Date(currentTime));
    await user.save();

    const origin = config.clientUrl || config.baseUrl;
    await EmailService.sendVerificationEmail({
      email: user.email,
      verificationCode,
      origin,
    });
  }

  static async revokeToken(userId: Types.ObjectId | string) {
    const token = await Token.findOneAndUpdate(
      { userId },
      { $inc: { tokenVersion: 1 }, isValid: false },
      { new: true },
    );
    return token;
  }

  static async findOrCreateToken(
    user: Pick<UserDoc, "_id" | "role">,
    requestInfo: { ip: string; userAgent: string },
  ): Promise<TokenDoc> {
    let token = await Token.findOne({ userId: user._id });
    let refreshToken;
    if (!token) {
      refreshToken = JwtService.generateRefreshToken({
        userId: user._id.toString(),
        role: user.role,
        tokenVersion: 1,
      });

      token = await Token.create({
        userId: user._id.toString(),
        role: user.role,
        refreshToken,
        ip: requestInfo.ip,
        userAgent: requestInfo.userAgent,
      });
    } else {
      refreshToken = JwtService.generateRefreshToken({
        userId: user._id.toString(),
        role: user.role,
        tokenVersion: token.tokenVersion + 1,
      });
      token.refreshToken = refreshToken;
      token.tokenVersion += 1;
      token.ip = requestInfo.ip;
      token.isValid = true;
      token.userAgent = requestInfo.userAgent;
      await token.save();
    }

    return token;
  }

  private static async createUser(userData: {
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    const { email, password, confirmPassword } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError(409, "Email already exists");
    }

    const verificationCode = this.generateVerificationCode();
    const verificationToken = JwtService.generateGenericToken({
      verificationCode,
      email,
      createdAt: Date.now(),
    });

    const tenMinutes = 1000 * 60 * 10;
    const verificationTokenExpirationDate = new Date(Date.now() + tenMinutes);

    const user = await User.create({
      email,
      password,
      confirmPassword,
      verificationToken,
      verificationTokenExpirationDate,
      verificationTokenRequestHistory: [new Date(Date.now())],
    });

    const origin = config.clientUrl || config.baseUrl;
    await EmailService.sendVerificationEmail({
      email,
      verificationCode,
      origin,
    });

    return user;
  }

  static async registerUser(userData: RegisterSchema): Promise<void> {
    const { email, password, confirmPassword, cartItems, wishlist } = userData;

    const user = await this.createUser({
      email,
      password,
      confirmPassword,
    });

    const tasks = [];
    if (cartItems) {
      tasks.push(CartService.addCartToDatabase(cartItems, user._id));
    }
    if (wishlist) {
      tasks.push(WishlistService.addWishlistToDatabase(wishlist, user._id));
    }
    if (tasks.length > 0) {
      await Promise.all(tasks);
    }
  }

  private static async validateUserCredentials({
    email,
    password,
  }: LoginSchema): Promise<UserDoc> {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw createError(401, "Invalid email or password");
    }
    return user;
  }

  static async loginUser(
    userData: LoginSchema,
    requestInfo: { ip: string; userAgent: string },
  ) {
    const user = await this.validateUserCredentials(userData);

    if (!user.isVerified) {
      await this.resendVerificationEmail(user);
      throw createError(403, "Email not verified");
    }

    const token = await this.findOrCreateToken(user, requestInfo);

    const accessToken = JwtService.generateAccessToken(token);

    return { accessToken, refreshToken: token.refreshToken };
  }

  static async resendVerificationCode(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, "User not found");
    }

    if (user.isVerified) {
      throw createError(400, "User is already verified");
    }

    await this.resendVerificationEmail(user);
  }

  static async verifyUserEmail(verificationCode: string, email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, "User not found");
    }

    const hashedToken = JwtService.verifyGenericToken(user.verificationToken!);
    if (
      !hashedToken ||
      verificationCode !== hashedToken.verificationCode ||
      user.verificationTokenExpirationDate! < new Date()
    ) {
      throw createError(401, "Invalid or expired token.");
    }

    user.isVerified = true;
    const verifiedDate = new Date();
    user.verified = verifiedDate;
    user.verificationToken = undefined;
    user.verificationTokenExpirationDate = undefined;
    await user.save();
  }

  static async forgotUserPassword(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, "User not found");
    }

    const TIME_TO_REQUEST_NEW_CODE = 60 * 1000; // 1 minute
    const MAX_REQUESTS_PER_MONTH = 5;
    const ONE_MONTH = 30 * 24 * 60 * 60 * 1000; // 30 days
    const currentTime = new Date();

    // Filter out requests older than one month
    const requestHistory = (user.passwordTokenRequestHistory ?? []).filter(
      (timestamp: Date) =>
        currentTime.getTime() - timestamp.getTime() < ONE_MONTH,
    );

    // Limit the number of requests
    if (requestHistory.length >= MAX_REQUESTS_PER_MONTH) {
      throw createError(
        400,
        "You've requested too many reset password codes. Please try again later.",
      );
    }

    const lastRequestTime =
      user.passwordTokenRequestHistory.at(-1) || new Date();
    if (lastRequestTime > new Date(Date.now() - TIME_TO_REQUEST_NEW_CODE)) {
      throw createError(400, "Please wait before requesting another code");
    }

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
    const passwordToken = crypto.randomBytes(70).toString("hex");
    const resetToken = JwtService.generateGenericToken({
      userId: user._id,
      passwordToken,
    });

    user.passwordToken = passwordToken;
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    user.passwordTokenRequestHistory?.push(new Date(currentTime));
    await user.save();

    const origin = config.clientUrl || config.baseUrl;
    await EmailService.sendResetPasswordEmail({
      email: user.email,
      token: resetToken,
      origin,
    });
  }

  static async resetUserPassword({
    resetToken,
    password,
    confirmPassword,
  }: {
    resetToken: string;
    password: string;
    confirmPassword: string;
  }): Promise<void> {
    const hashedToken = JwtService.verifyGenericToken(resetToken);
    if (!hashedToken) {
      throw createError(401, "Invalid or expired token");
    }

    const user = await User.findById(hashedToken.userId);
    if (!user) {
      throw createError(404, "User not found");
    }

    if (
      user.passwordToken !== hashedToken.passwordToken ||
      !user.passwordTokenExpirationDate ||
      user.passwordTokenExpirationDate <= new Date()
    ) {
      throw createError(401, "Invalid or expired token");
    }

    user.password = password;
    user.confirmPassword = confirmPassword;
    user.passwordToken = undefined;
    user.passwordTokenExpirationDate = undefined;
    await user.save();
  }

  static async refreshToken(
    cookie: string,
    requestInfo: { ip: string; userAgent: string },
  ) {
    if (!cookie) {
      throw createError(401, "Invalid or expired token");
    }

    const payload = JwtService.verifyRefreshToken(cookie);

    if (!payload) {
      throw createError(401, "Invalid or expired token");
    }

    const token = await Token.findOne({ userId: payload.sub });

    if (
      !token ||
      token.tokenVersion !== payload.tokenVersion ||
      !token.isValid
    ) {
      throw createError(403, "Token has been revoked. Please login again.");
    }

    // Increment version, regenerate tokens, update IP/User-Agent
    token.tokenVersion += 1;
    token.refreshToken = JwtService.generateRefreshToken(token);
    token.ip = requestInfo.ip;
    token.userAgent = requestInfo.userAgent;

    await token.save();

    const accessToken = JwtService.generateAccessToken(token);

    return {
      accessToken,
      refreshToken: token.refreshToken,
    };
  }
}
