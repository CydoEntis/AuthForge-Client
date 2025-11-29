import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/shared/LoadingButton";
import FormError from "@/components/shared/FormError";
import FadeSlide from "@/components/shared/animations/FadeSlide";
import EmailProviderSettingsForm from "@/components/EmailProviderSettingsForm";
import { CheckCircle2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { AllowedEmailProviders } from "../email.types";

interface EmailProviderFormProps {
  provider: AllowedEmailProviders;
  form: UseFormReturn<any>;
  isLoading: boolean;
  onTest: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSave?: (e?: React.BaseSyntheticEvent) => Promise<void>;
  testSuccessful: boolean;
  testButtonText?: string;
  saveButtonText?: string;
  showSaveButton?: boolean;
  successMessage?: string;
}

export default function EmailProviderForm({
  provider,
  form,
  isLoading,
  onTest,
  onSave,
  testSuccessful,
  testButtonText = "Test Connection",
  saveButtonText = "Save Configuration",
  showSaveButton = true,
  successMessage,
}: EmailProviderFormProps) {
  const rootError = form.formState.errors.root?.message;

  const defaultSuccessMessage = showSaveButton
    ? "Connection successful! You can now save your configuration."
    : "Connection test successful! Click 'Continue' to proceed.";

  return (
    <Form {...form}>
      <form className="space-y-6">
        <EmailProviderSettingsForm provider={provider} form={form} isLoading={isLoading} />

        <FadeSlide visible={!!rootError} direction="down" className="text-sm text-destructive">
          <FormError message={rootError!} />
        </FadeSlide>

        {testSuccessful && (
          <FadeSlide visible={true} direction="down">
            <div className="inset-shadow-success bg-linear-to-t from-green-400/10 to-green-400/40 text-green-500 border border-green-500/30 p-3 text-center rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <p className="font-medium">{successMessage || defaultSuccessMessage}</p>
              </div>
            </div>
          </FadeSlide>
        )}

        <div className={showSaveButton ? "flex gap-3" : ""}>
          <LoadingButton
            type="button"
            onClick={onTest}
            isLoading={isLoading}
            loadingText="Testing..."
            variant={showSaveButton ? "outline" : "default"}
            className={showSaveButton ? "flex-1" : "w-full"}
          >
            {testButtonText}
          </LoadingButton>

          {showSaveButton && onSave && (
            <LoadingButton
              type="button"
              onClick={onSave}
              isLoading={isLoading}
              loadingText="Saving..."
              disabled={!testSuccessful}
              className="flex-1"
            >
              {saveButtonText}
            </LoadingButton>
          )}
        </div>
      </form>
    </Form>
  );
}
