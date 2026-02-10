import { Response, NextFunction } from "express";
import { AuthRequest } from "./authentication";

// Role-based authorization
export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `${req.user?.role} эрхтэй хэрэглэгч энэ үйлдлийг хийх эрхгүй`,
      });
      return;
    }
    next();
  };
};
