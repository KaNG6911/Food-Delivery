import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  orderItems: Array<{
    food: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    district: string;
    phoneNumber: string;
  };
  paymentMethod: string;
  deliveryFee: number;
  totalPrice: number;
  orderStatus: string;
  isPaid: boolean;
  isDelivered: boolean;
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        food: {
          type: Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Бэлнээр", "Картаар", "Qpay"],
    },
    deliveryFee: {
      type: Number,
      default: 5000,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    orderStatus: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "PREPARING",
        "DELIVERING",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PENDING",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IOrder>("Order", orderSchema);
