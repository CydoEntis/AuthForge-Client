import { useFormMutation } from "@/hooks/useFormMutation";
import { adminApi } from "../admin.api";
import type { TestEmailConfigRequest } from "@/features/setup/setup.types";
import type { UseFormSetError } from "react-hook-form";

export function useAdminTestEmailProviderMutation(setError: UseFormSetError<TestEmailConfigRequest>) {
  return useFormMutation({
    mutationFn: (values: TestEmailConfigRequest) => adminApi.testEmailProvider(values),
    setError,
    successMessage: "Email connection test successful!",
  });
}
