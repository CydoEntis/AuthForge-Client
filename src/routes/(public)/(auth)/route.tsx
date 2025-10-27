import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useTheme } from "next-themes";

export const Route = createFileRoute("/(public)/(auth)")({
  beforeLoad: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      throw redirect({ to: "/dashboard" });
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
