import { useFormMutation } from "@/hooks/useFormMutation";
import type { UseFormSetError } from "react-hook-form";
import { settingsApi } from "../settings.api";
import type { UpdateDomainRequest } from "../settings.types";

export function useUpdateDomainMutation(setError: UseFormSetError<UpdateDomainRequest>) {
  return useFormMutation({
    mutationFn: (values: UpdateDomainRequest) => settingsApi.updateDomain(values),
    setError,
    successMessage: "Domain updated successfully",
  });
}
