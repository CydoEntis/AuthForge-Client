import { useFormMutation } from "@/hooks/useFormMutation";
import { emailApi } from "@/features/email/email.api";
import type { UseFormSetError } from "react-hook-form";
import type { TestEmailConfigRequest } from "../email.types";

export function useTestEmailProviderMutation(setError: UseFormSetError<TestEmailConfigRequest>) {
  return useFormMutation({
    mutationFn: (values: TestEmailConfigRequest) => emailApi.test(values),
    setError,
    successMessage: "Test email sent successfully",
  });
}
