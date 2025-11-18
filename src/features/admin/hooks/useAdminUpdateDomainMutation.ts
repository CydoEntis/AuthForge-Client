import { useFormMutation } from "@/hooks/useFormMutation";
import { adminApi } from "../admin.api";
import type { AdminUpdateDomainRequest } from "../admin.types";
import type { UseFormSetError } from "react-hook-form";

export function useAdminUpdateDomainMutation(setError: UseFormSetError<AdminUpdateDomainRequest>) {
  return useFormMutation({
    mutationFn: (values: AdminUpdateDomainRequest) => adminApi.updateDomain(values),
    setError,
    successMessage: "Domain updated successfully",
  });
}
