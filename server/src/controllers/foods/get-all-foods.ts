import { Request, Response } from "express";
import Food from "../../models/food.model";

export const getAllFoods = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { category } = req.query;

    let query: any = { isAvailable: true };

    if (category) {
      query.category = category;
    }

    const foods = await Food.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foods.length,
      data: foods,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
