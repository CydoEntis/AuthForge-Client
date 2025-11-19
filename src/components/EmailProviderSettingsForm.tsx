import { FormInput } from "@/components/shared/FormInput";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SMTP_PRESET_OPTIONS, SMTP_PRESETS, SmtpPresetKey } from "@/features/setup/constants/smtpPresets";
import { EMAIL_PROVIDERS } from "@/features/setup/setup.constants";
import type { AllowedEmailProviders } from "@/features/setup/setup.types";
import type { UseFormReturn } from "react-hook-form";
import { useState } from "react";

interface EmailProviderSettingsFormProps {
  provider: AllowedEmailProviders;
  form: UseFormReturn<any>;
  isLoading?: boolean;
}

export default function EmailProviderSettingsForm({
  provider,
  form,
  isLoading = false,
}: EmailProviderSettingsFormProps) {
  const [selectedPreset, setSelectedPreset] = useState<SmtpPresetKey>(SmtpPresetKey.GMAIL);

  const handlePresetChange = (presetKey: SmtpPresetKey) => {
    const preset = SMTP_PRESETS[presetKey];
    setSelectedPreset(presetKey);
    form.setValue("smtpHost", preset.host);
    form.setValue("smtpPort", preset.port);
  };

  return (
    <div className="space-y-4">
      <FormInput
        form={form}
        name="fromEmail"
        label="From Email"
        type="email"
        placeholder="noreply@example.com"
        isLoading={isLoading}
      />

      <FormInput
        form={form}
        name="fromName"
        label="From Name (Optional)"
        placeholder="My Company"
        isLoading={isLoading}
      />

      {/* SMTP-specific fields */}
      {provider === EMAIL_PROVIDERS.SMTP && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium">SMTP Preset</label>
            <Select value={selectedPreset} onValueChange={handlePresetChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                {SMTP_PRESET_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <FormInput form={form} name="smtpHost" label="SMTP Host" placeholder="smtp.gmail.com" isLoading={isLoading} />

          <FormInput
            form={form}
            name="smtpPort"
            label="SMTP Port"
            type="number"
            placeholder="587"
            isLoading={isLoading}
          />

          <FormInput
            form={form}
            name="smtpUsername"
            label="SMTP Username"
            placeholder="user@example.com"
            isLoading={isLoading}
          />

          <FormInput
            form={form}
            name="smtpPassword"
            label="SMTP Password"
            type="password"
            placeholder="••••••••"
            isLoading={isLoading}
            autoComplete="off"
          />

          <FormField
            control={form.control}
            name="useSsl"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Use SSL/TLS</FormLabel>
                  <div className="text-sm text-muted-foreground">Enable secure connection (recommended)</div>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                </FormControl>
              </FormItem>
            )}
          />
        </>
      )}

      {/* Resend-specific fields */}
      {provider === EMAIL_PROVIDERS.RESEND && (
        <FormInput
          form={form}
          name="resendApiKey"
          label="Resend API Key"
          type="password"
          placeholder="re_••••••••"
          isLoading={isLoading}
          autoComplete="off"
        />
      )}

      {/* Test recipient */}
      <FormInput
        form={form}
        name="testRecipient"
        label="Test Email Recipient"
        type="email"
        placeholder="test@example.com"
        description="Email address to send test email to"
        isLoading={isLoading}
      />
    </div>
  );
}
