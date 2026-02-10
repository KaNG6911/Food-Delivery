// import { Request, Response } from "express";
// import UserModel = require("../../models");

// export const createNewUser = async (req: Request, res: Response) => {
//   try {
//     await UserModel.create();
//   } catch (error) {
//     console.error(error);
//   }
// };

import { Request, Response } from "express";
import User from "../../models/user.model";

export const createNewUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, password, phoneNumber, address } = req.body;

    // Email давхцаж байгаа эсэхийг шалгах
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        success: false,
        message: "Энэ email хаяг аль хэдийн бүртгэгдсэн байна",
      });
      return;
    }

    // User үүсгэх
    const user = await User.create({
      name,
      email,
      password,
      phoneNumber,
      address,
    });

    res.status(201).json({
      success: true,
      message: "Бүртгэл амжилттай!",
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
