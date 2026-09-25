import { normalizeApiError } from "./apiError";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, headers, ...rest } = options;

  let response: Response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    throw await normalizeApiError(error);
  }

  if (!response.ok) {
    const normalized = await normalizeApiError(response);

    throw normalized;
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

// Sửa normalizeApiError để không mất lỗi đã chuẩn hóa
// Thêm vào đầu hàm:

// if (
//   isRecord(error) &&
//   typeof error.message === "string" &&
//   "fieldErrors" in error
// ) {
//   return error as NormalizedApiError;
// }
