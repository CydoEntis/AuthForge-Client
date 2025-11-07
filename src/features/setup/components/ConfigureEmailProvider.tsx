import { FormProvider } from "react-hook-form";
import { LoadingButton } from "@/components/shared/LoadingButton";
import FormError from "@/components/shared/FormError";
import { type EmailConfig, type AllowedEmailProviders } from "../types";
import { useConfigureEmailForm } from "../hooks/useConfigureEmailProviderForm";
import ConfigDialog from "../../../components/shared/Modal";
import FadeSlide from "@/components/shared/animations/FadeSlide";

import EmailProviderSettings from "@/components/shared/EmailProviderSettings";

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
  const { form, handleSubmit, isLoading } = useConfigureEmailForm(provider, initialConfig, onConnectionSuccess);

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
            <LoadingButton
              type="submit"
              isLoading={isLoading}
              loadingText="Testing configuration..."
              className="border border-primary/20 bg-primary/10 hover:bg-primary/30 text-primary"
            >
              Test Connection
            </LoadingButton>
          </div>
        </form>
      </FormProvider>
    </ConfigDialog>
  );
}
