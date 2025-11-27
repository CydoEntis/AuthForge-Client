import { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/shared/LoadingButton";
import FormError from "@/components/shared/FormError";
import ConfigDialog from "@/components/shared/Modal";
import FadeSlide from "@/components/shared/animations/FadeSlide";
import EmailProviderSettingsForm from "@/components/EmailProviderSettingsForm";
import { useZodForm } from "@/hooks/useZodForm";
import { CheckCircle2 } from "lucide-react";
import { testEmailConfigSchema } from "../email.schemas";
import { useTestEmailProviderMutation } from "../hooks/useTestEmailProviderMutation";
import { EMAIL_PROVIDERS, type AllowedEmailProviders } from "../email.constants";
import type { EmailProviderConfig, TestEmailConfigRequest } from "../email.types";

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

  const handleSubmit = form.handleSubmit(async (values) => {
    await testEmail.mutateAsync(values);
    const { testRecipient, ...emailProviderConfig } = values;
    onSuccess(emailProviderConfig as EmailProviderConfig);
  });

  const rootError = form.formState.errors.root?.message;

  return (
    <ConfigDialog title={`Configure ${provider}`} open={open} onOpenChange={onOpenChange} className="max-w-2xl">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <EmailProviderSettingsForm provider={provider} form={form} isLoading={testEmail.isPending} />

          <div className="min-h-[3rem]">
            <FadeSlide visible={!!rootError} direction="down" className="text-sm text-destructive">
              <FormError message={rootError!} />
            </FadeSlide>

            {testEmail.isSuccess && (
              <FadeSlide visible={true} direction="down">
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Connection test successful! Click "Continue" to proceed.</span>
                </div>
              </FadeSlide>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <LoadingButton type="submit" isLoading={testEmail.isPending} loadingText="Testing configuration...">
              {testEmail.isSuccess ? "Continue" : "Test Connection"}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </ConfigDialog>
  );
}
