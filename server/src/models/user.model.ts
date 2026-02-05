import { models, model, Schema } from "mongoose";

type User = {
  name: string;
  phoneNumber: string;
};

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

export const UserModel = models["Users"] || model("Users", UserSchema);
