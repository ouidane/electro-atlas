import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { ROLE } from "../utils/constants";
import { Order, Wishlist, Cart, Product, Review, OrderItem } from "../models";
import { Model as MongooseModel, Document } from "mongoose";
import { JwtService } from "../utils/tokenUtils";

// Is authenticated ================================================================
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(createError(401, "Access Denied"));
  }

  const token = authHeader.split(" ")[1];

  const payload = JwtService.verifyAccessToken(token);

  if (!payload || !payload.sub) return next(createError(403, "Access Denied"));

  req.user = { id: payload.sub, role: payload.role };
  next();
};

export const permit = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user!;

    if (!roles.includes(role)) {
      return next(createError(403, "Unauthorized to access this route"));
    }

    next();
  };
};

function verifyCsrfToken(req: Request, res: Response, next: NextFunction) {
  const csrfCookie = req.cookies.csrfToken;
  const csrfHeader = req.get("CSRF-Token");

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return next(createError(403, "Invalid CSRF token"));
  }

  next();
}

const authorizeAccess = <T extends Document>(
  resourceName: string,
  Model: MongooseModel<T>,
  idField: keyof T,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const resourceId = req.params[`${resourceName.toLowerCase()}Id`];
    const { id, role } = req.user!;

    if (role === ROLE.ADMIN) return next();

    const resource = await Model.findById(resourceId).lean();
    if (!resource) return next(createError(404, `${resourceName} not found`));

    if (resource[idField]?.toString() === id) {
      return next();
    }

    next(createError(403, `Unauthorized to access this ${resourceName}`));
  };
};

export const cartAccess = authorizeAccess("Cart", Cart, "userId");
export const reviewAccess = authorizeAccess("Review", Review, "userId");
export const wishlistAccess = authorizeAccess("Wishlist", Wishlist, "userId");
export const orderAccess = authorizeAccess("Order", Order, "userId");
