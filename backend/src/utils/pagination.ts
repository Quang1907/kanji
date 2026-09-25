export interface Pagination {
    page: number;
    limit: number;
    offset: number;
}

export function getPagination(
    page = 1,
    limit = 20
): Pagination {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(
        Math.max(1, limit),
        100
    );

    return {
        page: safePage,
        limit: safeLimit,
        offset: (safePage - 1) * safeLimit,
    };
}