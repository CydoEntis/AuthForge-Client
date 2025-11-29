import { authApi } from "@/features/auth/auth.api";
import { ResetPassword } from "@/features/auth/components/ResetPassword";
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
      queryFn: () => authApi.verifyPasswordResetToken(search.token),
    });

    if (!response.isValid) {
      throw redirect({ to: "/login" });
    }
  },
  component: ResetPassword,
});
