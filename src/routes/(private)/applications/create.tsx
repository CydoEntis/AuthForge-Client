import ApplicationForm from "@/features/applications/components/ApplicationForm";
import { useCreateApplication } from "@/features/applications/hooks/useCreateApplication";
import type { CreateApplication } from "@/features/applications/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/applications/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const createMutation = useCreateApplication();
  const handleCreateApp = async (formData: CreateApplication) => {
    await createMutation.mutateAsync(formData);
  };

  return (
    <section className="max-w-5/6 p-4">
      <ApplicationForm onSubmit={handleCreateApp} />
    </section>
  );
}
