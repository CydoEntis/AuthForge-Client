import { ChangePassword } from "@/features/account/components/ChangePassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(auth)/change-password")({
  component: ChangePassword,
});
