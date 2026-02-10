import express from "express";
import { createFood, getAllFoods, getFoodById } from "../controllers/foods";
import { protect } from "../middlewares/authentication";
import { authorize } from "../middlewares/authorization";

const router = express.Router();

// Public routes
router.get("/", getAllFoods);
router.get("/:id", getFoodById);

// Admin only
router.post("/", protect, authorize("admin"), createFood);

export default router;
