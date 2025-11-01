import { createFileRoute, redirect } from "@tanstack/react-router";
import { setupApi } from "@/features/setup/api";
import { useAuthStore } from "@/store/useAuthStore";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    const setupStatus = await context.queryClient.ensureQueryData({
      queryKey: ["setup-status"],
      queryFn: setupApi.getSetupStatus,
    });

    if (setupStatus.isSetupRequired) {
      throw redirect({ to: "/setup" });
    }

    const { isAuthenticated } = useAuthStore.getState();
    throw redirect({ to: isAuthenticated ? "/dashboard" : "/login" });
  },
});
