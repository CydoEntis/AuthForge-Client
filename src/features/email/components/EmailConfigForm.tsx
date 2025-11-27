import { useState } from "react";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/shared/LoadingButton";
import FormError from "@/components/shared/FormError";
import FadeSlide from "@/components/shared/animations/FadeSlide";
import EmailProviderSettingsForm from "@/components/EmailProviderSettingsForm";
import OptionCard from "@/components/OptionCard";
import { useZodForm } from "@/hooks/useZodForm";

import { useTheme } from "@/features/theme/hooks/useTheme";
import { Mail } from "lucide-react";
import ResendWhite from "@/assets/resend-icon-white.svg";
import ResendBlack from "@/assets/resend-icon-black.svg";
import { testEmailConfigSchema } from "../email.schemas";
import { useTestEmailProviderMutation } from "../hooks/useTestEmailProviderMutation";
import { EMAIL_PROVIDERS, type AllowedEmailProviders } from "../email.constants";
import type { EmailProviderConfig, TestEmailConfigRequest } from "../email.types";

type EmailConfigFormProps = {
  initialProvider?: AllowedEmailProviders;
  initialConfig?: EmailProviderConfig;
  onSave: (config: EmailProviderConfig) => Promise<void>;
  isSaving?: boolean;
};

export function EmailConfigForm({
  initialProvider = EMAIL_PROVIDERS.SMTP,
  initialConfig,
  onSave,
  isSaving = false,
}: EmailConfigFormProps) {
  const { theme } = useTheme();
  const resendImg = theme === "dark" ? ResendWhite : ResendBlack;

  const [selectedProvider, setSelectedProvider] = useState<AllowedEmailProviders>(
    initialConfig?.emailProvider || initialProvider
  );

  const form = useZodForm<TestEmailConfigRequest>(testEmailConfigSchema, {
    defaultValues: initialConfig
      ? { ...initialConfig, testRecipient: "" }
      : {
          emailProvider: selectedProvider,
          fromEmail: selectedProvider === EMAIL_PROVIDERS.SMTP ? "noreply@example.com" : "noreply@resend.com",
          fromName: "AuthForge",
          smtpHost: "smtp.gmail.com",
          smtpPort: 587,
          smtpUsername: "",
          smtpPassword: "",
          useSsl: true,
          resendApiKey: "",
          testRecipient: "",
        },
  });

  const testEmail = useTestEmailProviderMutation(form.setError);

  const handleProviderChange = (provider: AllowedEmailProviders) => {
    setSelectedProvider(provider);
    form.setValue("emailProvider", provider);

    if (provider === EMAIL_PROVIDERS.SMTP) {
      form.setValue("fromEmail", "noreply@example.com");
      form.setValue("resendApiKey", "");
    } else {
      form.setValue("fromEmail", "noreply@resend.com");
      form.setValue("smtpHost", "");
      form.setValue("smtpPort", 587);
      form.setValue("smtpUsername", "");
      form.setValue("smtpPassword", "");
    }
  };

  const handleTest = form.handleSubmit(async (values) => {
    await testEmail.mutateAsync(values);
  });

  const handleSave = form.handleSubmit(async (values) => {
    const { testRecipient, ...emailProviderConfig } = values;
    await onSave(emailProviderConfig as EmailProviderConfig);
  });

  const emailProviders = [
    { icon: <Mail size={52} />, name: EMAIL_PROVIDERS.SMTP },
    { img: resendImg, name: EMAIL_PROVIDERS.RESEND },
  ];

  const rootError = form.formState.errors.root?.message;

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex gap-2">
          {emailProviders.map((provider) => (
            <OptionCard
              key={provider.name}
              orientation="horizontal"
              size="xs"
              title={provider.name}
              icon={provider.icon}
              imageSrc={provider.img}
              selected={selectedProvider === provider.name}
              onSelect={() => handleProviderChange(provider.name as AllowedEmailProviders)}
            />
          ))}
        </div>

        <EmailProviderSettingsForm
          provider={selectedProvider}
          form={form}
          isLoading={testEmail.isPending || isSaving}
        />

        <div className="min-h-[3rem]">
          <FadeSlide visible={!!rootError} direction="down" className="text-sm text-destructive">
            <FormError message={rootError!} />
          </FadeSlide>

          {testEmail.isSuccess && (
            <FadeSlide visible={true} direction="down">
              <div className="inset-shadow-success bg-linear-to-t from-green-400/10 to-green-400/40 text-green-500 border border-green-500/30 p-3 text-center rounded-lg">
                <p className="font-medium">Connection successful!</p>
                <p className="text-sm">You can now save your configuration.</p>
              </div>
            </FadeSlide>
          )}
        </div>

        <div className="flex gap-3">
          <LoadingButton
            type="button"
            onClick={handleTest}
            isLoading={testEmail.isPending}
            loadingText="Testing..."
            variant="outline"
            className="flex-1"
          >
            Test Connection
          </LoadingButton>

          <LoadingButton
            type="button"
            onClick={handleSave}
            isLoading={isSaving}
            loadingText="Saving..."
            disabled={!testEmail.isSuccess}
            className="flex-1"
          >
            Save Configuration
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
