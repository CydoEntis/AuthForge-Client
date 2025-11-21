import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/shared/LoadingButton";
import FormError from "@/components/shared/FormError";
import FadeSlide from "@/components/shared/animations/FadeSlide";
import EmailProviderSettingsForm from "./EmailProviderSettingsForm";
import type { UseFormReturn } from "react-hook-form";
import type { AllowedEmailProviders } from "@/types/shared.types";

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
      <form>
        <EmailProviderSettingsForm provider={provider} form={form} isLoading={isLoading} />

        <div className="min-h-[3rem]">
          <FadeSlide visible={!!rootError} direction="down" className="text-sm text-destructive">
            <FormError message={rootError!} />
          </FadeSlide>

          {testSuccessful && (
            <FadeSlide visible={true} direction="down" className="flex items-center gap-2 text-sm text-green-600">
              <div className="inset-shadow-success bg-linear-to-t from-green-400/10 to-green-400/40 text-green-500 border border-green-500/30 p-2 text-center w-full rounded-lg mb-3">
                <div className="flex flex-col">
                  <p>Connection successful</p>
                  <p>{showSaveButton ? " You can now save your configuration." : ""}</p>
                </div>
              </div>
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
      </form>
    </Form>
  );
}
