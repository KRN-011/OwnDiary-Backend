import prisma from '../../prisma/client.js';

// Create Expense
export const createExpenseService = async ({
    title,
    description,
    amount,
    imageAttachments,
    categoryId,
    userId,
}) => {
    try {
        // Validate Request
        if (!title) {
            return {
                success: false,
                statusCode: 400,
                message: 'Title is required',
            };
        }

        if (!amount) {
            return {
                success: false,
                statusCode: 400,
                message: 'Amount is required',
            };
        }

        // Validate Category
        if (categoryId) {
            const category = await prisma.expenseCategory.findUnique({
                where: { id: categoryId },
            });

            // Return if category is not found
            if (!category) {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'Category not found',
                };
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
                categoryId: categoryId,
            },
        });

        // Return response
        return {
            success: true,
            statusCode: 201,
            message: 'Expense Created Successfully',
            data: newExpense,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message,
        };
    }
};

// Create Sub Expenses
export const createSubExpensesService = async ({ subExpensesData, userId }) => {
    try {
        // Validate Request
        if (!subExpensesData || subExpensesData.length === 0) {
            return {
                success: false,
                statusCode: 400,
                message: 'Sub Expenses Data is required',
            };
        }

        // Validate each sub expense data
        for (const subExpenseData of subExpensesData) {
            if (!subExpenseData.title) {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'Title is required',
                };
            }

            if (!subExpenseData.amount) {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'Amount is required',
                };
            }
        }

        // Validate Parent Expense
        if (parentId) {
            const parentExpense = await prisma.expense.findUnique({
                where: { id: parentId },
            });

            // Return if parent expense is not found
            if (!parentExpense) {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'Parent Expense not found',
                };
            }
        }

        // Create Sub Expenses
        const newSubExpenses = await prisma.expense.createMany({
            data: subExpensesData.map((subExpenseData) => ({
                title: subExpenseData.title,
                description: subExpenseData.description,
                amount: subExpenseData.amount,
                imageAttachments: subExpenseData.imageAttachments,
                userId: userId,
                parentId: subExpensesData.parentId,
            })),
        });

        // Return response
        return {
            success: true,
            statusCode: 201,
            message: 'Sub Expenses Created Successfully',
            data: newSubExpenses,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message,
        };
    }
};

// Get All Expenses
export const getAllExpensesService = async ({
    userId,
    paginationData,
    categoryId,
    startDate,
    endDate,
    sortBy,
    sortOrder,
    search,
}) => {
    try {
        // Manage filters
        let where = {
            userId: userId,
            parentId: null,
        };

        // Manage category filter
        if (categoryId) {
            where.categoryId = { contains: categoryId };
        }

        // Manage date range filter
        if (startDate && endDate) {
            where.createdAt = {
                gte: new Date(startDate),
                lte: new Date(endDate + 'T23:59:59.999Z'),
            };
        }

        // Manage search filter
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Manage sort filter
        const ALLOWED_SORT_FIELDS = [
            'createdAt',
            'amount',
            'title',
            'updatedAt',
        ];

        // Default sort
        let orderBy = { createdAt: 'desc' };

        // Validate sortBy
        if (sortBy && ALLOWED_SORT_FIELDS.includes(sortBy)) {
            orderBy = {
                [sortBy]: sortOrder === 'asc' ? 'asc' : 'desc',
            };
        }

        // Get All Expenses
        const allExpenses = await prisma.expense.findMany({
            where: where,
            skip: paginationData.skip,
            take: paginationData.limit,
            orderBy,
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        icon: true,
                    },
                },
            },
        });

        // Meta object
        const meta = {
            total: await prisma.expense.count({ where }),
            page: paginationData.page,
            limit: paginationData.limit,
            totalPages: Math.ceil(
                (await prisma.expense.count({ where })) / paginationData.limit,
            ),
        };

        // Return response
        return {
            success: true,
            statusCode: 200,
            message: 'Expenses Fetched Successfully',
            data: allExpenses,
            meta,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message,
        };
    }
};

// Update Expense
export const updateExpenseService = async ({
    id,
    title,
    description,
    amount,
    imageAttachments,
    categoryId,
    userId,
}) => {
    try {
        // Check if expense exists
        const expense = await prisma.expense.findUnique({
            where: { id, userId },
        });

        // return if expense is not found
        if (!expense) {
            return {
                success: false,
                statusCode: 404,
                message: 'Expense not found',
            };
        }

        // Validate Category
        if (categoryId) {
            const category = await prisma.expenseCategory.findUnique({
                where: { id: categoryId },
            });

            // return if category is not found
            if (!category) {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'Category not found',
                };
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
                updatedAt: new Date(),
            },
        });

        // Return response
        return {
            success: true,
            statusCode: 200,
            message: 'Expense Updated Successfully',
            data: updatedExpense,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message,
        };
    }
};

// Delete Expense
export const deleteExpenseService = async ({ id, userId }) => {
    try {
        // Check if expense exists
        const expense = await prisma.expense.delete({
            where: { id, userId },
        });

        // return if expense is not found
        if (!expense) {
            return {
                success: false,
                statusCode: 404,
                message: 'Expense not found',
            };
        }

        // Delete Expense
        const deletedExpense = await prisma.expense.delete({
            where: { id, userId },
        });

        // Return response
        return {
            success: true,
            statusCode: 200,
            message: 'Expense Deleted Successfully',
            data: deletedExpense,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message,
        };
    }
};

// Expense Cards Analytics
export const expenseCardsAnalyticsService = async ({ userId }) => {
    try {
        // Get Today's Expenses Total
        const todayExpenseTotal = await prisma.expense.findMany({
            where: {
                userId,
                createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
            },
        });

        // Get Total Expenses Total
        const totalExpensesTotal = await prisma.expense.aggregate({
            where: { userId },
            _sum: { amount: true },
        });

        // Get Average Expense Of Daily
        const averageExpenseOfDaily = await prisma.expense.aggregate({
            where: {
                userId,
                createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
            },
            _avg: { amount: true },
        });

        // Get Average Expense Of Monthly
        const averageExpenseOfMonthly = await prisma.expense.aggregate({
            where: {
                userId,
                createdAt: { gte: new Date(new Date().setMonth(0, 1)) },
            },
            _avg: { amount: true },
        });

        // Get Average Expense Of Yearly
        const averageExpenseOfYearly = await prisma.expense.aggregate({
            where: {
                userId,
                createdAt: { gte: new Date(new Date().setYear(0, 1)) },
            },
            _avg: { amount: true },
        });

        // Get Total Expense of Last Month
        const totalExpenseOfLastMonth = await prisma.expense.aggregate({
            where: {
                userId,
                createdAt: {
                    gte: new Date(
                        new Date().setMonth(new Date().getMonth() - 1, 1),
                    ),
                    lte: new Date(
                        new Date().setMonth(new Date().getMonth(), 0),
                    ),
                },
            },
            _sum: { amount: true },
        });

        // Get Total Expense of Current Month
        const totalExpenseOfCurrentMonth = await prisma.expense.aggregate({
            where: {
                userId,
                createdAt: {
                    gte: new Date(
                        new Date().setMonth(new Date().getMonth(), 1),
                    ),
                    lte: new Date(
                        new Date().setMonth(new Date().getMonth() + 1, 0),
                    ),
                },
            },
            _sum: { amount: true },
        });

        // Get % of change in expense compare to last month
        const percentageChangeInExpenseCompareToLastMonth =
            ((totalExpenseOfCurrentMonth.amount -
                totalExpenseOfLastMonth.amount) /
                totalExpenseOfLastMonth.amount) *
            100;

        // Return response
        return {
            success: true,
            statusCode: 200,
            message: 'Expense Cards Analytics Fetched Successfully',
            data: {
                todayExpenseTotal: todayExpenseTotal.length,
                totalExpensesTotal: totalExpensesTotal.amount,
                averageExpenseOfDaily: averageExpenseOfDaily.amount,
                averageExpenseOfMonthly: averageExpenseOfMonthly.amount,
                averageExpenseOfYearly: averageExpenseOfYearly.amount,
                percentageChangeInExpenseCompareToLastMonth:
                    percentageChangeInExpenseCompareToLastMonth,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message,
        };
    }
};

// Expense Graph Analytics
export const expenseGraphAnalyticsService = async ({
    userId,
    startDate,
    endDate,
}) => {
    try {
        // Get Expenses
        const expenses = await prisma.expense.findMany({
            where: {
                userId,
                createdAt: { gte: new Date(startDate), lte: new Date(endDate) },
            },
        });

        // format expenses data
        const formattedExpensesData = expenses.map((expense) => ({
            date: expense.createdAt.toISOString().split('T')[0],
            amount: expense.amount,
        }));

        // Return response
        return {
            success: true,
            statusCode: 200,
            message: 'Expense Graph Analytics Fetched Successfully',
            data: formattedExpensesData,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message,
        };
    }
};

// Expense List Analytics
export const expenseListAnalyticsService = async ({
    userId,
    startDate,
    endDate,
}) => {
    try {
        // Get Top 5 expenses by amount in last 30 days
        const top5ExpensesByAmountInLast30Days = await prisma.expense.findMany({
            where: {
                userId,
                createdAt: {
                    gte: new Date(
                        new Date().setDate(new Date().getDate() - 30),
                    ),
                },
            },
            orderBy: { amount: 'desc' },
            take: 5,
        });

        // Get Top 5 expense days by amount in last 30 days
        const top5ExpenseDaysByAmountInLast30Days =
            await prisma.expense.groupBy({
                by: ['createdAt'],
                where: {
                    userId,
                    createdAt: {
                        gte: new Date(
                            new Date().setDate(new Date().getDate() - 30),
                        ),
                    },
                },
                orderBy: { amount: 'desc' },
                take: 5,
            });

        // Return response
        return {
            success: true,
            statusCode: 200,
            message: 'Expense List Analytics Fetched Successfully',
            data: {
                top5ExpensesByAmountInLast30Days,
                top5ExpenseDaysByAmountInLast30Days,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message,
        };
    }
};
