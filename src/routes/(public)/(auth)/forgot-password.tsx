import { createFileRoute } from "@tanstack/react-router";
import ForgotPasswordAdmin from "@/features/setup/auth/components/ForgotPasswordAdmin";

export const Route = createFileRoute("/(public)/(auth)/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 ">
      <ForgotPasswordAdmin />
    </div>
  );
}
