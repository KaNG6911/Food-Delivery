import cors from "cors";
import { configDotenv } from "dotenv";
import { userRouter } from "./routers";
import express, { Application, Request, Response } from "express";

configDotenv();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
// app.use("/foods", foodRouter);
// app.use("/food-order", foodorderRouter);

app.listen(8000, () => console.log("http://localhost:8000"));
