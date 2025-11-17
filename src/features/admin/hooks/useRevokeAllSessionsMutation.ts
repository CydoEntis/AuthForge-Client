import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { adminApi } from "../admin.api";

export function useRevokeAllSessionsMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => adminApi.revokeAllSessions(),
    onSuccess: (data) => {
      toast.success(`${data.sessionsRevoked} session(s) revoked. Please log in again.`);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate({ to: "/login" });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to revoke sessions");
    },
  });
}
