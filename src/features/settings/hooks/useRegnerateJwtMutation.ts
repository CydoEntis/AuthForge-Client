import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/useAuthStore";
import { settingsApi } from "../settings.api";

export function useRegenerateJwtMutation() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: () => settingsApi.regenerateJwtSecret(),
    onSuccess: () => {
      toast.success("JWT secret regenerated. Please log in again.");
      logout();
      navigate({ to: "/login" });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to regenerate JWT secret");
    },
  });
}
