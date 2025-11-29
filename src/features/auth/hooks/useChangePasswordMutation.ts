import { useFormMutation } from "@/hooks/useFormMutation";
import type { ChangePasswordRequest } from "../auth.types";
import { authApi } from "../auth.api";
import type { UseFormSetError } from "react-hook-form";

export function useChangePasswordMutation(setError: UseFormSetError<ChangePasswordRequest>) {
  return useFormMutation({
    mutationFn: (values: ChangePasswordRequest) => authApi.changePassword(values),
    setError,
    successMessage: "Password changed successfully",
  });
}
