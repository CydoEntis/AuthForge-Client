import { useFormMutation } from "@/hooks/useFormMutation";
import { useNavigate } from "@tanstack/react-router";
import type { AdminResetPasswordRequest } from "../admin.types";
import { adminApi } from "../admin.api";
import type { UseFormSetError } from "react-hook-form";

export function useAdminResetPasswordMutation(setError: UseFormSetError<AdminResetPasswordRequest>) {
  const navigate = useNavigate();

  return useFormMutation({
    mutationFn: (values: AdminResetPasswordRequest) => adminApi.resetPassword(values),
    setError,
    successMessage: "Password reset successfully! Please log in.",
    onSuccess: () => {
      navigate({ to: "/login" });
    },
  });
}
