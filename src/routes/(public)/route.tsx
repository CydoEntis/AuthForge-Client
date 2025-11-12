import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { setupApi } from "@/features/setup/setup.api";
import { PublicNavbar } from "@/components/PublicNavbar";
import { useAuthStore } from "@/store/useAuthStore";

export const Route = createFileRoute("/(public)")({
  beforeLoad: async ({ context }) => {
    const { isSetupComplete } = await context.queryClient.ensureQueryData({
      queryKey: ["setup-status"],
      queryFn: setupApi.getSetupStatus,
    });

    console.log(isSetupComplete);

    if (isSetupComplete) {
      const { refreshToken } = useAuthStore.getState();
      if (refreshToken) {
        throw redirect({ to: "/dashboard" });
      }
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="relative  max-w-5/6 mx-auto py-4 px-8">
      <PublicNavbar />
      <div className="h-[70vh] flex justify-center items-center w-full">
        <Outlet />
      </div>
    </main>
  );
}
