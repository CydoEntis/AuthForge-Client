import { ForgotPasswordAdmin } from "@/features/admin/components/ForgotPasswordAdmin";
import { createFileRoute } from "@tanstack/react-router";

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
