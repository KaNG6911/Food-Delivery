import {
  createNewUser,
  getUserByIdAndGet,
  getUserByIdAndPost,
} from "../controllers";
import { Router } from "express";

export const userRouter = Router();

userRouter.post("/create-user", createNewUser);

userRouter.post("/get-user-by-post-request/:user:id", getUserByIdAndPost);
userRouter.get("/get-user-by-get-request", getUserByIdAndGet);

// userRouter.post("/user", createNewUser)
// userRouter.delete("/user", createNewUser)

// userRouter.route("/user").post(createNewUser).delete(deleteNewUser);

// userRouter.get("/user-by-id", getUserById);
// userRouter.put("/user-by-id", getUserById);
// userRouter.delete("/user-by-id", getUserById);
