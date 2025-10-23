export type ApiError = {
  Code: string;
  Message: string;
};

export type ApiResponse<T> = {
  Success: boolean;
  Data?: T | null;
  Error?: ApiError | null;
  Timestamp: string;
};
