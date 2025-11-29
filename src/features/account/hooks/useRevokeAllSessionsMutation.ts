import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/useAuthStore";
import { accountApi } from "../account.api";

export function useRevokeAllSessionsMutation() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: () => accountApi.revokeAllSessions(),
    onSuccess: (data) => {
      toast.success(`${data.sessionsRevoked} session(s) revoked. Please log in again.`);
      logout();
      navigate({ to: "/login" });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to revoke sessions");
    },
  });
}
