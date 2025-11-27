import { AdminChangePassword } from "@/features/admin/components/AdminChangePassword";
import { AdminUpdateDomain } from "@/features/admin/components/settings/AdminUpdateDomain";
import { AdminUpdateEmail } from "@/features/admin/components/settings/AdminUpdateEmail";
import { AdminUpdateEmailProvider } from "@/features/admin/components/settings/AdminUpdateEmailProvider";
import { AdminRevokeAllSessions } from "@/features/admin/components/settings/AdminRevokeAllSessions";
import { AdminRegenerateJwt } from "@/features/admin/components/settings/AdminRegenerateJwt";
import { ContentSection } from "@/features/admin/components/SettingsSection";
import { useAdminSettingsQuery } from "@/features/admin/hooks/useAdminSettingsQuery";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/(private)/(admin)/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: settings, isLoading } = useAdminSettingsQuery();
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
      <PageHeader title="Admin Settings" description="Manage your Auth Forge instance settings" />

      <ContentSection title="Account" description="Modify account details">
        <AdminUpdateEmail currentEmail={settings?.email} />
      </ContentSection>

      <ContentSection title="Domain" description="The domain where Auth Forge is hosted.">
        <AdminUpdateDomain currentDomain={settings?.authForgeDomain} />
      </ContentSection>

      <ContentSection title="Security" description="Manage your password">
        <AdminChangePassword />
      </ContentSection>

      <ContentSection title="Active Sessions" description="Manage your active sessions">
        <AdminRevokeAllSessions />
      </ContentSection>

      <ContentSection title="JWT Secret" description="Regenerate the JWT signing secret (nuclear option)">
        <AdminRegenerateJwt />
      </ContentSection>

      <ContentSection title="Email Provider" description="Configure your email service">
        <AdminUpdateEmailProvider emailProviderSettings={settings?.emailProvider} />
      </ContentSection>
    </div>
  );
}
