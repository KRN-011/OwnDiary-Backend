// imports
import express from "express";
import cors from "cors";

// routes
import testRoutes from "./routes/test-routes.js";
import authRoutes from "./modules/auth/auth.routes.js";

// app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rotues
app.use('/api/test', testRoutes)
app.use('/api/auth', authRoutes)

export default app;