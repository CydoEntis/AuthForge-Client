// routes/(private)/(admin)/settings.tsx
import OptionCard from "@/components/OptionCard";
import { FormInput } from "@/components/shared/FormInput";
import { Form } from "@/components/ui/form";
import { AdminChangePassword } from "@/features/admin/components/AdminChangePassword";
import { useAdminLoginForm } from "@/features/admin/hooks/useAdminLoginForm";
import { EMAIL_PROVIDERS } from "@/features/setup/setup.constants";
import type { AllowedEmailProviders } from "@/features/setup/setup.types";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState } from "react";
import ResendWhite from "@/assets/resend-icon-white.svg";
import ResendBlack from "@/assets/resend-icon-black.svg";
import EmailProviderStandaloneForm from "@/components/EmailProviderStandaloneForm";
import { useConfigureEmailProviderForm } from "@/features/setup/hooks/useConfigureEmailProviderForm";
import { LoadingButton } from "@/components/shared/LoadingButton";

export const Route = createFileRoute("/(private)/(admin)/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { form, handleSubmit } = useAdminLoginForm();
  const { theme } = useTheme();
  const resendImg = theme === "dark" ? ResendWhite : ResendBlack;

  const [selectedEmail, setSelectedEmail] = useState<AllowedEmailProviders>(EMAIL_PROVIDERS.SMTP);

  // Setup forms for each provider
  const {
    form: smtpForm,
    handleSubmit: handleSmtpSubmit,
    isLoading: smtpLoading,
  } = useConfigureEmailProviderForm(
    {
      emailProvider: EMAIL_PROVIDERS.SMTP,
      fromEmail: "noreply@example.com",
      fromName: "",
      smtpHost: "smtp.gmail.com",
      smtpPort: 587,
      smtpUsername: "",
      smtpPassword: "",
      useSsl: true,
      testRecipient: "",
    },
    (cfg) => console.log("SMTP saved", cfg)
  );

  const {
    form: resendForm,
    handleSubmit: handleResendSubmit,
    isLoading: resendLoading,
  } = useConfigureEmailProviderForm(
    {
      emailProvider: EMAIL_PROVIDERS.RESEND,
      fromEmail: "noreply@resend.com",
      fromName: "",
      resendApiKey: "",
      testRecipient: "",
    },
    (cfg) => console.log("Resend saved", cfg)
  );

  const emailProviders = [
    { icon: <Mail size={52} />, name: EMAIL_PROVIDERS.SMTP, description: "Standard SMTP provider" },
    { img: resendImg, name: EMAIL_PROVIDERS.RESEND, description: "Transactional email service" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-2 py-4 w-full border-b-2 border-black shadow-bottom-sm">
        <h1 className="text-4xl font-semibold py-1.25">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      {/* Account */}
      <div className="flex gap-2 py-4 mt-8 w-full border-b-2 border-black shadow-bottom-sm">
        <div className="w-1/4">
          <h3 className="text-xl font-semibold pb-1.5">Account</h3>
          <p className="text-sm text-muted-foreground">Modify account details</p>
        </div>
        <div className="w-1/4">
          <Form {...form}>
            <form onSubmit={handleSubmit} className="flex gap-2 items-end">
              <FormInput form={form} name="email" label="Email" placeholder="admin@authforge.com" className="flex-1" />
              <LoadingButton type="submit" isLoading={false} loadingText="Testing configuration..." className="mb-2">
                Update
              </LoadingButton>
            </form>
          </Form>
        </div>
      </div>

      {/* Domain */}
      <div className="flex gap-2 py-4 mt-8 w-full border-b-2 border-black shadow-bottom-sm">
        <div className="w-1/4">
          <h3 className="text-xl font-semibold pb-1.5">Domain</h3>
          <p className="text-sm text-muted-foreground">The domain where Auth Forge is hosted.</p>
        </div>
        <div className="w-1/4">
          <Form {...form}>
            <form onSubmit={handleSubmit} className="flex gap-2 items-end">
              <FormInput
                form={form}
                name="domain"
                label="Domain"
                placeholder="admin@authforge.com"
                className="flex-1"
              />
              <LoadingButton type="submit" isLoading={false} loadingText="Testing configuration..." className="mb-2">
                Update
              </LoadingButton>
            </form>
          </Form>
        </div>
      </div>

      {/* Security */}
      <div className="flex gap-2 py-4 mt-8 w-full border-b-2 border-black shadow-bottom-sm">
        <div className="w-1/4">
          <h3 className="text-xl font-semibold pb-1.5">Security</h3>
          <p className="text-sm text-muted-foreground">Manage your password</p>
        </div>
        <div className="w-1/4">
          <AdminChangePassword />
        </div>
      </div>

      {/* Email Providers */}
      <div className="flex gap-2 py-4 mt-8 w-full border-b-2 border-black shadow-bottom-sm">
        <div className="w-1/4">
          <h3 className="text-xl font-semibold pb-1.5">Email Provider</h3>
          <p className="text-sm text-muted-foreground">Configure your email service</p>
        </div>
        <div className="w-1/4">
          <div className="flex gap-2">
            {emailProviders.map((email) => (
              <OptionCard
                orientation="horizontal"
                size="xs"
                key={email.name}
                title={email.name}
                icon={email.icon}
                imageSrc={email.img}
                selected={selectedEmail === email.name}
                onSelect={() => setSelectedEmail(email.name as AllowedEmailProviders)}
              />
            ))}
          </div>

          <div className="mt-4">
            {selectedEmail === EMAIL_PROVIDERS.SMTP && (
              <EmailProviderStandaloneForm
                provider={EMAIL_PROVIDERS.SMTP}
                form={smtpForm}
                isLoading={smtpLoading}
                onSubmit={handleSmtpSubmit}
              />
            )}

            {selectedEmail === EMAIL_PROVIDERS.RESEND && (
              <EmailProviderStandaloneForm
                provider={EMAIL_PROVIDERS.RESEND}
                form={resendForm}
                isLoading={resendLoading}
                onSubmit={handleResendSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
