import { clsx, type ClassValue } from "clsx";
import type { FieldValues, UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import type { ApiResponse } from "./api/lib.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function pascalToCamelCase(str: string): string {
  if (str.startsWith("Validation.")) {
    const fieldName = str.split(".")[1];
    if (!fieldName) return str;

    return fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
  }

  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function extractFieldFromErrorCode(code: string): string | undefined {
  const parts = code.split(".");

  if (parts.length >= 2 && parts[0] === "Validation") {
    return pascalToCamelCase(parts[1]);
  }

  return undefined;
}

export function mapServerError<T extends FieldValues>(response: ApiResponse<any>, setError: UseFormSetError<T>) {
  if (!response.error) return;

  const field = extractFieldFromErrorCode(response.error.code);

  if (field) {
    setError(field as any, {
      type: "server",
      message: response.error.message,
    });
  } else {
    setError("root", {
      type: "server",
      message: response.error.message,
    });
  }
}
