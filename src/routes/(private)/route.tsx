import { createFileRoute, redirect } from "@tanstack/react-router";
import AppShell from "@/components/layout/AppShell";
import { setupApi } from "@/features/setup/setup.api";
import { useAuthStore } from "@/store/useAuthStore";

export const Route = createFileRoute("/(private)")({
  beforeLoad: async ({ context }) => {
    const { isSetupComplete } = await context.queryClient.ensureQueryData({
      queryKey: ["setup-status"],
      queryFn: setupApi.getSetupStatus,
    });
    if (!isSetupComplete) {
      throw redirect({ to: "/setup" });
    }

    const { refreshToken } = useAuthStore.getState();
    if (!refreshToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: AppShell,
});
