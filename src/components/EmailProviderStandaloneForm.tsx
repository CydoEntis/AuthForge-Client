import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/shared/LoadingButton";
import FormError from "@/components/shared/FormError";
import FadeSlide from "@/components/shared/animations/FadeSlide";
import EmailProviderSettingsForm from "./EmailProviderSettingsForm";
import type { AllowedEmailProviders } from "@/features/setup/setup.types";
import type { UseFormReturn } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";

interface EmailProviderStandaloneFormProps {
  provider: AllowedEmailProviders;
  form: UseFormReturn<any>;
  isLoading: boolean;
  onTest: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSave?: (e?: React.BaseSyntheticEvent) => Promise<void>;
  testSuccessful: boolean;
  testButtonText?: string;
  saveButtonText?: string;
  showSaveButton?: boolean;
}

export default function EmailProviderStandaloneForm({
  provider,
  form,
  isLoading,
  onTest,
  onSave,
  testSuccessful,
  testButtonText = "Test Connection",
  saveButtonText = "Save",
  showSaveButton = true,
}: EmailProviderStandaloneFormProps) {
  const rootError = form.formState.errors.root?.message;

  return (
    <Form {...form}>
      <div>
        <EmailProviderSettingsForm provider={provider} form={form} isLoading={isLoading} />

        <div className="min-h-[3rem]">
          <FadeSlide visible={!!rootError} direction="down" className="text-sm text-destructive">
            <FormError message={rootError!} />
          </FadeSlide>

          {testSuccessful && (
            <FadeSlide visible={true} direction="down" className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>
                Connection test successful!
                {showSaveButton ? " You can now save your configuration." : ""}
              </span>
            </FadeSlide>
          )}
        </div>

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
      </div>
    </Form>
  );
}
