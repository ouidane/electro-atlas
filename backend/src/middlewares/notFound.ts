import { logger } from "../utils/logger";
import { NextFunction, Request, Response } from "express";

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const message = `Route not found: ${req.method} ${req.originalUrl}`;

  logger.warn(message, {
    logMetadata: "NOT_FOUND",
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  res.status(404).json({ message });
};
