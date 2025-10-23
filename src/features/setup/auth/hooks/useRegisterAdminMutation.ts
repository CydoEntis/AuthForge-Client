import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";
import type { RegisterAdminValues } from "../types";

export function useRegisterAdminMutation() {
  return useMutation({
    mutationFn: (values: RegisterAdminValues) => authApi.registerAdmin(values),
    onError: (error: any) => {
      console.error("Registration failed:", error.message);
    },
    // TODO: Pass data when AdminRegisterResponse is added.
    onSuccess: () => {
      console.log("Admin registered successfully");
      // Todo: Add toast + redirect
    },
  });
}
