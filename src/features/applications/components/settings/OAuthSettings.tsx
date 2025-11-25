import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { ContentSection } from "@/features/admin/components/SettingsSection";
import { OAuthProviderCard } from "@/components/OAuthProviderCard";
import { useUpdateOAuthForm } from "@/features/applications/hooks/useUpdateOAuthForm";
import type { Application } from "../../types";

interface OAuthSettingsSectionProps {
  applicationId: string;
  application: Application;
}

export function OAuthSettingsSection({ applicationId, application }: OAuthSettingsSectionProps) {
  const { form, handleSubmit, isLoading } = useUpdateOAuthForm(applicationId, application);

  const googleEnabled = form.watch("googleEnabled");
  const githubEnabled = form.watch("githubEnabled");

  return (
    <ContentSection title="OAuth Providers" description="Configure social login providers">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <OAuthProviderCard
              form={form}
              provider="Google"
              enabled={googleEnabled}
              onEnabledChange={(checked) => form.setValue("googleEnabled", checked)}
              clientIdFieldName="googleClientId"
              clientSecretFieldName="googleClientSecret"
              setupUrl="https://console.cloud.google.com/apis/credentials"
              instructions={[
                "Google Cloud Console",
                "Create OAuth 2.0 Client ID",
                "Set type to 'Web application'",
                "Add redirect URI",
                "Copy credentials above",
              ]}
            />

            <OAuthProviderCard
              form={form}
              provider="GitHub"
              enabled={githubEnabled}
              onEnabledChange={(checked) => form.setValue("githubEnabled", checked)}
              clientIdFieldName="githubClientId"
              clientSecretFieldName="githubClientSecret"
              setupUrl="https://github.com/settings/developers"
              instructions={[
                "GitHub Developer Settings",
                "Click 'New OAuth App'",
                "Add redirect URI",
                "Copy credentials above",
              ]}
            />
          </div>

          <div className="flex justify-end">
            <LoadingButton type="submit" isLoading={isLoading}>
              Save OAuth Settings
            </LoadingButton>
          </div>
        </form>
      </Form>
    </ContentSection>
  );
}
