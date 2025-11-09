export type ApiError = {
  code: string;
  message: string;
  fieldErrors?: FieldError[] | null;
};

export type FieldError = {
  field: string;
  code: string;
  message: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error: ApiError | null;
  timestamp: string;
};

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
};

export type PagedResponse<T> = {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
