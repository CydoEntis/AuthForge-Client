import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import type { AdminResetPasswordRequest } from "../admin.types";
import { adminApi } from "../admin.api";

export function useAdminResetPasswordMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: AdminResetPasswordRequest) => adminApi.resetPassword(values),
    onError: (error: any) => {
      console.error("Password reset failed:", error.message);
      toast.error("Failed to reset password. Please try again.");
    },
    onSuccess: () => {
      toast.success("Password reset successfully! Please log in.");
      navigate({ to: "/login" });
    },
  });
}
