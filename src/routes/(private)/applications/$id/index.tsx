import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { applicationsApi } from "@/features/applications/api";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export const Route = createFileRoute("/(private)/applications/$id/")({
  component: ApplicationOverviewPage,
});

function ApplicationOverviewPage() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  const { data: app, isLoading } = useQuery({
    queryKey: ["application", id],
    queryFn: () => applicationsApi.getById(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!app) return <div>Application not found</div>;

  return (
    <div>
      <PageHeader
        title={app.name}
        description={app.description || ""}
        onBack={() => navigate({ to: "/applications" })}
        actions={
          <Link to="/applications/$id/settings" params={{ id }}>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </Link>
        }
      />

      <div className="space-y-6">
        <p>Application Overview - Stats, Users, Info</p>
      </div>
    </div>
  );
}
