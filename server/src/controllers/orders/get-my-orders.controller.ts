import { Request, Response } from "express";
import Order from "../../models/order.model";

interface AuthRequest extends Request {
  user?: any;
}

export const getMyOrders = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("orderItems.food")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
