import type { ApiError as ApiErrorType, FieldError } from "./lib.types";

export class ApiError extends Error {
  public code: string;
  public fieldErrors?: FieldError[];

  constructor(apiError: ApiErrorType) {
    super(apiError.message);
    this.name = "ApiError";
    this.code = apiError.code;
    this.fieldErrors = apiError.fieldErrors ?? undefined;

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  isValidationError(): boolean {
    return this.code.startsWith("Validation.");
  }

  getFieldError(field: string): string | undefined {
    return this.fieldErrors?.find((e) => e.field === field)?.message;
  }

  getFieldErrors(): Record<string, string> | undefined {
    if (!this.fieldErrors || this.fieldErrors.length === 0) return undefined;

    return this.fieldErrors.reduce(
      (acc, error) => {
        acc[error.field] = error.message;
        return acc;
      },
      {} as Record<string, string>
    );
  }

  hasFieldError(field: string): boolean {
    return this.fieldErrors?.some((e) => e.field === field) ?? false;
  }
}
