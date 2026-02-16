// imports
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// routes
import testRoutes from "./routes/test-routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import expenseRoutes from "./modules/expense/expense.routes.js";
import tradeRoutes from "./modules/trade/trade.routes.js";
import expenseCategoryRoutes from "./modules/expense-category/expense-category.routes.js";

// app
const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

// Rotues
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/expense-category", expenseCategoryRoutes);
app.use("/api/trade", tradeRoutes);

export default app;
