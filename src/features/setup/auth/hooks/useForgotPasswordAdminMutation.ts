import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";
import type { ForgotPasswordAdminValues } from "../types";

export function useForgotPasswordAdminMutation() {
  return useMutation({
    mutationFn: (values: ForgotPasswordAdminValues) => authApi.forgotPasswordAdmin(values),
    onError: (error: any) => {
      console.error("Login failed:", error.message);
    },
    onSuccess: (data) => {
      console.log("Logged in successfully", data);
      // Todo: Add toast + redirect
    },
  });
}
