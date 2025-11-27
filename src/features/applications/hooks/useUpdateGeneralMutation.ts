import { useFormMutation } from "@/hooks/useFormMutation";
import type { UseFormSetError } from "react-hook-form";
import { applicationsApi } from "../application.api";

interface UpdateGeneralRequest {
  name: string;
  description?: string;
}

export function useUpdateGeneralMutation(applicationId: string, setError: UseFormSetError<UpdateGeneralRequest>) {
  return useFormMutation({
    mutationFn: (values: UpdateGeneralRequest) => applicationsApi.update(applicationId, values),
    setError,
    successMessage: "General settings updated successfully",
  });
}
