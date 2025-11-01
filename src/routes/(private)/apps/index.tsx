import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateAppModal, { type CreateAppFormValues } from "@/features/applications/components/CreateApplication";

export const Route = createFileRoute("/(private)/apps/")({
  component: ApplicationsDashboard,
});

function ApplicationsDashboard() {
  const [open, setOpen] = useState(false);
  const [applications, setApplications] = useState<CreateAppFormValues[]>([]); // example local state for apps

  // This is your onCreate function that will be passed to the modal
  const handleCreateApp = async (data: CreateAppFormValues) => {
    try {
      // TODO: call your API here, e.g.
      // const createdApp = await apiClient.createApplication(data);
      // For now, just simulate adding it locally:
      setApplications((prev) => [...prev, data]);
    } catch (err) {
      console.error(err);
      throw err; // re-throw to allow useFormMutation to show errors
    }
  };

  return (
    <div className="px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Your Applications</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Application
        </Button>
      </div>

      {/* Render your app list here */}
      <div className="space-y-2">
        {/* {applications.map((app, i) => (
          <div key={i} className="p-4 border rounded-md">
            <p className="font-medium">{app.name}</p>
            <p className="text-sm text-muted-foreground">
              Allowed Origins: {app.allowedOrigins.map((o) => o.origin).join(", ")}
            </p>
            <p className="text-sm text-muted-foreground">Email Provider: {app.emailProvider}</p>
          </div>
        ))} */}
      </div>

      {/* Modal */}
      <CreateAppModal open={open} onOpenChange={setOpen} onCreate={handleCreateApp} />
    </div>
  );
}
