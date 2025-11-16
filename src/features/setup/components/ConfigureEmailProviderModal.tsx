import { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/shared/LoadingButton";
import FormError from "@/components/shared/FormError";
import ConfigDialog from "@/components/shared/Modal";
import FadeSlide from "@/components/shared/animations/FadeSlide";
import type { AllowedEmailProviders, TestEmailConfigRequest } from "@/features/setup/setup.types";
import { useConfigureEmailProviderForm } from "@/features/setup/hooks/useConfigureEmailProviderForm";
import { EMAIL_PROVIDERS } from "@/features/setup/setup.constants";
import EmailProviderSettingsForm from "@/components/EmailProviderSettingsForm";

interface ConfigureEmailProviderModalProps {
  provider: AllowedEmailProviders;
  initialConfig: TestEmailConfigRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnectionSuccess: (cfg: TestEmailConfigRequest) => void;
}

export default function ConfigureEmailProviderModal({
  provider,
  initialConfig,
  open,
  onOpenChange,
  onConnectionSuccess,
}: ConfigureEmailProviderModalProps) {
  const { form, handleSubmit, isLoading } = useConfigureEmailProviderForm(
    initialConfig || ({} as TestEmailConfigRequest),
    (cfg) => {
      onConnectionSuccess(cfg);
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
          </div>

          <div className="flex justify-end gap-3">
            <LoadingButton type="submit" isLoading={isLoading} loadingText="Testing configuration...">
              Test Connection
            </LoadingButton>
          </div>
        </form>
      </Form>
    </ConfigDialog>
  );
}
