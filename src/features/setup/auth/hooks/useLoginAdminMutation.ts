import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";
import type { LoginAdminValues } from "../types";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/useAuthStore";

export function useLoginAdminMutation() {
  const navigate = useNavigate();
  const { setTokens, setAdmin } = useAuthStore();

  return useMutation({
    mutationFn: (values: LoginAdminValues) => authApi.loginAdmin(values),
    onError: (error: any) => {
      console.error("Login failed:", error.message);
      // Todo: Add toast notification
    },
    onSuccess: (data) => {
      if (!data) {
        console.error("Login response is empty");
        return;
      }

      console.log("Logged in successfully", data);

      const { tokens, admin } = data;

      setTokens(tokens.accessToken, tokens.refreshToken);

      setAdmin(admin);

      navigate({ to: "/dashboard" });

      // TODO: Add toast notification
    },
  });
}
