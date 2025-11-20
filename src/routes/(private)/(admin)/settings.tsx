import { AdminChangePassword } from "@/features/admin/components/AdminChangePassword";
import { AdminUpdateDomain } from "@/features/admin/components/settings/AdminUpdateDomain";
import { AdminUpdateEmail } from "@/features/admin/components/settings/AdminUpdateEmail";
import { AdminUpdateEmailProvider } from "@/features/admin/components/settings/AdminUpdateEmailProvider";
import { AdminRevokeAllSessions } from "@/features/admin/components/settings/AdminRevokeAllSessions";
import { AdminRegenerateJwt } from "@/features/admin/components/settings/AdminRegenerateJwt";
import { SettingsSection } from "@/features/admin/components/SettingsSection";
import { useAdminSettingsQuery } from "@/features/admin/hooks/useAdminSettingsQuery";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/(private)/(admin)/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: settings, isLoading } = useAdminSettingsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-2 py-4 w-full border-b-2 border-black shadow-bottom-sm">
        <h1 className="text-4xl font-semibold py-1.25">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      {/* Account */}
      <SettingsSection title="Account" description="Modify account details">
        <AdminUpdateEmail currentEmail={settings?.email} />
      </SettingsSection>

      {/* Domain */}
      <SettingsSection title="Domain" description="The domain where Auth Forge is hosted.">
        <AdminUpdateDomain currentDomain={settings?.authForgeDomain} />
      </SettingsSection>

      {/* Security - Password */}
      <SettingsSection title="Security" description="Manage your password">
        <AdminChangePassword />
      </SettingsSection>

      {/* Security - Sessions */}
      <SettingsSection title="Active Sessions" description="Manage your active sessions">
        <AdminRevokeAllSessions />
      </SettingsSection>

      {/* Security - JWT */}
      <SettingsSection title="JWT Secret" description="Regenerate the JWT signing secret (nuclear option)">
        <AdminRegenerateJwt />
      </SettingsSection>

      {/* Email Provider */}
      <SettingsSection title="Email Provider" description="Configure your email service">
        <AdminUpdateEmailProvider emailProviderSettings={settings?.emailProvider} />
      </SettingsSection>
    </div>
  );
}
