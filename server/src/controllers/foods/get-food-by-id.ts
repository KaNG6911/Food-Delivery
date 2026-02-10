import { Request, Response } from "express";
import Food from "../../models/food.model";

export const getFoodById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      res.status(404).json({
        success: false,
        message: "Хоол олдсонгүй",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: food,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
