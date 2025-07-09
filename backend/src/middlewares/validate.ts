import { RequestHandler, Request } from "express";
import { ZodSchema, z, infer as zInfer } from "zod";
import qs from "qs";
import { Types } from "mongoose";

export function validateBody(schema: ZodSchema): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(result.error);
    }

    req.body = result.data;
    next();
  };
}

export function validateQuery<T extends ZodSchema>(schema: T): RequestHandler {
  return (req, res, next) => {
    const [_, queryString] = req.url.split("?");
    const parsedQuery = qs.parse(queryString, { allowDots: true });
    const result = schema.safeParse(parsedQuery);

    if (!result.success) {
      return next(result.error);
    }

    (req as Request & { parsedQuery: zInfer<T> }).parsedQuery = result.data;
    next();
  };
}

export const createEnumSchema = (values: string[], errorMessage: string) =>
  z.enum(values as [string, ...string[]], {
    errorMap: () => ({ message: errorMessage }),
  });

export const createObjectIdSchema = (errorMessage: string = "Invalid ID") =>
  z
    .string()
    .refine((id) => Types.ObjectId.isValid(id), { message: errorMessage });

export const createFloatSchema = z
  .string()
  .transform((val) => parseFloat(val))
  .optional();

export const createIntSchema = z
  .string()
  .transform((val) => parseInt(val))
  .optional();

export const stringToArraySchema = z.preprocess(
  (val) =>
    typeof val === "string"
      ? val.split(",").map((s) => s.trim())
      : Array.isArray(val)
        ? val
        : [],
  z.array(z.string())
);
