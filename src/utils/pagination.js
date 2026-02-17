export const pagination = async ({ page, limit }) => {
    page = Math.max(1, parseInt(page) || 1);
    limit = Math.max(1, parseInt(limit) || 10);

    const skip = (page - 1) * limit;

    return {
        page,
        limit,
        skip
    }
}