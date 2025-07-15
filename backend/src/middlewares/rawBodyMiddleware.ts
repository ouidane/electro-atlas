import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";

export const rawBodyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.originalUrl === "/api/v1/payments/webhook") {
    bodyParser.raw({ type: "application/json" })(req, res, next);
  } else {
    bodyParser.json()(req, res, next);
  }
};

export default rawBodyMiddleware;
