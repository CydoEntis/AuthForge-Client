import { useEffect } from "react";
import { useZodForm } from "@/hooks/useZodForm";
import { testEmailConfigSchema } from "../email.schemas";
import { useTestEmailProviderMutation } from "../hooks/useTestEmailProviderMutation";
import { EMAIL_PROVIDERS, type AllowedEmailProviders } from "../email.constants";
import type { EmailProviderConfig, TestEmailConfigRequest } from "../email.types";
import EmailProviderForm from "./EmailProviderForm";
import EmailProviderSelector from "./EmailProviderSelector";

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

  const selectedProvider = form.watch("emailProvider") || initialProvider;

  useEffect(() => {
    const currentProvider = form.getValues("emailProvider");

    if (currentProvider === EMAIL_PROVIDERS.SMTP) {
      form.setValue("resendApiKey", "");
    } else if (currentProvider === EMAIL_PROVIDERS.RESEND) {
      form.setValue("smtpHost", "");
      form.setValue("smtpPort", 587);
      form.setValue("smtpUsername", "");
      form.setValue("smtpPassword", "");
    }
  }, [selectedProvider, form]);

  const handleTest = form.handleSubmit(async (values) => {
    await testEmail.mutateAsync(values);
  });

  const handleSave = form.handleSubmit(async (values) => {
    const { testRecipient, ...emailProviderConfig } = values;
    await onSave(emailProviderConfig as EmailProviderConfig);
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
