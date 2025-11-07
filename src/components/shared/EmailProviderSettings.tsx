import { FormInput } from "@/components/shared/FormInput";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { SMTP_PRESET_OPTIONS, SMTP_PRESETS, SmtpPresetKey } from "@/features/setup/constants/smtpPresets";
import { EMAIL_PROVIDERS, type AllowedEmailProviders } from "@/features/setup/types";

interface EmailProviderSettingsProps {
  form: any;
  isLoading?: boolean;
  provider: AllowedEmailProviders;
}

export default function EmailProviderSettings({ form, isLoading, provider }: EmailProviderSettingsProps) {
  const [selectedPreset, setSelectedPreset] = useState<SmtpPresetKey>(SmtpPresetKey.GMAIL);

  useEffect(() => {
    setSelectedPreset(SmtpPresetKey.GMAIL);
  }, [provider]);

  const handlePresetChange = (presetKey: SmtpPresetKey) => {
    setSelectedPreset(presetKey);
    const preset = SMTP_PRESETS[presetKey];
    form.setValue("emailConfig.host", preset.host);
    form.setValue("emailConfig.port", preset.port);
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

          {SMTP_PRESETS[selectedPreset]?.note && (
            <Alert className="bg-yellow-500/10 border-yellow-500/30 text-yellow-600 col-span-2">
              <Info className="h-4 w-4" />
              <AlertDescription>{SMTP_PRESETS[selectedPreset].note}</AlertDescription>
            </Alert>
          )}

          <FormInput
            form={form}
            name="emailConfig.host"
            label="SMTP Host"
            placeholder="smtp.gmail.com"
            isLoading={isLoading}
          />
          <FormInput form={form} name="emailConfig.port" label="Port" placeholder="587" isLoading={isLoading} />
          <FormInput
            form={form}
            name="emailConfig.username"
            label="Username"
            placeholder="user@example.com"
            isLoading={isLoading}
          />
          <FormInput
            form={form}
            name="emailConfig.password"
            label="Password"
            type="password"
            placeholder="••••••"
            isLoading={isLoading}
          />
          <FormInput
            form={form}
            name="emailConfig.from"
            label="From Email"
            placeholder="noreply@example.com"
            isLoading={isLoading}
          />
          <FormInput
            form={form}
            name="emailConfig.fromName"
            label="From Name"
            placeholder="My App"
            isLoading={isLoading}
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
            name="emailConfig.apiKey"
            label="Resend API Key"
            placeholder="re_..."
            isLoading={isLoading}
          />
          <FormInput
            form={form}
            name="emailConfig.from"
            label="From Email"
            placeholder="noreply@myapp.com"
            isLoading={isLoading}
          />
          <FormInput
            form={form}
            name="emailConfig.fromName"
            label="From Name"
            placeholder="My App"
            isLoading={isLoading}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
