import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { authApi } from "../auth.api";

export function useLogoutMutation() {
  const navigate = useNavigate();
  const { logout, refreshToken } = useAuthStore();

  return useMutation({
    mutationFn: () => {
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }
      return authApi.logout(refreshToken);
    },
    onSuccess: () => {
      logout();
      navigate({ to: "/login" });
      toast.success("Logged out successfully");
    },
    onError: (error: Error) => {
      logout();
      navigate({ to: "/login" });
      toast.warning("Logged out (token may still be active on server)");
      console.error("Logout error:", error);
    },
  });
}
