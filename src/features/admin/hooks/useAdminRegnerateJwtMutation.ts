import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { adminApi } from "../admin.api";

export function useAdminRegenerateJwtMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => adminApi.regenerateJwtSecret(),
    onSuccess: () => {
      toast.success("JWT secret regenerated. Please log in again.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate({ to: "/login" });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to regenerate JWT secret");
    },
  });
}
