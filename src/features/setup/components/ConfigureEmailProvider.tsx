import { FormProvider } from "react-hook-form";
import { FormInput } from "@/components/shared/FormInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import FormError from "@/components/shared/FormError";
import { type EmailConfig, type AllowedEmailProviders, EMAIL_PROVIDERS } from "../types";
import { useConfigureEmailForm } from "../hooks/useConfigureEmailProviderForm";
import ConfigDialog from "../../../components/shared/Modal";
import FadeSlide from "@/components/shared/animations/FadeSlide";
import { useEffect } from "react";

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

  useEffect(() => {
    if (open) {
      form.reset(initialConfig);
    } else {
      form.reset();
    }
  }, [open, form, initialConfig]);

  const rootError = form.formState.errors.root?.message;

  return (
    <ConfigDialog title={`Configure ${provider}`} open={open} onOpenChange={onOpenChange}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          {provider === EMAIL_PROVIDERS.SMTP ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput form={form} name="host" label="Host" placeholder="smtp.mailtrap.io" />
              <FormInput form={form} name="port" label="Port" placeholder="587" />
              <FormInput form={form} name="username" label="Username" placeholder="user" />
              <FormInput form={form} name="password" label="Password" placeholder="••••••" type="password" />
              <FormInput form={form} name="from" label="From Email" placeholder="you@example.com" />
              <FormInput form={form} name="to" label="To Email" placeholder="recipient@example.com" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput form={form} name="apiKey" label="API Key" placeholder="re_xxx" />
              <FormInput form={form} name="from" label="From Email" placeholder="you@example.com" />
              <FormInput form={form} name="to" label="To Email" placeholder="recipient@example.com" />
            </div>
          )}

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
