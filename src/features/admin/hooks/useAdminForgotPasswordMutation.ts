import { useFormMutation } from "@/hooks/useFormMutation";
import type { AdminForgotPasswordRequest } from "../admin.types";
import { adminApi } from "../admin.api";
import type { UseFormSetError } from "react-hook-form";

export function useAdminForgotPasswordMutation(setError: UseFormSetError<AdminForgotPasswordRequest>) {
  return useFormMutation({
    mutationFn: (values: AdminForgotPasswordRequest) => adminApi.forgotPassword(values),
    setError,
    successMessage: "Password reset email sent successfully",
  });
}
