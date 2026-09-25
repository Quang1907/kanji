export interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  error?: string;
  code?: string;
  details?: unknown;
  errors?: Record<string, string | string[]>;
}

export interface NormalizedApiError {
  message: string;
  code?: string;
  status?: number;
  fieldErrors: Record<string, string>;
  isNetworkError: boolean;
}
