import { Request, Response } from "express";
import User from "../models/user.model";

// Нэвтрэх
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email болон нууц үгээ оруулна уу",
      });
      return;
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Email эсвэл нууц үг буруу байна",
      });
      return;
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Email эсвэл нууц үг буруу байна",
      });
      return;
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Одоогийн хэрэглэгч
export const getMe = async (req: any, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
