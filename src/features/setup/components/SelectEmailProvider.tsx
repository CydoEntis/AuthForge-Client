import { useState } from "react";
import SetupOptionCard from "../auth/components/SetupOptionCard";
import ConfigureEmailProvider from "./ConfigureEmailProvider";
import { EMAIL_PROVIDERS } from "../types";
import { Mail } from "lucide-react";
import ResendBlack from "@/assets/resend-icon-black.svg";
import ResendWhite from "@/assets/resend-icon-white.svg";
import { useTheme } from "@/features/theme/hooks/useTheme";
import type { AllowedEmailProviders, EmailConfig } from "../types";

type SelectEmailProviderProps = {
  selectedProvider: AllowedEmailProviders;
  setSelectedProvider: (provider: AllowedEmailProviders) => void;
  emailConfig: EmailConfig;
  setEmailConfig: (cfg: EmailConfig) => void;
  onEmailConfigured: () => void;
  onProviderChange: () => void;
};

export default function SelectEmailProvider({
  selectedProvider,
  setSelectedProvider,
  emailConfig,
  setEmailConfig,
  onEmailConfigured,
  onProviderChange,
}: SelectEmailProviderProps) {
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [providerToConfigure, setProviderToConfigure] = useState<AllowedEmailProviders | null>(null);
  const [smtpConfigured, setSmtpConfigured] = useState(false);
  const [resendConfigured, setResendConfigured] = useState(false);

  const { theme } = useTheme();
  const resendImg = theme === "dark" ? ResendWhite : ResendBlack;

  const handleSelect = (provider: AllowedEmailProviders) => {
    setSelectedProvider(provider);
    onProviderChange();
  };

  const openConfig = (provider: AllowedEmailProviders) => {
    setProviderToConfigure(provider);
    setConfigModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold mb-6">Select your email provider</h2>

      <div className="flex gap-6">
        <SetupOptionCard
          key={EMAIL_PROVIDERS.SMTP}
          title={EMAIL_PROVIDERS.SMTP}
          description="Use your existing SMTP credentials"
          icon={<Mail size={80} />}
          selected={selectedProvider === EMAIL_PROVIDERS.SMTP}
          onSelect={() => handleSelect(EMAIL_PROVIDERS.SMTP)}
          requiresConfig={true}
          isConfigured={smtpConfigured}
          onConfigure={() => openConfig(EMAIL_PROVIDERS.SMTP)}
        />

        <SetupOptionCard
          key={EMAIL_PROVIDERS.RESEND}
          title={EMAIL_PROVIDERS.RESEND}
          description="Use Resend's modern email API"
          imageSrc={resendImg}
          selected={selectedProvider === EMAIL_PROVIDERS.RESEND}
          onSelect={() => handleSelect(EMAIL_PROVIDERS.RESEND)}
          requiresConfig={true}
          isConfigured={resendConfigured}
          onConfigure={() => openConfig(EMAIL_PROVIDERS.RESEND)}
        />
      </div>

      {providerToConfigure && (
        <ConfigureEmailProvider
          provider={providerToConfigure}
          initialConfig={emailConfig}
          open={configModalOpen}
          onOpenChange={setConfigModalOpen}
          onConnectionSuccess={(cfg) => {
            setEmailConfig(cfg);

            if (providerToConfigure === EMAIL_PROVIDERS.SMTP) {
              setSmtpConfigured(true);
            } else if (providerToConfigure === EMAIL_PROVIDERS.RESEND) {
              setResendConfigured(true);
            }

            onEmailConfigured();
            setConfigModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
