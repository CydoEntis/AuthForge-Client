import { authApi } from "@/features/setup/auth/api";
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
