import { useFormMutation } from "@/hooks/useFormMutation";
import { useNavigate } from "@tanstack/react-router";
import type { UseFormSetError } from "react-hook-form";
import { authApi } from "../auth.api";
import type { ResetPasswordRequest } from "../auth.types";

export function useResetPasswordMutation(setError: UseFormSetError<ResetPasswordRequest>) {
  const navigate = useNavigate();

  return useFormMutation({
    mutationFn: (values: ResetPasswordRequest) => authApi.resetPassword(values),
    setError,
    successMessage: "Password reset successfully! Please log in.",
    onSuccess: () => {
      navigate({ to: "/login" });
    },
  });
}
