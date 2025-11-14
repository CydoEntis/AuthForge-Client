import { AdminLogin } from "@/features/admin/components/AdminLogin";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AdminLogin />;
}
