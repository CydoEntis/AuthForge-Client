import { useFormMutation } from "@/hooks/useFormMutation";
import { adminApi } from "../admin.api";
import type { AdminUpdateEmailProviderRequest } from "../admin.types";
import type { UseFormSetError } from "react-hook-form";

export function useAdminUpdateEmailProviderMutation(setError: UseFormSetError<AdminUpdateEmailProviderRequest>) {
  return useFormMutation({
    mutationFn: (values: AdminUpdateEmailProviderRequest) => adminApi.updateEmailProvider(values),
    setError,
    successMessage: "Email provider updated successfully!",
  });
}
