export const pagination = async ({ page, limit }) => {
    page = Math.min(1, parseInt(page) || 1);
    limit = Math.min(10, parseInt(limit) || 10);

    const skip = (page - 1) * limit;

    return {
        page,
        limit,
        skip
    }
}