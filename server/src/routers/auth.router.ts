import express from "express";
import { login, getMe } from "../controllers/auth.controller";
import { protect } from "../middlewares/authentication";

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, getMe);

export default router;
