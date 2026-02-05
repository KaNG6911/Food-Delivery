import { Request, Response } from "express";

export const getUserByIdAndPost = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
  } catch (error) {
    console.error(error);
  }
};

export const getUserByIdAndGet = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.error(error);
  }
};
