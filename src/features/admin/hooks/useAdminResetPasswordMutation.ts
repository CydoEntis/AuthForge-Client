import { useMutation } from "@tanstack/react-query";
import type { AdminResetPasswordRequest } from "../admin.types";
import { adminApi } from "../admin.api";

export function useAdminResetPasswordMutation() {
  return useMutation({
    mutationFn: (values: AdminResetPasswordRequest) => adminApi.resetPassword(values),
    onError: (error: any) => {
      console.error("Change password failed:", error.message);
    },
    onSuccess: (data) => {
      console.log("Change password successful", data);
      // Todo: Add toast + redirect
    },
  });
}
