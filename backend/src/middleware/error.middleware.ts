import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";

export function errorHandler(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(error);

  /**
   * ================================
   * ZOD VALIDATION ERROR
   * ================================
   */
  if (error instanceof ZodError) {
    const errors = error.issues.map((issue) => {
      const path = issue.path;

      const index = typeof path[0] === "number" ? path[0] : undefined;

      const field =
        typeof path[0] === "number" ? path.slice(1).join(".") : path.join(".");

      return {
        ...(index !== undefined && { index }),
        field,
        message: issue.message,
      };
    });

    return res.status(400).json({
      success: false,
      message: "Dữ liệu không hợp lệ",
      errors,
      code: "VALIDATION_ERROR",
    });
  }

  /**
   * ================================
   * APP ERROR
   * ================================
   */
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      code: error.code,
    });
  }

  /**
   * ================================
   * MYSQL - DUPLICATE
   * ================================
   */
  if (error.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      success: false,
      message: "Dữ liệu đã tồn tại",
      code: "ER_DUP_ENTRY",
    });
  }

  /**
   * ================================
   * MYSQL - NULL
   * ================================
   */
  if (error.code === "ER_BAD_NULL_ERROR") {
    const match = error.message?.match(/Column '(.+)' cannot be null/);

    const column = match?.[1];

    const columnMessages: Record<string, string> = {
      kanji_character: "Hán tự không được để trống",
      strokes: "Số nét không được để trống",
      grade: "Grade không được để trống",
      jlpt_level_id: "JLPT level ID không được để trống",
      lesson_id: "Lesson ID không được để trống",
    };

    return res.status(400).json({
      success: false,
      message:
        column && columnMessages[column]
          ? columnMessages[column]
          : "Dữ liệu bắt buộc không được để trống",
      code: "ER_BAD_NULL_ERROR",
    });
  }

  /**
   * ================================
   * MYSQL - FOREIGN KEY
   * ================================
   */
  if (error.code === "ER_NO_REFERENCED_ROW_2") {
    return res.status(400).json({
      success: false,
      message: "Dữ liệu liên kết không tồn tại",
      code: "ER_NO_REFERENCED_ROW_2",
    });
  }

  /**
   * ================================
   * DEFAULT ERROR
   * ================================
   */
  return res.status(500).json({
    success: false,
    message: "Đã xảy ra lỗi máy chủ",
    code: "INTERNAL_SERVER_ERROR",
  });
}
