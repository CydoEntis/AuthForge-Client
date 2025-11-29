import { useFormMutation } from "@/hooks/useFormMutation";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/useAuthStore";
import type { UseFormSetError } from "react-hook-form";
import { authApi } from "../auth.api";
import type { LoginRequest } from "../auth.types";

export function useLoginMutation(setError: UseFormSetError<LoginRequest>) {
  const navigate = useNavigate();
  const { setTokens } = useAuthStore();

  return useFormMutation({
    mutationFn: authApi.login,
    setError,
    successMessage: "Login successful!",
    onSuccess: (data) => {
      const { tokens } = data;
      setTokens(tokens.accessToken, tokens.refreshToken);
      navigate({ to: "/applications", viewTransition: { types: ["slide-right"] } });
    },
  });
}
