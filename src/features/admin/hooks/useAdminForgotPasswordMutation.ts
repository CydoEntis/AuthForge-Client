import { useMutation } from "@tanstack/react-query";
import type { AdminForgotPasswordRequest } from "../admin.types";
import { adminApi } from "../admin.api";

export function useAdminForgotPasswordMutation() {
  return useMutation({
    mutationFn: (values: AdminForgotPasswordRequest) => adminApi.forgotPassword(values),
    onError: (error: any) => {
      console.error("Login failed:", error.message);
    },
    onSuccess: (data) => {
      console.log("Logged in successfully", data);
      // Todo: Add toast + redirect
    },
  });
}
