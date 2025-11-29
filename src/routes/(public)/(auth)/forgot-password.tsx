import { ForgotPassword } from "@/features/auth/components/ForgotPassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(auth)/forgot-password")({
  component: ForgotPassword,
});
