// import cors from "cors";
// import { configDotenv } from "dotenv";
// // import { userRouter } from "./routers";
// import express, { Application, Request, Response } from "express";

// configDotenv();

// const app: Application = express();

// app.use(cors());
// app.use(express.json());

// // app.use("/users", userRouter);
// // app.use("/foods", foodRouter);
// // app.use("/food-order", foodorderRouter);

// app.listen(8000, () => console.log("http://localhost:8000"));

import express, { Application, Request, Response } from "express";
import cors from "cors";
import { config as configDotenv } from "dotenv";
import { connectDB } from "./mongodb";

// Routers import
import { userRouter, authRouter, foodRouter, orderRouter } from "./routers";

// Environment variables
configDotenv();

// Express app
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database холболт
connectDB();

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/foods", foodRouter);
app.use("/api/orders", orderRouter);

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server ажиллаж байна! 🚀",
  });
});

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "🍔 Food Delivery API",
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
      auth: "/api/auth",
      foods: "/api/foods",
      orders: "/api/orders",
    },
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Endpoint олдсонгүй",
  });
});

// Error Handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Серверийн алдаа",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Server ажиллуулах
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} дээр ажиллаж байна`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err: Error) => {
  console.log("❌ Unhandled Rejection:", err.message);
  process.exit(1);
});
