import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";
import type { LoginAdminValues } from "../types";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

export function useLoginAdminMutation() {
  const navigate = useNavigate();
  const { setTokens, setAdmin } = useAuthStore();

  return useMutation({
    mutationFn: (values: LoginAdminValues) => authApi.loginAdmin(values),
    onError: (error: any) => {
      console.error("Login failed:", error.message);
      toast.error("Failed to login. Please check your credentials and try again.");
    },
    onSuccess: (data) => {
      if (!data) {
        console.error("Login response is empty");
        return;
      }

      const { tokens, admin } = data;

      setTokens(tokens.accessToken, tokens.refreshToken);

      setAdmin(admin);

      toast.success("Login successful!");

      navigate({ to: "/dashboard" });
    },
  });
}
