import { useEffect } from "react";
import { useZodForm } from "@/hooks/useZodForm";
import { testEmailConfigSchema } from "../email.schemas";
import { useTestEmailProviderMutation } from "../hooks/useTestEmailProviderMutation";
import type { EmailProviderConfig, TestEmailConfigRequest, AllowedEmailProviders } from "../email.types";
import EmailProviderForm from "./EmailProviderForm";
import EmailProviderSelector from "./EmailProviderSelector";
import { EMAIL_PROVIDERS } from "../email.constants";

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
  const form = useZodForm<TestEmailConfigRequest>(testEmailConfigSchema, {
    defaultValues: initialConfig
      ? { ...initialConfig, testRecipient: "" }
      : {
          emailProvider: initialProvider,
          fromEmail: initialProvider === EMAIL_PROVIDERS.SMTP ? "noreply@example.com" : "noreply@resend.com",
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
  const selectedProvider = form.watch("emailProvider");

  useEffect(() => {
    if (selectedProvider === EMAIL_PROVIDERS.SMTP) {
      form.setValue("resendApiKey", "");
    } else if (selectedProvider === EMAIL_PROVIDERS.RESEND) {
      form.setValue("smtpHost", "");
      form.setValue("smtpPort", 587);
      form.setValue("smtpUsername", "");
      form.setValue("smtpPassword", "");
    }
    // keep `useSsl` untouched — it's part of the schema defaults
  }, [selectedProvider, form]);

  const handleTest = form.handleSubmit(async (values) => {
    await testEmail.mutateAsync(values);
  });

  const handleSave = form.handleSubmit(async (values) => {
    const { testRecipient, ...v } = values;

    // IMPORTANT: `useSsl` exists on the schema with a default, so include it in both branches.
    const config: EmailProviderConfig =
      v.emailProvider === EMAIL_PROVIDERS.SMTP
        ? {
            emailProvider: EMAIL_PROVIDERS.SMTP,
            fromEmail: v.fromEmail,
            fromName: v.fromName,
            smtpHost: v.smtpHost!,
            smtpPort: v.smtpPort!,
            smtpUsername: v.smtpUsername!,
            smtpPassword: v.smtpPassword!,
            useSsl: v.useSsl ?? true,
          }
        : {
            emailProvider: EMAIL_PROVIDERS.RESEND,
            fromEmail: v.fromEmail,
            fromName: v.fromName,
            resendApiKey: v.resendApiKey!,
            // include useSsl because your schema requires it (has a default)
            useSsl: v.useSsl ?? true,
          };

    await onSave(config);
  });

  return (
    <div className="space-y-6">
      <EmailProviderSelector form={form} />

      <EmailProviderForm
        provider={selectedProvider}
        form={form}
        isLoading={testEmail.isPending || isSaving}
        onTest={handleTest}
        onSave={handleSave}
        testSuccessful={testEmail.isSuccess}
        testButtonText="Test Connection"
        saveButtonText="Save Configuration"
        showSaveButton={true}
      />
    </div>
  );
}

export default EmailConfigForm;
