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
};

export default function SelectEmailProvider({
  selectedProvider,
  setSelectedProvider,
  emailConfig,
  setEmailConfig,
}: SelectEmailProviderProps) {
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [providerToConfigure, setProviderToConfigure] = useState<AllowedEmailProviders | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  const { theme } = useTheme();
  const resendImg = theme === "dark" ? ResendWhite : ResendBlack;

  const handleSelect = (provider: AllowedEmailProviders) => {
    setSelectedProvider(provider);
    if (provider === EMAIL_PROVIDERS.SMTP || provider === EMAIL_PROVIDERS.RESEND) {
      setIsConfigured(false);
    }
  };

  const openConfig = (provider: AllowedEmailProviders) => {
    setProviderToConfigure(provider);
    setConfigModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold mb-6">Select your email provider</h2>
      <div className="flex gap-6">
        {Object.values(EMAIL_PROVIDERS).map((provider) => (
          <SetupOptionCard
            key={provider}
            title={provider}
            description={
              provider === EMAIL_PROVIDERS.SMTP ? "Use your existing SMTP credentials" : "Use Resend’s modern email API"
            }
            icon={provider === EMAIL_PROVIDERS.SMTP ? <Mail size={80} /> : undefined}
            imageSrc={provider === EMAIL_PROVIDERS.RESEND ? resendImg : undefined}
            selected={selectedProvider === provider}
            onSelect={() => handleSelect(provider)}
            requiresConfig={provider === EMAIL_PROVIDERS.SMTP || provider === EMAIL_PROVIDERS.RESEND}
            isConfigured={isConfigured}
            onConfigure={() => openConfig(provider)}
          />
        ))}
      </div>

      {providerToConfigure && (
        <ConfigureEmailProvider
          provider={providerToConfigure}
          initialConfig={emailConfig}
          open={configModalOpen}
          onOpenChange={setConfigModalOpen}
          onConnectionSuccess={(cfg) => {
            setEmailConfig(cfg);
            setIsConfigured(true);
            setConfigModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
