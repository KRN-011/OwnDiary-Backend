import prisma from "../../prisma/client.js"

// Create Expense Category Service
export const createExpenseCategoryService = async ({ name, icon, userId }) => {
  try {
    // Check if category already exists
    const existingCategory = await prisma.expenseCategory.findFirst({
      where: {
        userId: userId,
        name: name,
      },
    });

    if (existingCategory) {
      return {
        success: false,
        statusCode: 400,
        message: "Category already exists",
      };
    }

    // Create category
    const category = await prisma.expenseCategory.create({
      data: {
        name: name,
        icon: icon,
        userId: userId,
      },
    });

    return {
      success: true,
      statusCode: 201,
      message: "Category created successfully",
      data: category,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
};

// Get All Expense Categories Service
export const getAllExpenseCategoriesService = async ({ userId }) => {
  try {
    // Get all categories
    const categories = await prisma.expenseCategory.findMany({
      where: {
        userId: userId,
      },
    });

    return {
      success: true,
      statusCode: 200,
      message: "Categories fetched successfully",
      data: categories,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
};

// Update Expense Category Service
export const updateExpenseCategoryService = async ({ id, name, icon, userId }) => {
  try {
    // Check if category exists
    const existingCategory = await prisma.expenseCategory.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingCategory) {
      return {
        success: false,
        statusCode: 404,
        message: "Category not found",
      };
    }

    // Check if category belongs to the user
    if (existingCategory.userId !== userId) {
      return {
        success: false,
        statusCode: 403,
        message: "Unauthorized",
      };
    }

    // Update category
    const updatedCategory = await prisma.expenseCategory.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        icon: icon,
      },
    });

    return {
      success: true,
      statusCode: 200,
      message: "Category updated successfully",
      data: updatedCategory,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
};

// Delete Expense Category Service
export const deleteExpenseCategoryService = async ({ id, userId }) => {
  try {
    // Check if category exists
    const existingCategory = await prisma.expenseCategory.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingCategory) {
      return {
        success: false,
        statusCode: 404,
        message: "Category not found",
      };
    }

    // Check if category belongs to the user
    if (existingCategory.userId !== userId) {
      return {
        success: false,
        statusCode: 403,
        message: "Unauthorized",
      };
    }

    // Delete category
    const deletedCategory = await prisma.expenseCategory.delete({
      where: {
        id: id,
      },
    });

    return {
      success: true,
      statusCode: 200,
      message: "Category deleted successfully",
      data: deletedCategory,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
};
