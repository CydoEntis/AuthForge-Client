import { ContentSection } from "@/components/ContentSection";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { UpdateEmail } from "@/features/account/components/UpdateEmail";
import { ChangePassword } from "@/features/account/components/ChangePassword";
import { useGetAccountQuery } from "@/features/account/hooks/useGetAccountQuery";
import { RevokeAllSessions } from "@/features/account/components/RevokeAllSessions";

export const Route = createFileRoute("/(private)/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: settings, isLoading } = useGetAccountQuery();
  console.log(settings);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Account Settings" description="Manage your Auth Forge instance settings" />

      <ContentSection title="Account" description="Modify account details">
        <UpdateEmail currentEmail={settings?.email} />
      </ContentSection>

      <ContentSection title="Security" description="Manage your password and sessions">
        <ChangePassword />
        <RevokeAllSessions />
      </ContentSection>
    </div>
  );
}
