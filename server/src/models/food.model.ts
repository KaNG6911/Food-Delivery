import mongoose, { Schema, Document } from "mongoose";

export interface IFood extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  discount: number;
}

const foodSchema = new Schema<IFood>(
  {
    name: {
      type: String,
      required: [true, "Хоолны нэрээ оруулна уу"],
    },
    description: {
      type: String,
      required: [true, "Тайлбар оруулна уу"],
    },
    price: {
      type: Number,
      required: [true, "Үнээ оруулна уу"],
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Үндсэн хоол", "Салад", "Амттан", "Ундаа", "Зууш", "Бусад"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IFood>("Food", foodSchema);
