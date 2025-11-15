import { adminApi } from "@/features/admin/admin.api";
import { AdminResetPassword } from "@/features/admin/components/AdminResetPassword";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(auth)/reset-password")({
  validateSearch: (search: { token?: string }) => ({
    token: search.token ?? "",
  }),
  beforeLoad: async ({ search, context }) => {
    if (!search.token) {
      throw redirect({ to: "/login" });
    }

    const response = await context.queryClient.fetchQuery({
      queryKey: ["validate-reset-token", search.token],
      queryFn: () => adminApi.verifyPasswordResetToken(search.token),
    });

    if (!response.isValid) {
      throw redirect({ to: "/login" });
    }
  },
  component: AdminResetPassword,
});
