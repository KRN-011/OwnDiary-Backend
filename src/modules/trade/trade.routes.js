import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { createTradeController, getAllTradesController, updateTradeController, deleteTradeController } from "./trade.controller.js";

const router = Router();

// routes
router.post('/create', authMiddleware, createTradeController)
router.get('/get-all', authMiddleware, getAllTradesController)
router.put('/update/:id', authMiddleware, updateTradeController)
router.delete('/delete/:id', authMiddleware, deleteTradeController)

export default router;