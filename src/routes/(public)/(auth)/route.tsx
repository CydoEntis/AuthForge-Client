import { setupApi } from "@/features/setup/setup.api";
import { useAuthStore } from "@/store/useAuthStore";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(auth)")({
  beforeLoad: async ({ context }) => {
    const { isSetupComplete } = await context.queryClient.ensureQueryData({
      queryKey: ["setup-status"],
      queryFn: setupApi.getSetupStatus,
    });

    if (!isSetupComplete) {
      throw redirect({ to: "/setup" });
    }

    const { refreshToken } = useAuthStore.getState();
    if (refreshToken) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
