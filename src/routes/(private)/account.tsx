import { ContentSection } from "@/components/ContentSection";
import { PageHeader } from "@/components/PageHeader";
import { ChangePassword } from "@/features/account/components/ChangePassword";
import { RevokeAllSessions } from "@/features/account/components/RevokeAllSessions";
import { UpdateEmail } from "@/features/account/components/UpdateEmail";
import { useGetAccountQuery } from "@/features/account/hooks/useGetAccountQuery";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/(private)/account")({
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

      <ContentSection title="Password" description="Manage your password">
        <ChangePassword />
      </ContentSection>
      <ContentSection title="Sessions" description="Manage your sessions">
        <RevokeAllSessions />
      </ContentSection>
    </div>
  );
}
