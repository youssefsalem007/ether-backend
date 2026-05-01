import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
import productRouter from "./modules/product/product.controller.js";
import categoryRouter from "./modules/category/category.controller.js";
import orderRouter from "./modules/order/order.controller.js";
import couponRouter from "./modules/coupon/coupon.controller.js";
import connectDB from "./DB/connectionDB.js";
import { config } from "../config/config.service.js";
const app = express();

const bootstrap = async () => {
  // Middlewares
  app.use(express.json());
  app.use(cors());
  app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

  app.get("/", (req, res, next) => {
    res.status(200).json({ message: "Welcome to Ether API" });
  });

  // DB
  await connectDB();

  // Routes

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/product", productRouter);
  app.use("/category", categoryRouter);
  app.use("/order", orderRouter);
  app.use("/coupon", couponRouter);

  // Favicon handler
  app.get('/favicon.ico', (req, res) => res.status(204).end());

  // Handle Undefined Routes
  app.use((req, res) => {
    res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
  });

  // Global Error Handler
app.use((err, req, res, next) => {
    res
      .status(err.cause || 500)
      .json({ message: err.message, stack: err.stack });
  });

  const PORT = config.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
export default bootstrap;
