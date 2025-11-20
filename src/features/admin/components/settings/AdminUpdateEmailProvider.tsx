import { useState, useEffect } from "react";
import OptionCard from "@/components/OptionCard";
import EmailProviderStandaloneForm from "@/components/EmailProviderStandaloneForm";
import { EMAIL_PROVIDERS } from "@/types/email.types";
import type { AllowedEmailProviders, EmailProviderConfig } from "@/types/email.types";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { Mail } from "lucide-react";
import ResendWhite from "@/assets/resend-icon-white.svg";
import ResendBlack from "@/assets/resend-icon-black.svg";
import { useAdminEmailProviderForm } from "../../hooks/useAdminEmailProviderForm";

export function AdminUpdateEmailProvider({ emailProviderSettings }: { emailProviderSettings?: EmailProviderConfig }) {
  const { theme } = useTheme();
  const resendImg = theme === "dark" ? ResendWhite : ResendBlack;
  const [selectedEmail, setSelectedEmail] = useState<AllowedEmailProviders>(
    emailProviderSettings?.emailProvider || EMAIL_PROVIDERS.SMTP
  );

  useEffect(() => {
    if (emailProviderSettings?.emailProvider) {
      setSelectedEmail(emailProviderSettings.emailProvider);
    }
  }, [emailProviderSettings]);

  const {
    smtpForm,
    resendForm,
    handleTestConnection,
    handleSaveConfig,
    isTestingConnection,
    isSavingConfig,
    testSuccessful,
  } = useAdminEmailProviderForm(selectedEmail, emailProviderSettings);

  const emailProviders = [
    { icon: <Mail size={52} />, name: EMAIL_PROVIDERS.SMTP, description: "Standard SMTP provider" },
    { img: resendImg, name: EMAIL_PROVIDERS.RESEND, description: "Transactional email service" },
  ];

  return (
    <>
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
            isLoading={isTestingConnection || isSavingConfig}
            onTest={handleTestConnection}
            onSave={handleSaveConfig}
            testSuccessful={testSuccessful}
            showSaveButton={true}
          />
        )}

        {selectedEmail === EMAIL_PROVIDERS.RESEND && (
          <EmailProviderStandaloneForm
            provider={EMAIL_PROVIDERS.RESEND}
            form={resendForm}
            isLoading={isTestingConnection || isSavingConfig}
            onTest={handleTestConnection}
            onSave={handleSaveConfig}
            testSuccessful={testSuccessful}
            showSaveButton={true}
          />
        )}
      </div>
    </>
  );
}
