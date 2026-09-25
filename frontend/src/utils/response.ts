import type { Response } from 'express';

export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
    meta?: {
        total?: number;
        page?: number;
        limit?: number;
        totalPages?: number;
    };
}

export function sendSuccess<T>(res: Response, data: T, message?: string, meta?: any, statusCode = 200) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        meta
    });
}

export function sendError(res: Response, error: string, statusCode = 400, data?: any) {
    return res.status(statusCode).json({
        success: false,
        error,
        data
    });
}
