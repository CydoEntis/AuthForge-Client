import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { setupApi } from "@/features/setup/api";

export const Route = createFileRoute("/(public)")({
  beforeLoad: async ({ context }) => {
    const { isComplete } = await context.queryClient.ensureQueryData({
      queryKey: ["setup-status"],
      queryFn: setupApi.getSetupStatus,
    });

    if (!isComplete) {
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
