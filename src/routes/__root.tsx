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
    if (location.pathname !== "/") {
      return;
    }

    const setupStatus = await context.queryClient.ensureQueryData({
      queryKey: ["setup-status"],
      queryFn: authApi.getSetupStatus,
    });

    if (setupStatus.isSetupRequired) {
      throw redirect({ to: "/setup" });
    }

    const { isAuthenticated } = useAuthStore.getState();

    if (isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    } else {
      console.log("TO login?");

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
