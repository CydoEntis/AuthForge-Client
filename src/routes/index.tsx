import { createFileRoute, redirect } from "@tanstack/react-router";
import { setupApi } from "@/features/setup/setup.api";
import { useAuthStore } from "@/store/useAuthStore";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    const { isSetupComplete } = await context.queryClient.ensureQueryData({
      queryKey: ["setup-status"],
      queryFn: setupApi.getSetupStatus,
    });

    console.log("PARENT ROUTE: ", isSetupComplete);

    if (isSetupComplete) {
      // ← Changed from isComplete
      throw redirect({ to: "/login" });
    }

    const { isAuthenticated } = useAuthStore.getState();
    throw redirect({ to: isAuthenticated ? "/dashboard" : "/login" });
  },
});
