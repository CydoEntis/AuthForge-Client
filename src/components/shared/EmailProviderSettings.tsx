import { FormInput } from "@/components/shared/FormInput";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SMTP_PRESET_OPTIONS, SMTP_PRESETS, SmtpPresetKey } from "@/features/setup/constants/smtpPresets";
import type { AllowedEmailProviders } from "@/features/setup/setup.types";
import { EMAIL_PROVIDERS } from "@/features/setup/setup.constants";

interface EmailProviderSettingsProps {
  form: any;
  isLoading?: boolean;
  provider: AllowedEmailProviders;
}

export default function EmailProviderSettings({ form, isLoading, provider }: EmailProviderSettingsProps) {
  const [selectedPreset, setSelectedPreset] = useState<SmtpPresetKey>(SmtpPresetKey.GMAIL);

  useEffect(() => {
    if (provider === EMAIL_PROVIDERS.SMTP) {
      const preset = SMTP_PRESETS[SmtpPresetKey.GMAIL];
      setSelectedPreset(SmtpPresetKey.GMAIL);
      form.setValue("smtpHost", preset.host);
      form.setValue("smtpPort", preset.port);
    }
  }, [provider, form]);

  const handlePresetChange = (presetKey: SmtpPresetKey) => {
    const preset = SMTP_PRESETS[presetKey];
    setSelectedPreset(presetKey);
    form.setValue("smtpHost", preset.host);
    form.setValue("smtpPort", preset.port);
  };

  return (
    <AnimatePresence mode="wait">
      {provider === EMAIL_PROVIDERS.SMTP && (
        <motion.div
          key="smtp-settings"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          layout
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4"
        >
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium">SMTP Preset</label>
            <Select value={selectedPreset} onValueChange={handlePresetChange}>
              <SelectTrigger className="rounded-xl">
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
          <FormInput form={form} name="smtpPort" label="Port" placeholder="587" isLoading={isLoading} />
          <FormInput
            form={form}
            name="smtpUsername"
            label="Username"
            placeholder="user@example.com"
            isLoading={isLoading}
          />
          <FormInput
            form={form}
            name="smtpPassword"
            label="Password"
            type="password"
            placeholder="••••••"
            isLoading={isLoading}
          />
          <FormInput
            form={form}
            name="fromEmail"
            label="From Email"
            placeholder="noreply@example.com"
            isLoading={isLoading}
          />
          <FormInput form={form} name="fromName" label="From Name" placeholder="AuthForge" isLoading={isLoading} />
          <FormInput
            form={form}
            name="testRecipient"
            label="Test Recipient Email"
            placeholder="test@example.com"
            isLoading={isLoading}
            className="col-span-2"
          />
        </motion.div>
      )}

      {provider === EMAIL_PROVIDERS.RESEND && (
        <motion.div
          key="resend-settings"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          layout
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4"
        >
          <FormInput
            form={form}
            name="resendApiKey"
            label="Resend API Key"
            placeholder="re_..."
            isLoading={isLoading}
            className="col-span-2"
          />
          <FormInput
            form={form}
            name="fromEmail"
            label="From Email"
            placeholder="noreply@myapp.com"
            isLoading={isLoading}
          />
          <FormInput form={form} name="fromName" label="From Name" placeholder="AuthForge" isLoading={isLoading} />
          <FormInput
            form={form}
            name="testRecipient"
            label="Test Recipient Email"
            placeholder="test@example.com"
            isLoading={isLoading}
            className="col-span-2"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
