import type { z } from "zod";
import type { fieldErrorSchema, apiErrorSchema, tokenPairSchema } from "./lib.schemas";

export type FieldError = z.infer<typeof fieldErrorSchema>;

export type ApiError = z.infer<typeof apiErrorSchema>;

export type TokenPair = z.infer<typeof tokenPairSchema>;

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error: ApiError | null;
  timestamp: string;
};

export type PagedResponse<T> = {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
