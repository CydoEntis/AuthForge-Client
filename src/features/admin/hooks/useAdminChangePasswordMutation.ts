import { useFormMutation } from "@/hooks/useFormMutation";
import { adminApi } from "../admin.api";
import type { AdminChangePasswordRequest } from "../admin.types";
import type { UseFormSetError } from "react-hook-form";

export function useAdminChangePasswordMutation(setError: UseFormSetError<AdminChangePasswordRequest>) {
  return useFormMutation({
    mutationFn: (values: AdminChangePasswordRequest) => adminApi.changePassword(values),
    setError,
    successMessage: "Password changed successfully",
  });
}
