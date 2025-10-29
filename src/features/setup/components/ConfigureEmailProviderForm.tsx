import { FormProvider } from "react-hook-form";
import { FormInput } from "@/components/shared/FormInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import FormError from "@/components/shared/FormError";
import type { EmailConfig, AllowedEmailProviders } from "../types";
import { useConfigureEmailForm } from "../hooks/useConfigureEmailProviderForm";

export default function ConfigureEmailProviderForm({
  provider,
  initialConfig,
  onSave,
}: {
  provider: AllowedEmailProviders;
  initialConfig: EmailConfig;
  onSave: (cfg: EmailConfig) => void;
}) {
  const { form, handleSubmit, isLoading } = useConfigureEmailForm(provider, initialConfig, onSave);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <h2 className="text-xl font-semibold">Configure {provider}</h2>

        {provider === "SMTP" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput form={form} name="host" label="Host" placeholder="smtp.mailtrap.io" />
            <FormInput form={form} name="port" label="Port" placeholder="587" />
            <FormInput form={form} name="username" label="Username" placeholder="user" />
            <FormInput form={form} name="password" label="Password" placeholder="••••••" type="password" />
          </div>
        ) : (
          <FormInput form={form} name="apiKey" label="API Key" placeholder="re_xxx" />
        )}

        {form.formState.errors.root && <FormError message={form.formState.errors.root.message!} />}

        <div className="flex justify-end gap-3">
          <LoadingButton type="submit" isLoading={isLoading} loadingText="Testing configuration...">
            Test & Continue
          </LoadingButton>
        </div>
      </form>
    </FormProvider>
  );
}
