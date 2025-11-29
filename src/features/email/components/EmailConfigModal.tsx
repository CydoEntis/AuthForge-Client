import { useEffect } from "react";
import ConfigDialog from "@/components/shared/Modal";
import { useZodForm } from "@/hooks/useZodForm";
import { testEmailConfigSchema } from "../email.schemas";
import { useTestEmailProviderMutation } from "../hooks/useTestEmailProviderMutation";
import type { AllowedEmailProviders, EmailProviderConfig, TestEmailConfigRequest } from "../email.types";
import EmailProviderForm from "./EmailProviderForm";
import { EMAIL_PROVIDERS } from "../email.constants";

type EmailConfigModalProps = {
  provider: AllowedEmailProviders;
  initialConfig: EmailProviderConfig | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (config: EmailProviderConfig) => void;
};

export function EmailConfigModal({ provider, initialConfig, open, onOpenChange, onSuccess }: EmailConfigModalProps) {
  const form = useZodForm<TestEmailConfigRequest>(testEmailConfigSchema, {
    defaultValues: {
      emailProvider: provider,
      fromEmail: provider === EMAIL_PROVIDERS.SMTP ? "noreply@example.com" : "noreply@resend.com",
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

  useEffect(() => {
    if (open) {
      if (initialConfig) {
        form.reset({
          ...initialConfig,
          testRecipient: "",
        });
      } else {
        form.reset({
          emailProvider: provider,
          fromEmail: provider === EMAIL_PROVIDERS.SMTP ? "noreply@example.com" : "noreply@resend.com",
          fromName: "AuthForge",
          smtpHost: "smtp.gmail.com",
          smtpPort: 587,
          smtpUsername: "",
          smtpPassword: "",
          useSsl: true,
          resendApiKey: "",
          testRecipient: "",
        });
      }
    }
  }, [open, provider, initialConfig, form]);

  const handleTest = form.handleSubmit(async (values) => {
    await testEmail.mutateAsync(values);
  });

  const handleSave = form.handleSubmit(async (values) => {
    const { testRecipient, ...emailProviderConfig } = values;
    onSuccess(emailProviderConfig as EmailProviderConfig);
  });

  return (
    <ConfigDialog title={`Configure ${provider}`} open={open} onOpenChange={onOpenChange} className="max-w-2xl">
      <EmailProviderForm
        provider={provider}
        form={form}
        isLoading={testEmail.isPending}
        onTest={handleTest}
        onSave={handleSave}
        testSuccessful={testEmail.isSuccess}
        testButtonText="Test Connection"
        saveButtonText="Continue"
        showSaveButton={true}
      />
    </ConfigDialog>
  );
}
