import { FormProvider } from "react-hook-form";
import { FormInput } from "@/components/shared/FormInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import FormError from "@/components/shared/FormError";
import { type EmailConfig, type AllowedEmailProviders, EMAIL_PROVIDERS } from "../types";
import { useConfigureEmailForm } from "../hooks/useConfigureEmailProviderForm";
import ConfigDialog from "../../../components/shared/Modal";
import FadeSlide from "@/components/shared/animations/FadeSlide";
import { useEffect, useState } from "react";
import { SMTP_PRESETS, SMTP_PRESET_OPTIONS } from "../constants/smtpPresets";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [selectedPreset, setSelectedPreset] = useState<string>("GMAIL");

  useEffect(() => {
    if (open) {
      setSelectedPreset("GMAIL");
      const gmailPreset = SMTP_PRESETS.GMAIL;

      form.reset({
        host: gmailPreset.host,
        port: gmailPreset.port,
        username: "",
        password: "",
        from: "",
        to: "",
        apiKey: "",
      });
    } else {
      form.reset();
    }
  }, [open, form]);

  const handlePresetChange = (presetKey: string) => {
    setSelectedPreset(presetKey);
    const preset = SMTP_PRESETS[presetKey];

    if (preset) {
      if (presetKey === "CUSTOM") {
        form.setValue("host", "");
        form.setValue("port", "587");
        form.setValue("username", "");
        form.setValue("password", "");
        form.setValue("from", "");
        form.setValue("to", "");
      } else {
        form.setValue("host", preset.host);
        form.setValue("port", preset.port);
      }
    }
  };

  const rootError = form.formState.errors.root?.message;
  const currentPreset = SMTP_PRESETS[selectedPreset];

  return (
    <ConfigDialog title={`Configure ${provider}`} open={open} onOpenChange={onOpenChange} className="max-w-2xl">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          {provider === EMAIL_PROVIDERS.SMTP ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Provider</label>
                <Select value={selectedPreset} onValueChange={handlePresetChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a provider preset" />
                  </SelectTrigger>
                  <SelectContent>
                    {SMTP_PRESET_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {currentPreset && currentPreset.note && (
                <Alert className="bg-yellow-500/10 border-yellow-500/30 text-yellow-500">
                  <Info className="h-4 w-4 text-yellow-500" />
                  <AlertDescription className="text-sm text-yellow-600 dark:text-yellow-500">
                    {currentPreset.note}
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  form={form}
                  name="host"
                  label="SMTP Host"
                  placeholder="smtp.example.com"
                  isLoading={isLoading}
                />
                <FormInput form={form} name="port" label="Port" placeholder="587" isLoading={isLoading} />
                <FormInput
                  form={form}
                  name="username"
                  label="Username / Email"
                  placeholder="user@example.com"
                  isLoading={isLoading}
                />
                <FormInput
                  form={form}
                  name="password"
                  label="Password"
                  placeholder="••••••"
                  type="password"
                  isLoading={isLoading}
                />
                <FormInput
                  form={form}
                  name="from"
                  label="From Email"
                  placeholder="noreply@example.com"
                  description="Must match username for most providers"
                  isLoading={isLoading}
                />
                <FormInput
                  form={form}
                  name="to"
                  label="Test Recipient"
                  placeholder="test@example.com"
                  description="Where to send the test email"
                  isLoading={isLoading}
                />
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <FormInput form={form} name="apiKey" label="API Key" placeholder="re_xxx" isLoading={isLoading} />
              <FormInput
                form={form}
                name="from"
                label="From Email"
                placeholder="noreply@yourdomain.com"
                description="Must be a verified domain in Resend"
                isLoading={isLoading}
              />
              <FormInput
                form={form}
                name="to"
                label="Test Recipient"
                placeholder="test@example.com"
                description="Where to send the test email"
                isLoading={isLoading}
              />
            </div>
          )}

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
