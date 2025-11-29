import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useZodForm } from "@/hooks/useZodForm";
import { useFormMutation } from "@/hooks/useFormMutation";
import { applicationsApi } from "@/features/applications/application.api";
import { createApplicationRequestSchema } from "@/features/applications/application.schemas";
import type { CreateApplicationRequest } from "@/features/applications/application.types";
import ManageOrigins from "@/features/applications/components/ManageOrigins";
import { EmailConfigForm } from "@/features/email/components/EmailConfigForm";
import { OAuthProviderCard } from "@/components/OAuthProviderCard";
import { ContentSection } from "@/components/ContentSection";
import { PageHeader } from "@/components/PageHeader";
import { EMAIL_PROVIDERS } from "@/features/email/email.constants";
import type { EmailProviderConfig } from "@/features/email/email.types";

export const Route = createFileRoute("/(private)/applications/create")({
  component: CreateApplicationPage,
});

function CreateApplicationPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useZodForm(createApplicationRequestSchema, {
    defaultValues: {
      name: "",
      description: "",
      allowedOrigins: [],
      passwordResetCallbackUrl: "",
      emailVerificationCallbackUrl: "",
      magicLinkCallbackUrl: "",
      requireEmailVerification: true,
      useGlobalEmailSettings: true,
      emailProviderConfig: undefined,
      oauthSettings: {
        googleEnabled: false,
        googleClientId: "",
        googleClientSecret: "",
        githubEnabled: false,
        githubClientId: "",
        githubClientSecret: "",
      },
    },
  });

  const mutation = useFormMutation({
    mutationFn: async (values: CreateApplicationRequest) => {
      return await applicationsApi.create(values);
    },
    setError: form.setError,
    successMessage: "Application created successfully",
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      navigate({ to: "/applications/$id", params: { id: data.id } });
    },
  });

  const useGlobalEmailSettings = form.watch("useGlobalEmailSettings");
  const googleEnabled = form.watch("oauthSettings.googleEnabled");
  const githubEnabled = form.watch("oauthSettings.githubEnabled");

  return (
    <div>
      <PageHeader
        title="Create Application"
        description="Set up a new application with authentication"
        onBack={() => navigate({ to: "/applications" })}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="space-y-8">
          <ContentSection title="Application Details" description="Basic information about your application">
            <div className="space-y-4">
              <FormInput form={form} name="name" label="Application Name" placeholder="My Awesome App" />

              <FormInput
                form={form}
                name="description"
                label="Description (Optional)"
                placeholder="What does this application do?"
              />
            </div>
          </ContentSection>

          <ContentSection
            title="Allowed Origins"
            description="Domains that can authenticate with this application (CORS)"
          >
            <ManageOrigins name="allowedOrigins" />
          </ContentSection>

          <ContentSection
            title="Callback URLs (Optional)"
            description="URLs where users will be redirected after authentication actions"
          >
            <div className="space-y-4">
              <FormInput
                form={form}
                name="passwordResetCallbackUrl"
                label="Password Reset Callback URL"
                placeholder="https://yourapp.com/reset-password"
              />

              <FormInput
                form={form}
                name="emailVerificationCallbackUrl"
                label="Email Verification Callback URL"
                placeholder="https://yourapp.com/verify-email"
              />

              <FormInput
                form={form}
                name="magicLinkCallbackUrl"
                label="Magic Link Callback URL"
                placeholder="https://yourapp.com/magic-link"
              />
            </div>
          </ContentSection>

          <ContentSection
            title="Email Settings"
            description="Configure how this application sends emails (password resets, verification, etc.)"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="use-global-settings" className="text-base font-medium">
                    Use Global Email Settings
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Use the email provider configured in AuthForge settings. Uncheck to configure app-specific settings.
                  </p>
                </div>
                <Switch
                  id="use-global-settings"
                  checked={useGlobalEmailSettings}
                  onCheckedChange={(checked) => {
                    form.setValue("useGlobalEmailSettings", checked);
                    if (checked) {
                      form.setValue("emailProviderConfig", undefined);
                    }
                  }}
                />
              </div>

              {!useGlobalEmailSettings && (
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Application-Specific Email Settings</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure a custom email provider for this application only
                    </p>
                  </div>

                  <EmailConfigForm
                    initialProvider={EMAIL_PROVIDERS.SMTP}
                    onSave={async (config: EmailProviderConfig) => {
                      form.setValue("emailProviderConfig", config as any);
                    }}
                  />
                </div>
              )}
            </div>
          </ContentSection>

          <ContentSection title="Email Verification" description="Require users to verify their email address">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="require-verification" className="text-base font-medium">
                  Require Email Verification
                </Label>
                <p className="text-sm text-muted-foreground">Users must verify their email before they can sign in</p>
              </div>
              <Switch
                id="require-verification"
                checked={form.watch("requireEmailVerification")}
                onCheckedChange={(checked) => form.setValue("requireEmailVerification", checked)}
              />
            </div>
          </ContentSection>

          <ContentSection title="OAuth Providers (Optional)" description="Allow users to sign in with social accounts">
            <div className="space-y-4">
              <OAuthProviderCard
                form={form}
                provider="Google"
                enabled={googleEnabled}
                onEnabledChange={(checked) => form.setValue("oauthSettings.googleEnabled", checked)}
                clientIdFieldName="oauthSettings.googleClientId"
                clientSecretFieldName="oauthSettings.googleClientSecret"
                setupUrl="https://console.cloud.google.com/apis/credentials"
                instructions={[
                  "Go to Google Cloud Console",
                  "Create a new OAuth 2.0 Client ID",
                  "Set application type to 'Web application'",
                  "Add your redirect URI (you'll get this after creating the app)",
                  "Copy Client ID and Client Secret above",
                ]}
              />

              <OAuthProviderCard
                form={form}
                provider="GitHub"
                enabled={githubEnabled}
                onEnabledChange={(checked) => form.setValue("oauthSettings.githubEnabled", checked)}
                clientIdFieldName="oauthSettings.githubClientId"
                clientSecretFieldName="oauthSettings.githubClientSecret"
                setupUrl="https://github.com/settings/developers"
                instructions={[
                  "Go to GitHub Developer Settings",
                  "Click 'New OAuth App'",
                  "Add your redirect URI (you'll get this after creating the app)",
                  "Copy Client ID and generate Client Secret",
                ]}
              />

              <p className="text-sm text-muted-foreground">
                💡 You can skip OAuth now and configure it later in application settings
              </p>
            </div>
          </ContentSection>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/applications" })}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <LoadingButton type="submit" isLoading={mutation.isPending}>
              Create Application
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateApplicationPage;
