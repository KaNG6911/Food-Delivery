// import { models, model, Schema, Model } from "mongoose";

// type User = {
//   name: string;
//   phoneNumber: string;
// };

// const UserSchema = new Schema<User>({
//   name: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
// });

// export const UserModel: Model<User> =
//   models["Users"] || model("Users", UserSchema);

import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: "user" | "admin" | "restaurant";
  address?: {
    street?: string;
    city?: string;
    district?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  profileImage?: string;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpire?: Date;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;

  // Methods
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
  getEmailVerificationToken(): string;
  getResetPasswordToken(): string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Нэрээ оруулна уу"],
      trim: true,
      maxlength: [50, "Нэр 50 тэмдэгтээс хэтрэхгүй"],
    },
    email: {
      type: String,
      required: [true, "Email хаягаа оруулна уу"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email хаяг буруу байна",
      ],
    },
    password: {
      type: String,
      required: [true, "Нууц үгээ оруулна уу"],
      minlength: [6, "Нууц үг дор хаяж 6 тэмдэгт байх ёстой"],
      select: false,
    },
    phoneNumber: {
      type: String,
      required: [true, "Утасны дугаараа оруулна уу"],
      match: [/^[0-9]{8}$/, "Утасны дугаар 8 оронтой байх ёстой"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "restaurant"],
      default: "user",
    },
    address: {
      street: String,
      city: String,
      district: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    profileImage: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  },
);

// Password hash хийх
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Password таарч байгаа эсэхийг шалгах
userSchema.methods.matchPassword = async function (
  enteredPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// JWT token үүсгэх
userSchema.methods.getSignedJwtToken = function (): string {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRE as string,
    },
  );
};

// Email verification token үүсгэх
userSchema.methods.getEmailVerificationToken = function (): string {
  const verificationToken = crypto.randomBytes(20).toString("hex");

  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.emailVerificationExpire = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return verificationToken;
};

// Password reset token үүсгэх
userSchema.methods.getResetPasswordToken = function (): string {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

  return resetToken;
};

export default mongoose.model<IUser>("User", userSchema);
