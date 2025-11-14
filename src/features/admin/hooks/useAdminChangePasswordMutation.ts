import { useMutation } from "@tanstack/react-query";
import type { AdminChangePasswordRequest } from "../admin.types";
import { adminApi } from "../admin.api";

export function useAdminChangePasswordMutation() {
  return useMutation({
    mutationFn: (values: AdminChangePasswordRequest) => adminApi.changePassword(values),
    onError: (error: any) => {
      console.error("Login failed:", error.message);
    },
    onSuccess: (data) => {
      console.log("Logged in successfully", data);
      // Todo: Add toast + redirect
    },
  });
}
