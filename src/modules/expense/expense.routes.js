import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { createExpenseController, createSubExpensesController, deleteExpenseController, getAllExpensesController, updateExpenseController } from "./expense.controller.js";

const router = Router()

// routes
router.post('/create', authMiddleware, createExpenseController)
router.post('/create-sub-expenses', authMiddleware, createSubExpensesController)
router.get('/get-all', authMiddleware, getAllExpensesController)
router.put('/update/:id', authMiddleware, updateExpenseController)
router.delete('/delete/:id', authMiddleware, deleteExpenseController)

export default router;