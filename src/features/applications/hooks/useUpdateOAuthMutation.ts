import { useFormMutation } from "@/hooks/useFormMutation";
import type { UseFormSetError } from "react-hook-form";
import { applicationsApi } from "../application.api";

interface UpdateOAuthRequest {
  googleEnabled: boolean;
  googleClientId?: string;
  googleClientSecret?: string;
  githubEnabled: boolean;
  githubClientId?: string;
  githubClientSecret?: string;
}

export function useUpdateOAuthMutation(applicationId: string, setError: UseFormSetError<UpdateOAuthRequest>) {
  return useFormMutation({
    mutationFn: (values: UpdateOAuthRequest) => applicationsApi.updateOAuth(applicationId, values),
    setError,
    successMessage: "OAuth settings updated successfully",
  });
}
