import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";
import type { LoginAdminValues } from "../types";

export function useLoginAdminMutation() {
  return useMutation({
    mutationFn: (values: LoginAdminValues) => authApi.loginAdmin(values),
    onError: (error: any) => {
      console.error("Login failed:", error.message);
    },
    onSuccess: (data) => {
      console.log("Logged in successfully", data);
      // Todo: Add toast + redirect
    },
  });
}
