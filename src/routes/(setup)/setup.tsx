import { createFileRoute } from "@tanstack/react-router";
import RegisterAdmin from "@/features/setup/auth/components/RegisterAdmin";

export const Route = createFileRoute("/(setup)/setup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 ">
      <RegisterAdmin />
    </div>
  );
}
