import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { cn } from "@/lib/utils";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import { setupApi } from "@/features/setup/api";
import { useAuthStore } from "@/store/useAuthStore";

export const Route = createFileRoute("/(setup)")({
  beforeLoad: async ({ context }) => {
    const { isSetupComplete } = await context.queryClient.ensureQueryData({
      queryKey: ["setup-status"],
      queryFn: setupApi.getSetupStatus,
    });

    if (isSetupComplete) {
      const { refreshToken } = useAuthStore.getState();
      if (refreshToken) {
        throw redirect({ to: "/dashboard" });
      }
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { theme } = useTheme();
  return (
    <div className="relative z-0 min-h-screen overflow-hidden">
      <StarsBackground
        starColor={theme === "dark" ? "#F59E0B" : "#F59E0B"}
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-xl",
          "dark:bg-[radial-gradient(ellipse_at_bottom,#262626_0%,#000_100%)] bg-[radial-gradient(ellipse_at_bottom,#f5f5f5_0%,#fff_100%)]"
        )}
      />
      <Outlet />
    </div>
  );
}
