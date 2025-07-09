import express, { Express } from "express";
import {
  morganMiddleware,
  rawBodyMiddleware,
  corsMiddleware,
  rateLimitMiddleware,
  notFound,
  errorHandler,
  assignRequestId,
} from "./middlewares";
import cookieParser from "cookie-parser";
import passport from "passport";
import configurePassport from "./utils/passport";
import { v1Routes, apiDocsRoute } from "./routes";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

const configureServer = async (app: Express) => {
  //Security-related settings
  //   app
  //     .disable("x-powered-by")
  //     .set("trust proxy", 1)
  //     .use(helmet())
  //     .use(mongoSanitize());

  // logging & rate limiting
  app.use(assignRequestId);
  app.use(rateLimitMiddleware);
  app.use(morganMiddleware);

  // Request parsing
  app.use(express.urlencoded({ extended: true }));
  app.use(rawBodyMiddleware);
  app.use(cookieParser());

  // CORS
  app.use(corsMiddleware);

  // Passport authentication
  app.use(passport.initialize());
  configurePassport(passport);

  // Routes
  app.use("/api-docs", apiDocsRoute);
  app.use("/api/v1", v1Routes);

  // Handling errors
  app.use(notFound);
  app.use(errorHandler);
};

export default configureServer;
