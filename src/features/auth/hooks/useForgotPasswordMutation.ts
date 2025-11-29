import { useFormMutation } from "@/hooks/useFormMutation";
import type { UseFormSetError } from "react-hook-form";
import { authApi } from "../auth.api";
import type { ForgotPasswordRequest } from "../auth.types";

export function useForgotPasswordMutation(setError: UseFormSetError<ForgotPasswordRequest>) {
  return useFormMutation({
    mutationFn: (values: ForgotPasswordRequest) => authApi.forgotPassword(values),
    setError,
    successMessage: "Password reset email sent successfully",
  });
}
