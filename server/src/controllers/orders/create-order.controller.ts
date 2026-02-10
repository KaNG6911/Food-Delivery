import { Request, Response } from "express";
import Order from "../../models/order.model";
import Food from "../../models/food.model";

interface AuthRequest extends Request {
  user?: any;
}

export const createOrder = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400).json({
        success: false,
        message: "Захиалга хоосон байна",
      });
      return;
    }

    let totalPrice = 0;
    const items = [];

    for (const item of orderItems) {
      const food = await Food.findById(item.food);

      if (!food) {
        res.status(404).json({
          success: false,
          message: `Хоол олдсонгүй`,
        });
        return;
      }

      const price =
        food.discount > 0
          ? food.price - (food.price * food.discount) / 100
          : food.price;

      totalPrice += price * item.quantity;

      items.push({
        food: food._id,
        quantity: item.quantity,
        price: price,
      });
    }

    const deliveryFee = 5000;
    totalPrice += deliveryFee;

    const order = await Order.create({
      user: req.user.id,
      orderItems: items,
      shippingAddress,
      paymentMethod,
      deliveryFee,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      message: "Захиалга амжилттай үүсгэгдлээ",
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
