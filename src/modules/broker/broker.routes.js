import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { createBrokerController, getAllBrokersController } from "./broker.controller.js";

const router = Router();

// routes
router.post('/create', authMiddleware, createBrokerController)
router.get('/get-all', authMiddleware, getAllBrokersController)

export default router;