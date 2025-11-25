import { z } from "zod";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { ContentSection } from "@/features/admin/components/SettingsSection";
import { useZodForm } from "@/hooks/useZodForm";
import { useFormMutation } from "@/hooks/useFormMutation";
import { applicationsApi } from "@/features/applications/api";
import type { Application } from "@/features/applications/types";
import { OAuthProviderCard } from "@/components/OAuthProviderCard";

const oauthSchema = z
  .object({
    googleEnabled: z.boolean(),
    googleClientId: z.string().optional(),
    googleClientSecret: z.string().optional(),
    githubEnabled: z.boolean(),
    githubClientId: z.string().optional(),
    githubClientSecret: z.string().optional(),
  })
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

type OAuthFormValues = z.infer<typeof oauthSchema>;

interface OAuthSettingsProps {
  applicationId: string;
  application: Application;
}

export function OAuthSettings({ applicationId, application }: OAuthSettingsProps) {
  const form = useZodForm<OAuthFormValues>(oauthSchema, {
    defaultValues: {
      googleEnabled: application.oauthSettings?.googleEnabled || false,
      googleClientId: application.oauthSettings?.googleClientId || "",
      googleClientSecret: "",
      githubEnabled: application.oauthSettings?.githubEnabled || false,
      githubClientId: application.oauthSettings?.githubClientId || "",
      githubClientSecret: "",
    },
  });

  const mutation = useFormMutation<OAuthFormValues, any>({
    mutationFn: async (values) => {
      return await applicationsApi.updateOAuth(
        applicationId //, values
      );
    },
    setError: form.setError,
    successMessage: "OAuth settings updated successfully",
  });

  const googleEnabled = form.watch("googleEnabled");
  const githubEnabled = form.watch("githubEnabled");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => mutation.mutate(v))} className="space-y-6">
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
          <LoadingButton type="submit" isLoading={mutation.isPending}>
            Save OAuth Settings
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
