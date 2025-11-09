import { createFileRoute, redirect } from "@tanstack/react-router";
import AppShell from "@/components/layout/AppShell";
import { setupApi } from "@/features/setup/setup.api";
import { useAuthStore } from "@/store/useAuthStore";
import { authApi } from "@/features/setup/auth/api";

export const Route = createFileRoute("/(private)")({
  beforeLoad: async ({ context }) => {
    const { accessToken, refreshToken, updateAccessToken, logout } = useAuthStore.getState();

    if (!refreshToken) {
      throw redirect({ to: "/login" });
    }

    if (!accessToken) {
      try {
        const response = await authApi.refreshToken(refreshToken);
        updateAccessToken(response.accessToken);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        logout();
        throw redirect({ to: "/login" });
      }
    }

    const { isComplete } = await context.queryClient.ensureQueryData({
      queryKey: ["setup-status"],
      queryFn: setupApi.getSetupStatus,
    });

    if (!isComplete) {
      throw redirect({ to: "/setup" });
    }
  },
  component: AppShell,
});
