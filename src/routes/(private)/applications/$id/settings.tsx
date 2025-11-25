import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { applicationsApi } from "@/features/applications/application.api";
import { PageHeader } from "@/components/PageHeader";
import { GeneralSettingsSection } from "@/features/applications/components/settings/GeneralSettings";
import { AllowedOriginsSection } from "@/features/applications/components/settings/AllowedOrigins";
import { OAuthSettingsSection } from "@/features/applications/components/settings/OAuthSettings";
import { ApplicationEmailProvider } from "@/features/applications/components/settings/ApplicationEmailProvider";

export const Route = createFileRoute("/(private)/applications/$id/settings")({
  component: ApplicationSettingsPage,
});

function ApplicationSettingsPage() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  const { data: app, isLoading } = useQuery({
    queryKey: ["application", id],
    queryFn: () => applicationsApi.getById(id),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-destructive">Application not found</div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Application Settings"
        description={`Manage settings for ${app.name}`}
        onBack={() => navigate({ to: "/applications/$id", params: { id } })}
      />

      <div className="space-y-8">
        <GeneralSettingsSection applicationId={id} application={app} />
        <AllowedOriginsSection applicationId={id} application={app} />
        <ApplicationEmailProvider applicationId={id} emailProviderSettings={app.emailSettings} />
        <OAuthSettingsSection applicationId={id} application={app} />
      </div>
    </div>
  );
}
