import { AdminChangePassword } from "@/features/admin/components/AdminChangePassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(auth)/change-password")({
  component: AdminChangePassword,
});
