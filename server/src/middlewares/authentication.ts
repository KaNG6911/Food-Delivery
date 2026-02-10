import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

// Interface for JWT payload
interface JWTPayload {
  id: string;
  role: string;
}

// Extended Request interface
export interface AuthRequest extends Request {
  user?: any;
}

// Token шалгах middleware
export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let token: string | undefined;

  // Token авах
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Энэ үйлдлийг хийхийн тулд нэвтэрнэ үү",
    });
    return;
  }

  try {
    // Token verify хийх
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JWTPayload;

    // User олох
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token буруу эсвэл хүчингүй байна",
    });
  }
};
