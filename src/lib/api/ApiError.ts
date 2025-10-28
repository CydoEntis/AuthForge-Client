import { extractFieldFromErrorCode } from "../utils";
import type { ApiError as ApiErrorType } from "./types";

export class ApiError extends Error {
  public code: string;
  public field?: string;

  constructor(apiError: ApiErrorType) {
    super(apiError.message);
    this.name = "ApiError";
    this.code = apiError.code;
    this.field = extractFieldFromErrorCode(apiError.code);

    // ✅ Fix prototype chain for instanceof
    Object.setPrototypeOf(this, ApiError.prototype);

    console.log("🔨 ApiError constructor called");
    console.log("  - message:", apiError.message);
    console.log("  - code:", apiError.code);
    console.log("  - extracted field:", this.field);
  }
}
