import { useFormMutation } from "@/hooks/useFormMutation";
import { adminApi } from "../admin.api";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/useAuthStore";
import type { AdminLoginRequest } from "../admin.types";
import type { UseFormSetError } from "react-hook-form";

export function useAdminLoginMutation(setError: UseFormSetError<AdminLoginRequest>) {
  const navigate = useNavigate();
  const { setTokens } = useAuthStore();

  return useFormMutation({
    mutationFn: adminApi.login,
    setError,
    successMessage: "Login successful!",
    onSuccess: (data) => {
      const { tokens } = data;
      setTokens(tokens.accessToken, tokens.refreshToken);
      navigate({ to: "/applications", viewTransition: { types: ["slide-right"] } });
    },
  });
}
