// src/middlewares/requestId.ts
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

export const assignRequestId = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  req.requestId = uuidv4();
  res.setHeader("X-Request-ID", req.requestId);
  next();
};
