import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { cn } from "@/lib/utils";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import { setupApi } from "@/features/setup/setup.api";
import { useAuthStore } from "@/store/useAuthStore";
import { Anvil } from "lucide-react";
import { ThemeToggle } from "@/features/theme/ThemeToggle";

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
  return (
    <div className="w-full min-h-screen bg-sidebar">
      <main className=" max-w-5/6 mx-auto py-4 px-8">
        <div className="p-4 inset-shadow-sm bg-linear-to-t from-card to-background rounded-lg flex justify-between items-center border dark:border-black border-[#c7c7c7]">
          <div className="flex gap-2 items-center">
            <div className="inset-shadow-sm rounded-lg bg-card p-2 border dark:border-black border-[#c7c7c7]">
              <Anvil className="text-primary" size={22} />
            </div>
            <h3 className="font-bold text-lg text-muted-foreground">Auth Forge</h3>
          </div>
          <ThemeToggle />
        </div>

        <Outlet />
      </main>
    </div>
  );
}
