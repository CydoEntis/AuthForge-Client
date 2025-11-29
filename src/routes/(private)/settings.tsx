import { ContentSection } from "@/components/ContentSection";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useAuthForgeSettingsQuery } from "@/features/settings/hooks/useAuthForgeSettingsQuery";
import { useUpdateEmailProviderMutation } from "@/features/settings/hooks/useUpdateEmailProviderMutation";
import { RegenerateJwt } from "@/features/settings/components/RegenerateJwt";
import { EmailConfigForm } from "@/features/email/components/EmailConfigForm";
import type { EmailProviderConfig } from "@/features/email/email.types";
import { EMAIL_PROVIDERS } from "@/features/email/email.constants";
import { UpdateDomain } from "@/features/settings/components/UpdateDomain";

export const Route = createFileRoute("/(private)/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: settings, isLoading } = useAuthForgeSettingsQuery();
  console.log(settings);
  const updateEmailProvider = useUpdateEmailProviderMutation();

  const handleSaveEmailConfig = async (config: EmailProviderConfig) => {
    await updateEmailProvider.mutateAsync({
      emailProviderConfig: config,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const emailProviderData = settings?.emailProvider;
  const initialProvider = emailProviderData?.emailProvider === "Resend" ? EMAIL_PROVIDERS.RESEND : EMAIL_PROVIDERS.SMTP;
  const initialConfig: EmailProviderConfig | undefined = emailProviderData
    ? {
        emailProvider: initialProvider,
        fromEmail: emailProviderData.fromEmail || "",
        fromName: emailProviderData.fromName || "",
        smtpHost: emailProviderData.smtpHost || "",
        smtpPort: emailProviderData.smtpPort || 587,
        smtpUsername: emailProviderData.smtpUsername || "",
        smtpPassword: "",
        useSsl: emailProviderData.useSsl ?? true,
        resendApiKey: "",
      }
    : undefined;

  return (
    <div>
      <PageHeader title="Settings" description="Manage your AuthForge instance configuration" />

      <ContentSection
        title="Domain"
        description="Configure the public URL for AuthForge. Used in email links and callbacks."
      >
        <UpdateDomain currentDomain={settings?.authForgeDomain} />
      </ContentSection>

      <ContentSection
        title="Email Provider"
        description="Configure how AuthForge sends emails (password resets, verification, etc.)"
      >
        <EmailConfigForm
          initialProvider={initialProvider}
          initialConfig={initialConfig}
          onSave={handleSaveEmailConfig}
          isSaving={updateEmailProvider.isPending}
        />
      </ContentSection>

      <ContentSection
        title="JWT Secret"
        description="Regenerate the JWT signing secret. This will invalidate all existing admin sessions."
      >
        <RegenerateJwt />
      </ContentSection>
    </div>
  );
}
