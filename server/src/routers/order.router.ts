import express from "express";
import { createOrder, getMyOrders } from "../controllers/orders";
import { protect } from "../middlewares/authentication";

const router = express.Router();

// Protected routes - user хэрэгтэй
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);

export default router;
