import { createExpenseService, createSubExpensesService, deleteExpenseService, getAllExpensesService, updateExpenseService } from "./expense.service.js";



// Create Expense
export const createExpenseController = async (req, res) => {
    try {
        const { title, description, amount, imageAttachments, categoryId } = req.body;

        const userId = req.user.id;

        // Call Service
        const createExpenseServiceRes = await createExpenseService({ title, description, amount, imageAttachments, categoryId, userId })

        if (!createExpenseServiceRes.success) {
            return res.status(createExpenseServiceRes.statusCode).json({
                success: false,
                message: createExpenseServiceRes.message
            })
        }

        return res.status(createExpenseServiceRes.statusCode).json({
            success: true,
            message: createExpenseServiceRes.message,
            data: createExpenseServiceRes.data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

// Create Sub Expenses
export const createSubExpensesController = async (req, res) => {
    try {
        const subExpensesData = req.body;

        const userId = req.user.id;

        // Call Service
        const createSubExpensesServiceRes = await createSubExpensesService({ subExpensesData, userId })

        if (!createSubExpensesServiceRes.success) {
            return res.status(createSubExpensesServiceRes.statusCode).json({
                success: false,
                message: createSubExpensesServiceRes.message
            })
        }

        return res.status(createSubExpensesServiceRes.statusCode).json({
            success: true,
            message: createSubExpensesServiceRes.message,
            data: createSubExpensesServiceRes.data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

// Get All Expenses
export const getAllExpensesController = async (req, res) => {
    try {
        const userId = req.user.id;

        const { page, limit, categoryId, startDate, endDate, sortBy, sortOrder } = req.query;

        const paginationData = await pagination({ page, limit })

        // Call Service
        const getAllExpensesServiceRes = await getAllExpensesService({ userId, paginationData, categoryId, startDate, endDate, sortBy, sortOrder })

        if (!getAllExpensesServiceRes.success) {
            return res.status(getAllExpensesServiceRes.statusCode).json({
                success: false,
                message: getAllExpensesServiceRes.message
            })
        }

        return res.status(getAllExpensesServiceRes.statusCode).json({
            success: true,
            message: getAllExpensesServiceRes.message,
            data: getAllExpensesServiceRes.data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

// Update Expense
export const updateExpenseController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, amount, imageAttachments, categoryId } = req.body;

        const userId = req.user.id;

        // Call Service
        const updateExpenseServiceRes = await updateExpenseService({ id, title, description, amount, imageAttachments, categoryId, userId })
        
        if (!updateExpenseServiceRes.success) {
            return res.status(updateExpenseServiceRes.statusCode).json({
                success: false,
                message: updateExpenseServiceRes.message
            })
        }

        return res.status(updateExpenseServiceRes.statusCode).json({
            success: true,
            message: updateExpenseServiceRes.message,
            data: updateExpenseServiceRes.data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

// Delete Expense
export const deleteExpenseController = async (req, res) => {
    try {
        const { id } = req.params;

        const userId = req.user.id;

        // Call Service
        const deleteExpenseServiceRes = await deleteExpenseService({ id, userId })
        
        if (!deleteExpenseServiceRes.success) {
            return res.status(deleteExpenseServiceRes.statusCode).json({
                success: false,
                message: deleteExpenseServiceRes.message
            })
        }

        return res.status(deleteExpenseServiceRes.statusCode).json({
            success: true,
            message: deleteExpenseServiceRes.message,
            data: deleteExpenseServiceRes.data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}
