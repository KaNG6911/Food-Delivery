import { Request, Response } from "express";
import UserModel = require("../../models");

export const createNewUser = async (req: Request, res: Response) => {
  try {
    await UserModel.create();
  } catch (error) {
    console.error(error);
  }
};
