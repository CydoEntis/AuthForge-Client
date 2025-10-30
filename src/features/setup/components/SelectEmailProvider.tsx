import { useState, useImperativeHandle, forwardRef } from "react";
import SetupOptionCard from "../auth/components/SetupOptionCard";
import ConfigureEmailProviderForm from "./ConfigureEmailProviderForm";
import { EMAIL_PROVIDERS } from "../types";
import { Mail } from "lucide-react";
import ResendBlack from "@/assets/resend-icon-black.svg";
import ResendWhite from "@/assets/resend-icon-white.svg";
import { useTheme } from "@/features/theme/hooks/useTheme";
import type { AllowedEmailProviders, EmailConfig } from "../types";

interface Props {
  selectedProvider: AllowedEmailProviders;
  setSelectedProvider: (provider: AllowedEmailProviders) => void;
  emailConfig: EmailConfig;
  setEmailConfig: (cfg: EmailConfig) => void;
  validateRef: React.Ref<{ (): Promise<boolean> }>;
}

const SelectEmailProvider = forwardRef<HTMLDivElement, Props>(
  ({ selectedProvider, setSelectedProvider, emailConfig, setEmailConfig, validateRef }, _ref) => {
    const [mode, setMode] = useState<"selection" | "config">("selection");
    const { theme } = useTheme();
    const resendImg = theme === "dark" ? ResendWhite : ResendBlack;

    const handleSelect = (provider: AllowedEmailProviders) => {
      setSelectedProvider(provider);
      setMode("config");
    };

    useImperativeHandle(validateRef, () => async () => {
      if (mode === "selection") return false;
      // simulate validation
      return new Promise<boolean>((resolve) => resolve(true));
    });

    return (
      <div className="flex flex-col items-center w-full">
        {mode === "selection" ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">Select your email provider</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <SetupOptionCard
                key={EMAIL_PROVIDERS.SMTP}
                title={EMAIL_PROVIDERS.SMTP}
                description="Use your existing SMTP credentials"
                icon={<Mail size={80} />}
                selected={selectedProvider === EMAIL_PROVIDERS.SMTP}
                onSelect={() => handleSelect(EMAIL_PROVIDERS.SMTP)}
              />
              <SetupOptionCard
                key={EMAIL_PROVIDERS.RESEND}
                title={EMAIL_PROVIDERS.RESEND}
                description="Use Resend’s modern email API"
                imageSrc={resendImg}
                selected={selectedProvider === EMAIL_PROVIDERS.RESEND}
                onSelect={() => handleSelect(EMAIL_PROVIDERS.RESEND)}
              />
            </div>
          </>
        ) : (
          <ConfigureEmailProviderForm
            provider={selectedProvider}
            initialConfig={emailConfig}
            onConnectionSuccess={setEmailConfig}
          />
        )}
      </div>
    );
  }
);

export default SelectEmailProvider;
