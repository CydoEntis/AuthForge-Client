import { useState } from "react";
import { AlertMessage } from "@/components/AlertMessage";

import { Mail } from "lucide-react";
import ResendWhite from "@/assets/resend-icon-white.svg";
import ResendBlack from "@/assets/resend-icon-black.svg";
import { useTheme } from "@/features/theme/hooks/useTheme";
import OptionCard from "@/components/OptionCard";
import ConfigureEmailProviderModal from "../ConfigureEmailProviderModal";
import { EMAIL_PROVIDERS, type AllowedEmailProviders, type EmailProviderConfig } from "@/types/shared.types";

export function EmailProviderStep({
  emailConfig,
  onConfigChange,
}: {
  emailConfig: EmailProviderConfig | null;
  onConfigChange: (config: EmailProviderConfig | null) => void;
}) {
  const { theme } = useTheme();
  const resendImg = theme === "dark" ? ResendWhite : ResendBlack;

  const [selectedEmail, setSelectedEmail] = useState<AllowedEmailProviders>(EMAIL_PROVIDERS.SMTP);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const emailProviders = [
    { icon: <Mail size={52} />, name: EMAIL_PROVIDERS.SMTP, description: "Standard SMTP provider" },
    { img: resendImg, name: EMAIL_PROVIDERS.RESEND, description: "Transactional email service" },
  ];

  const handleEmailSelect = (provider: AllowedEmailProviders) => {
    setSelectedEmail(provider);
    onConfigChange(null);
  };

  return (
    <div className="flex flex-col">
      <div className="text-center py-8">
        <h3 className="text-4xl font-semibold">Set up your email provider</h3>
        <p className="text-lg text-muted-foreground mt-2">Choose an email provider to send notifications</p>
      </div>

      <div className="flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {emailProviders.map((email) => (
            <OptionCard
              key={email.name}
              title={email.name}
              icon={email.icon}
              imageSrc={email.img}
              selected={selectedEmail === email.name}
              onSelect={() => handleEmailSelect(email.name as AllowedEmailProviders)}
            />
          ))}
        </div>

        <div className="mt-6 min-h-[80px]">
          {!emailConfig ? (
            <AlertMessage
              message={`${selectedEmail} requires configuration before continuing`}
              type="warning"
              onConfigure={() => setEmailModalOpen(true)}
            />
          ) : (
            <AlertMessage
              message={`${selectedEmail} configured successfully`}
              type="success"
              onConfigure={() => setEmailModalOpen(true)}
            />
          )}
        </div>
      </div>

      {selectedEmail && (
        <ConfigureEmailProviderModal
          provider={selectedEmail}
          initialConfig={emailConfig}
          open={emailModalOpen}
          onOpenChange={setEmailModalOpen}
          onConnectionSuccess={(config: EmailProviderConfig) => {
            onConfigChange(config);
            setEmailModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
