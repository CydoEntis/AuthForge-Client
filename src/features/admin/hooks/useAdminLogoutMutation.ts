import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { adminApi } from "../admin.api";

export function useAdminLogoutMutation() {
  const navigate = useNavigate();
  const { logout, refreshToken } = useAuthStore();

  return useMutation({
    mutationFn: () => {
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }
      return adminApi.logout(refreshToken);
    },
    onSuccess: () => {
      logout();
      navigate({ to: "/login" });
      toast.success("Logged out successfully");
    },
    onError: (error: Error) => {
      logout();
      navigate({ to: "/login" });
      toast.success("Logged out successfully");
      console.error("Logout error:", error);
    },
  });
}
