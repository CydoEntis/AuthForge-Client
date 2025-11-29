import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";
import { useZodForm } from "@/hooks/useZodForm";
import { useFormMutation } from "@/hooks/useFormMutation";
import { applicationsApi } from "@/features/applications/application.api";
import type { CreateApplication } from "@/features/applications/application.types";
import ManageOrigins from "@/features/applications/components/ManageOrigins";
import SelectAppEmailProvider from "@/features/email/components/EmailProviderSelector";
import EmailProviderSettingsForm from "@/components/EmailProviderSettingsForm";
import { OAuthProviderCard } from "@/components/OAuthProviderCard";
import { ContentSection } from "@/components/ContentSection";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/(private)/applications/create")({
  component: CreateApplicationPage,
});

const createApplicationSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().optional(),
    allowedOrigins: z.array(z.string().url("Invalid URL")).min(1, "At least one origin is required"),
    emailProvider: z.enum(["Smtp", "Resend"]),
    fromEmail: z.string().email("Must be valid email"),
    fromName: z.string().min(1, "From name is required"),
    smtpHost: z.string().optional(),
    smtpPort: z.union([z.string(), z.number()]).optional(),
    smtpUsername: z.string().optional(),
    smtpPassword: z.string().optional(),
    useSsl: z.boolean().default(true),
    resendApiKey: z.string().optional(),
    googleEnabled: z.boolean().default(false),
    googleClientId: z.string().optional(),
    googleClientSecret: z.string().optional(),
    githubEnabled: z.boolean().default(false),
    githubClientId: z.string().optional(),
    githubClientSecret: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.emailProvider === "Smtp") {
        return !!(data.smtpHost && data.smtpPort && data.smtpUsername && data.smtpPassword);
      }
      return true;
    },
    { message: "All SMTP fields required", path: ["smtpHost"] }
  )
  .refine(
    (data) => {
      if (data.emailProvider === "Resend") {
        return !!data.resendApiKey;
      }
      return true;
    },
    { message: "Resend API key required", path: ["resendApiKey"] }
  )
  .refine(
    (data) => {
      if (data.googleEnabled) {
        return !!data.googleClientId && !!data.googleClientSecret;
      }
      return true;
    },
    { message: "Client ID and Secret required", path: ["googleClientId"] }
  )
  .refine(
    (data) => {
      if (data.githubEnabled) {
        return !!data.githubClientId && !!data.githubClientSecret;
      }
      return true;
    },
    { message: "Client ID and Secret required", path: ["githubClientId"] }
  );

type CreateApplicationFormValues = z.infer<typeof createApplicationSchema>;

function CreateApplicationPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useZodForm<CreateApplicationFormValues>(createApplicationSchema, {
    defaultValues: {
      emailProvider: "Smtp",
      useSsl: true,
      googleEnabled: false,
      githubEnabled: false,
    },
  });

  const mutation = useFormMutation<CreateApplicationFormValues, any>({
    mutationFn: async (values) => {
      const payload: CreateApplication = {
        name: values.name,
        description: values.description,
        allowedOrigins: values.allowedOrigins,
        jwtSecret: null,
        emailSettings: {
          provider: values.emailProvider,
          apiKey: values.resendApiKey || "",
          fromEmail: values.fromEmail,
          fromName: values.fromName,
          passwordResetCallbackUrl: null,
          emailVerificationCallbackUrl: null,
        },
        oauthSettings:
          values.googleEnabled || values.githubEnabled
            ? {
                googleEnabled: values.googleEnabled,
                googleClientId: values.googleClientId,
                googleClientSecret: values.googleClientSecret,
                githubEnabled: values.githubEnabled,
                githubClientId: values.githubClientId,
                githubClientSecret: values.githubClientSecret,
              }
            : null,
      };

      return await applicationsApi.create(payload);
    },
    setError: form.setError,
    successMessage: "Application created successfully",
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      navigate({ to: "/applications/$id", params: { id: data.applicationId } });
    },
  });

  const emailProvider = form.watch("emailProvider");
  const googleEnabled = form.watch("googleEnabled");
  const githubEnabled = form.watch("githubEnabled");

  return (
    <div>
      <PageHeader
        title="Create Application"
        description="Set up a new application"
        onBack={() => navigate({ to: "/applications" })}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="space-y-8">
          {/* Application Details */}
          <ContentSection title="Application Details" description="Basic information about your application">
            <FormInput form={form} name="name" label="Application Name" placeholder="My Awesome App" />
            <FormInput
              form={form}
              name="description"
              label="Description (Optional)"
              placeholder="What does this application do?"
            />
          </ContentSection>

          {/* Allowed Origins */}
          <ContentSection title="Allowed Origins" description="Domains that can authenticate with this application">
            <ManageOrigins name="allowedOrigins" />
          </ContentSection>

          {/* Email Provider */}
          <ContentSection title="Email Provider" description="Configure email settings for this application">
            <SelectAppEmailProvider form={form} />
            <EmailProviderSettingsForm form={form} provider={emailProvider} />
          </ContentSection>

          {/* OAuth Providers */}
          <ContentSection title="OAuth Providers (Optional)" description="Allow users to sign in with social accounts">
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
                onEnabledChange={(checked) => form.setValue("githubEnabled", checked)}
                clientIdFieldName="githubClientId"
                clientSecretFieldName="githubClientSecret"
                setupUrl="https://github.com/settings/developers"
                instructions={[
                  "GitHub Developer Settings",
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

          {/* Actions */}
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
