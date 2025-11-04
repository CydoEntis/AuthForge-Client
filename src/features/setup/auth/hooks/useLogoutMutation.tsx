import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { authApi } from "../api";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

export function useLogoutMutation() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: authApi.logoutAdmin,
    onSuccess: () => {
      // Clear auth state
      logout();

      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();

      // Navigate to login
      navigate({ to: "/login" });

      toast.success("Logged out successfully");
    },
    onError: (error: Error) => {
      // Even if the API call fails, we should still logout locally
      logout();
      localStorage.clear();
      sessionStorage.clear();
      navigate({ to: "/login" });

      toast.error("Logout failed, but you've been logged out locally");
      console.error("Logout error:", error);
    },
  });
}
