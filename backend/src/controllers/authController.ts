import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { AuthService } from "../services/authService";
import { JwtService } from "../utils/tokenUtils";
import qs from "qs";
import { Types } from "mongoose";
import config from "../config/config";
import { logger } from "../utils/logger";
import { RoleType } from "../utils/constants";

class AuthController {
  // register endpoint
  async register(req: Request, res: Response) {
    await AuthService.registerUser(req.body);
    res.sendStatus(204);
  }

  // login endpoint
  async login(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip ?? "unknown";
    const userAgent = req.headers["user-agent"] ?? "unknown";

    const { accessToken, refreshToken } = await AuthService.loginUser(
      req.body,
      { ip, userAgent },
    );

    JwtService.sendRefreshToken(res, refreshToken);
    res.status(200).json({ accessToken });
  }

  // logout endpoint
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.jid;
      if (!token) {
        JwtService.clearRefreshToken(res);
        res.sendStatus(204);
        return;
      }

      const payload = JwtService.verifyRefreshToken(token);
      if (payload && payload.sub) {
        await AuthService.revokeToken(payload.sub);
      }

      JwtService.clearRefreshToken(res);
      res.sendStatus(204);
    } catch {
      JwtService.clearRefreshToken(res);
      res.sendStatus(204);
    }
  }

  // verify Email endpoint
  async verifyEmail(req: Request, res: Response) {
    const { verificationCode, email } = req.body;

    await AuthService.verifyUserEmail(verificationCode, email);
    res.sendStatus(204);
  }

  // Resend verification code endpoint
  async resendVerificationCode(req: Request, res: Response) {
    const { email } = req.body;

    await AuthService.resendVerificationCode(email);
    res.sendStatus(204);
  }

  // forgot password endpoint
  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    await AuthService.forgotUserPassword(email);
    res.status(200).json({ message: "Check your email for the reset link" });
  }

  // reset password endpoint
  async resetPassword(req: Request, res: Response) {
    const { resetToken, password, confirmPassword } = req.body;

    await AuthService.resetUserPassword({
      resetToken,
      password,
      confirmPassword,
    });
    res.sendStatus(204);
  }

  // Initiate Google Authentication
  async initiateGoogleAuth(req: Request, res: Response, next: NextFunction) {
    const callbackUrl = (req.query.callbackUrl as string) || "/";
    const ip = req.ip ?? "unknown";
    const userAgent = req.headers["user-agent"] ?? "unknown";

    passport.authenticate("google", {
      scope: ["profile", "email"],
      state: encodeURIComponent(qs.stringify({ callbackUrl, ip, userAgent })),
    })(req, res, next);
  }

  // Google Authentication Callback
  async googleAuthCallback(req: Request, res: Response, next: NextFunction) {
    const state = req.query.state as string;

    const origin = config.clientUrl || config.baseUrl;
    const stateStr = decodeURIComponent(state || "");
    const { redirectUrl, ip, userAgent } = qs.parse(stateStr) as {
      redirectUrl: string;
      ip: string;
      userAgent: string;
    };

    passport.authenticate(
      "google",
      { session: false },
      async (err: Error | null, user: Express.User | false, info: unknown) => {
        if (!user || err) {
          return res.redirect(
            `${origin}/signin?error=Failed to sign in with Google`,
          );
        }

        try {
          const userData = {
            _id: new Types.ObjectId(user.id),
            role: user.role as RoleType,
          };
          const token = await AuthService.findOrCreateToken(userData, {
            ip,
            userAgent,
          });

          const accessToken = JwtService.generateAccessToken(token);

          JwtService.sendRefreshToken(res, token.refreshToken);

          res.redirect(
            `${origin}/oauth?token=${accessToken}&redirect=${redirectUrl}`,
          );
        } catch (error) {
          logger.error("Google auth error", error);
          return res.redirect(`${origin}/signin?error=Authentication error`);
        }
      },
    )(req, res, next);
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    const jid = req.cookies.jid;
    const ip = req.ip ?? "unknown";
    const userAgent = req.headers["user-agent"] ?? "unknown";
    const { accessToken, refreshToken } = await AuthService.refreshToken(jid, {
      ip,
      userAgent,
    });

    JwtService.sendRefreshToken(res, refreshToken);

    res.status(200).json({ accessToken });
  }
}

export const authController = new AuthController();
