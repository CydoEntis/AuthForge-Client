import { useFormMutation } from "@/hooks/useFormMutation";
import type { UseFormSetError } from "react-hook-form";
import { applicationsApi } from "../application.api";

interface UpdateOriginsRequest {
  allowedOrigins: string[];
}

export function useUpdateOriginsMutation(applicationId: string, setError: UseFormSetError<UpdateOriginsRequest>) {
  return useFormMutation({
    mutationFn: (values: UpdateOriginsRequest) => applicationsApi.updateOrigins(applicationId, values),
    setError,
    successMessage: "Allowed origins updated successfully",
  });
}
