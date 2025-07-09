import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { HttpError } from "http-errors";
import { logger } from "../utils/logger";
import config from "../config/config";
import { ZodError } from "zod";
import { MulterError } from "multer";

type ErrorData = {
  message: string;
  errors?: string;
};

// Helper to extract errors from a ZodError
export const extractZodErrors = (zodError: ZodError): string => {
  const errors = zodError.errors.reduce(
    (acc, error) => {
      acc[error.path.join(".")] = error.message;
      return acc;
    },
    {} as Record<string, string>
  );
  return JSON.stringify(errors);
};

// Helper to extract errors from Mongoose ValidationError
const extractMongooseValidationErrors = (
  error: mongoose.Error.ValidationError
): string => {
  const errors = Object.values(error.errors).reduce(
    (acc, item) => ({
      ...acc,
      [item.path]: item.message,
    }),
    {}
  );
  return JSON.stringify(errors);
};

// Utility type guard for checking if a value is an object
const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object";

// Helper to extract errors from Mongoose Duplicate Key Error
const extractDuplicateKeyError = (
  error: unknown
): { message: string; errors?: string } => {
  if (isObject(error) && "keyPattern" in error) {
    const keyPatternValue = (error as Record<string, unknown>).keyPattern;
    const keyFields = isObject(keyPatternValue)
      ? Object.keys(keyPatternValue as Record<string, unknown>)
      : [];

    if (keyFields.includes("productId") && keyFields.includes("userId")) {
      return { message: "User already reviewed the product" };
    }
    if (keyFields.includes("email") && keyFields.includes("platform")) {
      return { message: "Email already exists" };
    }
    return {
      message: "Duplicate Key Error: Resource already exists",
      errors: JSON.stringify({ [keyFields[0]]: "Resource already exists" }),
    };
  }
  return { message: "Duplicate Key Error: Resource already exists" };
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // If the response is already sent or debug flag is on,
  // pass the error to the default Express handler
  if (res.headersSent || config.debug) {
    return next(err);
  }

  let statusCode = 500;
  let responseData: ErrorData = { message: "Internal Server Error" };

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    responseData.message = err.message;
    responseData.errors = JSON.stringify(err.errors);
  } else if (err instanceof ZodError) {
    statusCode = 400;
    responseData.message = "Validation Error";
    responseData.errors = extractZodErrors(err);
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    responseData.message = "Validation Error";
    responseData.errors = extractMongooseValidationErrors(err);
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    responseData.message = "Invalid data format";
    responseData.errors = JSON.stringify({ [err.path]: "Invalid data format" });
  } else if (isObject(err) && "code" in err && err.code === 11000) {
    statusCode = 409;
    responseData = { ...responseData, ...extractDuplicateKeyError(err) };
  } else if (err instanceof MulterError) {
    statusCode = 400;
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        responseData.message = `File size exceeds the allowed limit of ${err.field}`;
        break;
      case "LIMIT_UNEXPECTED_FILE":
        responseData.message = `Unexpected file field: ${err.field}`;
        break;
      case "LIMIT_PART_COUNT":
        responseData.message = `Too many fields`;
        break;
      default:
        responseData.message = err.message;
        break;
    }
  }

  // Log the error with detailed context
  logger.error(`Error occurred: ${responseData.message}`, {
    logMetadata: "ERROR_HANDLER",
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    userId: req.user?.id,
    requestId: req.requestId,
    statusCode,
    stack: err instanceof Error && err.stack,
    errorName: err instanceof Error && err.name,
    errors: responseData.errors,
  });

  res.status(statusCode).json(responseData);
};
