import "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      role: string;
    }
  }
}

declare module "express" {
  interface Request {
    user?: Express.User;
    parsedQuery?: unknown;
    requestId?: string;
  }
}
