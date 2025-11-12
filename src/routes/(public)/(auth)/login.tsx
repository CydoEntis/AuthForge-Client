import { LoginAdmin } from "@/features/admin/components/LoginAdmin";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginAdmin />;
}
