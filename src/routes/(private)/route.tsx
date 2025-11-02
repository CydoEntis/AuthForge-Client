import { createFileRoute, redirect } from "@tanstack/react-router";
import AppShell from "@/components/layout/AppShell";
import { setupApi } from "@/features/setup/api";
import { useAuthStore } from "@/store/useAuthStore";

export const Route = createFileRoute("/(private)")({
  beforeLoad: async ({ context }) => {
    // Check authentication first
    const { refreshToken } = useAuthStore.getState();
    if (!refreshToken) {
      throw redirect({ to: "/login" });
    }

    // Then check if setup is complete
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
