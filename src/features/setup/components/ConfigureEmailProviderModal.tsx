import { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/shared/LoadingButton";
import FormError from "@/components/shared/FormError";
import ConfigDialog from "@/components/shared/Modal";
import FadeSlide from "@/components/shared/animations/FadeSlide";
import EmailProviderSettingsForm from "@/components/EmailProviderSettingsForm";
import type { AllowedEmailProviders, EmailProviderConfig, TestEmailConfigRequest } from "@/features/setup/setup.types";
import { useConfigureEmailProviderForm } from "@/features/setup/hooks/useConfigureEmailProviderForm";
import { EMAIL_PROVIDERS } from "@/features/setup/setup.constants";
import { CheckCircle2 } from "lucide-react";

type ConfigureEmailProviderModalProps = {
  provider: AllowedEmailProviders;
  initialConfig: EmailProviderConfig | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnectionSuccess: (cfg: EmailProviderConfig) => void;
};

export default function ConfigureEmailProviderModal({
  provider,
  initialConfig,
  open,
  onOpenChange,
  onConnectionSuccess,
}: ConfigureEmailProviderModalProps) {
  const { form, handleSubmit, isLoading, testSuccessful } = useConfigureEmailProviderForm(
    initialConfig || ({} as TestEmailConfigRequest),
    (cfg) => {
      const { testRecipient, ...emailProviderConfig } = cfg;
      onConnectionSuccess(emailProviderConfig as EmailProviderConfig);
      onOpenChange(false);
    }
  );

  useEffect(() => {
    if (open) {
      if (initialConfig) {
        form.reset(initialConfig);
      } else {
        form.reset({
          emailProvider: provider,
          fromEmail: provider === EMAIL_PROVIDERS.SMTP ? "noreply@example.com" : "noreply@resend.com",
          fromName: "",
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

  const rootError = form.formState.errors.root?.message;

  return (
    <ConfigDialog title={`Configure ${provider}`} open={open} onOpenChange={onOpenChange} className="max-w-2xl">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <EmailProviderSettingsForm provider={provider} form={form} isLoading={isLoading} />

          <div className="min-h-[3rem]">
            <FadeSlide visible={!!rootError} direction="down" className="text-sm text-destructive">
              <FormError message={rootError!} />
            </FadeSlide>

            {testSuccessful && (
              <FadeSlide visible={true} direction="down" className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span>Connection test successful! Click "Continue" to proceed.</span>
              </FadeSlide>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <LoadingButton type="submit" isLoading={isLoading} loadingText="Testing configuration...">
              {testSuccessful ? "Continue" : "Test Connection"}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </ConfigDialog>
  );
}
