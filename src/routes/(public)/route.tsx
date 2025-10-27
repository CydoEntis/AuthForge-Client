import { authApi } from "@/features/setup/auth/api";
import { useAuthStore } from "@/store/useAuthStore";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)")({
  beforeLoad: async ({ context }) => {
    const setupStatus = await context.queryClient.ensureQueryData({
      queryKey: ["setup-status"],
      queryFn: authApi.getSetupStatus,
    });

    if (setupStatus.isSetupRequired) {
      throw redirect({ to: "/setup" });
    }

    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
