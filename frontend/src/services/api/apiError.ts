import type { ApiErrorResponse, NormalizedApiError } from "@/types/api";

const DEFAULT_ERROR = "Đã xảy ra lỗi. Vui lòng thử lại.";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  return isRecord(value);
}

function extractFieldErrors(errors: unknown): Record<string, string> {
  if (!isRecord(errors)) return {};

  return Object.entries(errors).reduce(
    (result, [field, value]) => {
      if (typeof value === "string") {
        result[field] = value;
      } else if (Array.isArray(value)) {
        const messages = value.filter(
          (item): item is string => typeof item === "string",
        );

        if (messages.length > 0) {
          result[field] = messages.join(", ");
        }
      }

      return result;
    },
    {} as Record<string, string>,
  );
}

export async function normalizeApiError(
  error: unknown,
): Promise<NormalizedApiError> {
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return {
      message: "Không thể kết nối máy chủ.",
      fieldErrors: {},
      isNetworkError: true,
    };
  }

  if (error instanceof Response) {
    let body: unknown;

    try {
      body = await error.clone().json();
    } catch {
      body = null;
    }

    const payload = isApiErrorResponse(body) ? body : {};

    return {
      message:
        typeof payload.message === "string"
          ? payload.message
          : typeof payload.error === "string"
            ? payload.error
            : DEFAULT_ERROR,
      code: typeof payload.code === "string" ? payload.code : undefined,
      status: error.status,
      fieldErrors: extractFieldErrors(payload.errors),
      isNetworkError: false,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message || DEFAULT_ERROR,
      fieldErrors: {},
      isNetworkError: false,
    };
  }

  return {
    message: DEFAULT_ERROR,
    fieldErrors: {},
    isNetworkError: false,
  };
}

// {
//   "success": false,
//   "message": "Dữ liệu không hợp lệ",
//   "code": "VALIDATION_ERROR",
//   "errors": {
//     "character": "Vui lòng nhập chữ Kanji",
//     "meaning": "Vui lòng nhập nghĩa"
//   }
// }
