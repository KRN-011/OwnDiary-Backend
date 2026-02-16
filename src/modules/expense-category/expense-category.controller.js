import { createExpenseCategoryService, getAllExpenseCategoriesService, updateExpenseCategoryService, deleteExpenseCategoryService } from "./expense-category.service.js";



// Create Expense Category
export const createExpenseCategoryController = async (req, res) => {
    try {
        const { name, icon } = req.body;

        const userId = req.user.id;

        // Call Service
        const createExpenseCategoryServiceRes = await createExpenseCategoryService({ name, icon, userId })

        if (!createExpenseCategoryServiceRes.success) {
            return res.status(createExpenseCategoryServiceRes.statusCode).json({
                success: false,
                message: createExpenseCategoryServiceRes.message
            })
        }

        return res.status(createExpenseCategoryServiceRes.statusCode).json({
            success: true,
            message: createExpenseCategoryServiceRes.message,
            data: createExpenseCategoryServiceRes.data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

// Get All Expense Categories
export const GetAllExpenseCategoriesController = async (req, res) => {
    try {
        const userId = req.user.id;

        // Call Service
        const getAllExpenseCategoriesServiceRes = await getAllExpenseCategoriesService({ userId })

        if (!getAllExpenseCategoriesServiceRes.success) {
            return res.status(getAllExpenseCategoriesServiceRes.statusCode).json({
                success: false,
                message: getAllExpenseCategoriesServiceRes.message
            })
        }

        return res.status(getAllExpenseCategoriesServiceRes.statusCode).json({
            success: true,
            message: getAllExpenseCategoriesServiceRes.message,
            data: getAllExpenseCategoriesServiceRes.data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

// Update Expense Category
export const UpdateExpenseCategoryController = async (req, res) => {
    try {
        const { name, icon } = req.body;
        const { id } = req.params;

        const userId = req.user.id;

        // Call Service
        const updateExpenseCategoryServiceRes = await updateExpenseCategoryService({ id, name, icon, userId })

        if (!updateExpenseCategoryServiceRes.success) {
            return res.status(updateExpenseCategoryServiceRes.statusCode).json({
                success: false,
                message: updateExpenseCategoryServiceRes.message
            })
        }

        return res.status(updateExpenseCategoryServiceRes.statusCode).json({
            success: true,
            message: updateExpenseCategoryServiceRes.message,
            data: updateExpenseCategoryServiceRes.data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

// Delete Expense Category
export const DeleteExpenseCategoryController = async (req, res) => {
    try {
        const { id } = req.params;

        const userId = req.user.id;

        // Call Service
        const deleteExpenseCategoryServiceRes = await deleteExpenseCategoryService({ id, userId })

        if (!deleteExpenseCategoryServiceRes.success) {
            return res.status(deleteExpenseCategoryServiceRes.statusCode).json({
                success: false,
                message: deleteExpenseCategoryServiceRes.message
            })
        }

        return res.status(deleteExpenseCategoryServiceRes.statusCode).json({
            success: true,
            message: deleteExpenseCategoryServiceRes.message,
            data: deleteExpenseCategoryServiceRes.data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}