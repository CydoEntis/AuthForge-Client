import { adminApi } from "@/features/admin/admin.api";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(auth)/reset-password")({
  validateSearch: (search) => {
    return {
      token: search.token as string | undefined,
    };
  },
  beforeLoad: async ({ search, context }) => {
    if (!search.token) {
      throw redirect({ to: "/login" });
    }

    const isValid = await context.queryClient.fetchQuery({
      queryKey: ["validate-reset-token", search.token],
      queryFn: () => adminApi.verifyPasswordResetToken(search.token),
    });

    if (!isValid) {
      throw redirect({ to: "/login" });
    }
  },
  component: AdminResetPassword,
});

function AdminResetPassword() {
  return <div>Hello "/(public)/(auth)/reset-password"!</div>;
}
