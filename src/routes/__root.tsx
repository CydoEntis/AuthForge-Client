import { Outlet, createRootRouteWithContext, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import type { QueryClient } from "@tanstack/react-query";
import { authApi } from "@/features/setup/auth/api";
import { useAuthStore } from "@/store/useAuthStore";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context, location }) => {
    // Only redirect from root "/" path
    if (location.pathname !== "/") {
      return;
    }

    // Check setup status
    const setupStatus = await context.queryClient.ensureQueryData({
      queryKey: ["setup-status"],
      queryFn: authApi.getSetupStatus,
    });

    // If setup required, redirect to setup
    if (setupStatus.isSetupRequired) {
      throw redirect({ to: "/setup" });
    }

    // Check authentication
    const { isAuthenticated } = useAuthStore.getState();

    if (isAuthenticated) {
      // Authenticated - go to dashboard
      throw redirect({ to: "/dashboard" });
    } else {
      // Not authenticated - go to login
      throw redirect({ to: "/login" });
    }
  },

  component: () => (
    <>
      <Outlet />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </>
  ),
});
