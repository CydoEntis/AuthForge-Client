import { AdminForgotPassword } from "@/features/admin/components/AdminForgotPassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(auth)/forgot-password")({
  component: AdminForgotPassword,
});
