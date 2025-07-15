import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { Response } from "express";
import { TokenDoc } from "../models";
import { randomBytes } from "crypto";
import config from "../config/config";
import { logger } from "./logger";

const { secretKey, accessTokenSecret, refreshTokenSecret } = config.jwt;

export type TokenPayloadType = {
  _id?: string;
  userId: string;
  role: string;
  tokenVersion: number;
};

export class JwtService {
  private static sign(payload: object, secret: string, options?: SignOptions) {
    return jwt.sign(payload, secret, options);
  }

  private static verify(token: string, secret: string): JwtPayload | null {
    try {
      return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
      logger.error("Error jwt verify", error);
      return null;
    }
  }

  static generateGenericToken(
    payload: object,
    expiresIn: SignOptions["expiresIn"] = "10m",
  ) {
    return this.sign(payload, secretKey, { expiresIn });
  }

  static generateAccessToken(payload: TokenDoc) {
    return this.sign(
      {
        sub: payload.userId,
        role: payload.role,
        tokenVersion: payload.tokenVersion,
      },
      accessTokenSecret,
      // { expiresIn: "15m" },
      { expiresIn: "1d" },
    );
  }

  static generateRefreshToken(payload: TokenPayloadType | TokenDoc) {
    return this.sign(
      {
        sub: payload.userId,
        tokenVersion: payload.tokenVersion,
      },
      refreshTokenSecret,
      { expiresIn: "7d" },
    );
  }

  static verifyGenericToken(token: string) {
    return this.verify(token, secretKey);
  }

  static verifyAccessToken(token: string) {
    return this.verify(token, accessTokenSecret);
  }

  static verifyRefreshToken(token: string) {
    return this.verify(token, refreshTokenSecret);
  }

  static sendRefreshToken(res: Response, token: string) {
    res.cookie("jid", token, {
      path: "/",
      httpOnly: config.isProd,
      secure: config.isProd,
      sameSite: config.isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // domain: ".electro-atlas.com",
    });
  }

  static sendCSRFToken(res: Response) {
    // Generate a CSRF token
    const csrfToken = randomBytes(32).toString("hex");

    res.cookie("csrfToken", csrfToken, {
      path: "/",
      httpOnly: false,
      secure: config.isProd,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // domain: ".electro-atlas.com",
    });

    // return csrfToken;
  }

  static clearRefreshToken(res: Response) {
    res.clearCookie("jid", {
      path: "/",
      httpOnly: config.isProd,
      secure: config.isProd,
      sameSite: "none",
      // domain: ".electro-atlas.com",
    });
  }
}
