import { useAuthStore } from "@/store/useAuthStore";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(auth)")({
  beforeLoad: () => {
    const { refreshToken } = useAuthStore.getState();

    if (refreshToken) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative z-0 min-h-screen overflow-hidden">
      <Outlet />
    </div>
  );
}
