import { createFileRoute } from "@tanstack/react-router";
import LoginAdmin from "@/features/setup/auth/components/LoginAdmin";

export const Route = createFileRoute("/(public)/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 ">
      <LoginAdmin />
    </div>
  );
}
