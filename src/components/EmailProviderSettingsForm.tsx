// components/EmailProviderSettingsForm.tsx
import { FormInput } from "@/components/shared/FormInput";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { EMAIL_PROVIDERS } from "@/features/setup/setup.constants";
import type { AllowedEmailProviders } from "@/features/setup/setup.types";
import type { UseFormReturn } from "react-hook-form";

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
  return (
    <div className="space-y-4">
      {/* Common Fields */}
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
        />
      )}

      {/* Test recipient (for testing) */}
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
