export type ApiError = {
  code: string;
  message: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T | null;
  error?: ApiError | null;
  timestamp: string;
};
