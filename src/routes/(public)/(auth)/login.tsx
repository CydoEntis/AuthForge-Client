import { Login } from "@/features/auth/components/Login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
