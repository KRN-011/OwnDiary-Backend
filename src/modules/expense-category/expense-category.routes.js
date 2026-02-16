import { Router } from "express";
import {
  createExpenseCategoryController,
  GetAllExpenseCategoriesController,
  UpdateExpenseCategoryController,
  DeleteExpenseCategoryController,
} from "./expense-category.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", authMiddleware, createExpenseCategoryController);
router.get("/get-all", authMiddleware, GetAllExpenseCategoriesController);
router.put("/update/:id", authMiddleware, UpdateExpenseCategoryController);
router.delete("/delete/:id", authMiddleware, DeleteExpenseCategoryController);

export default router;
