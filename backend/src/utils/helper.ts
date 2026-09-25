import z from "zod";
import { AppError } from "./AppError";

export function formatZodErrors(error: z.ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}

export function unwrapError<T = any>(error: unknown) {
  if (error instanceof z.ZodError) {
    return { type: "ZodError", message: formatZodErrors(error) };
  }

  if (error instanceof Error) {
    return { type: "Error", message: error.message };
  }

  return { type: "Unknown", message: String(error) };
}

export function buildBulkResult<T>(
  total: number,
  createdCount: number,
  skippedCount: number,
  created: T[],
  skipped: T[],
  skipExisting: boolean,
) {
  return {
    total,
    createdCount,
    skippedCount,
    created,
    skipped,
    summary: {
      total,
      inserted: createdCount,
      updated: skipExisting ? 0 : skippedCount,
      skipped: skipExisting ? skippedCount : 0,
      insertedIds: created.map((item) => (item as any).id),
    },
  };
}

export function mapBulkResponse<T, U>(
  result: ReturnType<typeof buildBulkResult<T>>,
  mapper: (item: T) => U,
) {
  return {
    ...result,
    created: result.created.map(mapper),
    skipped: result.skipped.map(mapper),
  };
}

export function unwrapResult<T>(
  result: T | undefined | null,
  notFoundMessage: string = "Không tìm thấy",
): T {
  if (result === undefined || result === null) {
    throw new AppError(notFoundMessage, 404, "NOT_FOUND");
  }
  return result;
}
