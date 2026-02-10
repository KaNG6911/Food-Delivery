// import { Request, Response } from "express";

// export const getUserByIdAndPost = async (req: Request, res: Response) => {
//   try {
//     console.log(req.params);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const getUserByIdAndGet = async (req: Request, res: Response) => {
//   try {
//   } catch (error) {
//     console.error(error);
//   }
// };

import { Request, Response } from "express";
import User from "../../models/user.model";

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй",
      });
      return;
    }

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
