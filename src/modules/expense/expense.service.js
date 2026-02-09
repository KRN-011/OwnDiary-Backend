import prisma from "../../prisma/client.js"

// Create Expense
export const createExpenseService = async ({ title, description, amount, imageAttachments, categoryId, userId }) => {
    try {

        // Validate Request
        if (!title) {
            return { success: false, statusCode: 400, message: 'Title is required' }
        }

        if (!amount) {
            return { success: false, statusCode: 400, message: 'Amount is required' }
        }

        // Validate Category
        if (categoryId) {
            const category = await prisma.expenseCategory.findUnique({
                where: { id: categoryId }
            })


            // Return if category is not found
            if (!category) {
                return { success: false, statusCode: 400, message: 'Category not found' }
            }
        }

        // Create Expense
        const newExpense = await prisma.expense.create({
            data: {
                title,
                description,
                amount,
                imageAttachments,
                userId: userId,
                categoryId: categoryId
            }
        })

        // Return response
        return {
            success: true,
            statusCode: 201,
            message: 'Expense Created Successfully',
            data: newExpense
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message
        }
    }
}

// Create Sub Expenses
export const createSubExpensesService = async ({ subExpensesData, userId }) => {
    try {
        // Validate Request
        if (!subExpensesData || subExpensesData.length === 0) {
            return { success: false, statusCode: 400, message: 'Sub Expenses Data is required' }
        }

        // Validate each sub expense data
        for (const subExpenseData of subExpensesData) {
            if (!subExpenseData.title) {
                return { success: false, statusCode: 400, message: 'Title is required' }
            }

            if (!subExpenseData.amount) {
                return { success: false, statusCode: 400, message: 'Amount is required' }
            }
        }

        // Validate Parent Expense
        if (parentId) {
            const parentExpense = await prisma.expense.findUnique({
                where: { id: parentId }
            })

            // Return if parent expense is not found
            if (!parentExpense) {
                return { success: false, statusCode: 400, message: 'Parent Expense not found' }
            }
        }

        // Create Sub Expenses
        const newSubExpenses = await prisma.expense.createMany({
            data: subExpensesData.map(subExpenseData => ({
                title: subExpenseData.title,
                description: subExpenseData.description,
                amount: subExpenseData.amount,
                imageAttachments: subExpenseData.imageAttachments,
                userId: userId,
                parentId: subExpensesData.parentId
            }))
        })

        // Return response
        return {
            success: true,
            statusCode: 201,
            message: 'Sub Expenses Created Successfully',
            data: newSubExpenses
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message
        }
    }
}

// Get All Expenses
export const getAllExpensesService = async ({ userId, paginationData, categoryId, startDate, endDate, sortBy, sortOrder }) => {
    try {
        // Manage filters
        let where = {
            userId: userId,
            parentId: null,
        }

        // Manage category filter
        if (categoryId) {
            where.categoryId = { contains: categoryId }
        }

        // Manage date range filter
        if (startDate && endDate) {
            where.createdAt = { gte: new Date(startDate), lte: new Date(endDate) }
        }

        // Get All Expenses
        const allExpenses = await prisma.expense.findMany({
            where: where,
            skip: paginationData.skip,
            take: paginationData.limit,
            orderBy: { [sortBy]: sortOrder === 'asc' ? 'asc' : 'desc' }
        })

        // Return response
        return {
            success: true,
            statusCode: 200,
            message: 'Expenses Fetched Successfully',
            data: allExpenses
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message
        }
    }
}

// Update Expense
export const updateExpenseService = async ({ id, title, description, amount, imageAttachments, categoryId, userId }) => {
    try {
        // Check if expense exists
        const expense = await prisma.expense.findUnique({
            where: { id, userId }
        })

        // return if expense is not found
        if (!expense) {
            return { success: false, statusCode: 404, message: 'Expense not found' }
        }

        // Validate Category
        if (categoryId) {
            const category = await prisma.expenseCategory.findUnique({
                where: { id: categoryId }
            })

            // return if category is not found
            if (!category) {
                return { success: false, statusCode: 400, message: 'Category not found' }
            }
        }

        // Update Expense
        const updatedExpense = await prisma.expense.update({
            where: { id, userId },
            data: {
                title,
                description,
                amount,
                imageAttachments,
                categoryId,
                updatedAt: new Date()
            }
        })

        // Return response
        return {
            success: true,
            statusCode: 200,
            message: 'Expense Updated Successfully',
            data: updatedExpense
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message
        }
    }
}

// Delete Expense
export const deleteExpenseService = async ({ id, userId }) => {
    try {
        // Check if expense exists
        const expense = await prisma.expense.delete({
            where: { id, userId }
        })

        // return if expense is not found
        if (!expense) {
            return { success: false, statusCode: 404, message: 'Expense not found' }
        }

        // Delete Expense
        const deletedExpense = await prisma.expense.delete({
            where: { id, userId }
        })

        // Return response
        return {
            success: true,
            statusCode: 200,
            message: 'Expense Deleted Successfully',
            data: deletedExpense
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message
        }
    }
}
