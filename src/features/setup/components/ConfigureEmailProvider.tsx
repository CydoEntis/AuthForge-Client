import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { LoadingButton } from "@/components/shared/LoadingButton";
import FormError from "@/components/shared/FormError";
import ConfigDialog from "@/components/shared/Modal";
import FadeSlide from "@/components/shared/animations/FadeSlide";
import EmailProviderSettings from "@/components/shared/EmailProviderSettings";
import type { AllowedEmailProviders, EmailConfig } from "../setup.types";
import { useConfigureEmailProviderForm } from "../hooks/useConfigureEmailProviderForm";
import { EMAIL_PROVIDERS } from "../setup.constants";

export default function ConfigureEmailProvider({
  provider,
  initialConfig,
  open,
  onOpenChange,
  onConnectionSuccess,
}: {
  provider: AllowedEmailProviders;
  initialConfig: EmailConfig;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnectionSuccess: (cfg: EmailConfig) => void;
}) {
  const { form, handleSubmit, isLoading } = useConfigureEmailProviderForm(provider, initialConfig, (cfg) => {
    onConnectionSuccess(cfg);
    onOpenChange(false);
  });

  useEffect(() => {
    if (open) {
      if (initialConfig) {
        form.reset(initialConfig);
      } else {
        form.reset({
          fromEmail: provider === EMAIL_PROVIDERS.SMTP ? "noreply@example.com" : "noreply@resend.com",
          smtpHost: "smtp.example.com",
          smtpPort: 587,
          smtpUsername: "",
          smtpPassword: "",
          useSsl: true,
          resendApiKey: "",
        });
      }
    }
  }, [open, provider, initialConfig, form]);

  const rootError = form.formState.errors.root?.message;

  return (
    <ConfigDialog title={`Configure ${provider}`} open={open} onOpenChange={onOpenChange} className="max-w-2xl">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <EmailProviderSettings provider={provider} form={form} isLoading={isLoading} />

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
      </FormProvider>
    </ConfigDialog>
  );
}
