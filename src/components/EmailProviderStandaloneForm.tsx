import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/shared/LoadingButton";
import FormError from "@/components/shared/FormError";
import FadeSlide from "@/components/shared/animations/FadeSlide";
import EmailProviderSettingsForm from "./EmailProviderSettingsForm";
import type { AllowedEmailProviders } from "@/features/setup/setup.types";
import type { UseFormReturn } from "react-hook-form";

interface EmailProviderStandaloneFormProps {
  provider: AllowedEmailProviders;
  form: UseFormReturn<any>;
  isLoading: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export default function EmailProviderStandaloneForm({
  provider,
  form,
  isLoading,
  onSubmit,
}: EmailProviderStandaloneFormProps) {
  const rootError = form.formState.errors.root?.message;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <EmailProviderSettingsForm provider={provider} form={form} isLoading={isLoading} />

        <FadeSlide visible={!!rootError} direction="down" className="text-sm text-destructive">
          <FormError message={rootError!} />
        </FadeSlide>

        <LoadingButton type="submit" isLoading={isLoading} loadingText="Testing configuration..." className="w-full">
          Test Connection
        </LoadingButton>
      </form>
    </Form>
  );
}
