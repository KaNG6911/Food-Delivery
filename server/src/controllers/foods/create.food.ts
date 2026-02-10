import { Request, Response } from "express";
import Food from "../../models/food.model";

export const createFood = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, description, price, image, category, discount } = req.body;

    const food = await Food.create({
      name,
      description,
      price,
      image,
      category,
      discount: discount || 0,
    });

    res.status(201).json({
      success: true,
      message: "Хоол амжилттай үүсгэгдлээ",
      data: food,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
