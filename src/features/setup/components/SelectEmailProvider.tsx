import SetupOptionCard from "../auth/components/SetupOptionCard";
import { Mail } from "lucide-react";
import ResendBlack from "@/public/resend-icon-black.svg";
import ResendWhite from "@/public/resend-icon-white.svg";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { WizardStep } from "./WizardStep";
import ConfigureEmailProviderForm from "./ConfigureEmailProviderForm";
import { EMAIL_PROVIDERS } from "../types";
import type { AllowedEmailProviders, EmailConfig, SetupWizardStep } from "../types";
import { Button } from "@/components/ui/button";

export default function SelectEmailProvider({
  selectedProvider = EMAIL_PROVIDERS.SMTP,
  setSelectedProvider,
  setStep,
  emailConfig,
  setEmailConfig,
}: {
  selectedProvider: AllowedEmailProviders;
  setSelectedProvider: (provider: AllowedEmailProviders) => void;
  setStep: (step: SetupWizardStep) => void;
  emailConfig: EmailConfig;
  setEmailConfig: (cfg: EmailConfig) => void;
}) {
  const { theme } = useTheme();
  const resendImg = theme === "dark" ? ResendWhite : ResendBlack;

  const providerNeedsConfig = selectedProvider === EMAIL_PROVIDERS.SMTP || selectedProvider === EMAIL_PROVIDERS.RESEND;

  return (
    <WizardStep
      isEmpty={!selectedProvider}
      selectionKey="email-selection"
      configKey="email-config"
      selectionContent={[
        <SetupOptionCard
          key={EMAIL_PROVIDERS.SMTP}
          title={EMAIL_PROVIDERS.SMTP}
          description="Use your existing SMTP credentials"
          icon={<Mail size={80} />}
          selected={selectedProvider === EMAIL_PROVIDERS.SMTP}
          onSelect={() => setSelectedProvider(EMAIL_PROVIDERS.SMTP)}
        />,
        <SetupOptionCard
          key={EMAIL_PROVIDERS.RESEND}
          title={EMAIL_PROVIDERS.RESEND}
          description="Use Resend’s modern email API"
          imageSrc={resendImg}
          selected={selectedProvider === EMAIL_PROVIDERS.RESEND}
          onSelect={() => setSelectedProvider(EMAIL_PROVIDERS.RESEND)}
        />,
      ]}
      configContent={
        <div className="flex flex-col md:flex-row items-start gap-8 w-full max-w-4xl">
          <SetupOptionCard
            title={selectedProvider}
            description={
              selectedProvider === EMAIL_PROVIDERS.SMTP
                ? "Use your SMTP credentials to send emails"
                : "Connect your Resend account with an API key"
            }
            icon={
              selectedProvider === EMAIL_PROVIDERS.SMTP ? (
                <Mail size={80} />
              ) : (
                <img src={resendImg} alt="Resend" className="w-16 h-16" />
              )
            }
            selected
            onSelect={() => {}}
          />
          <div className="w-full md:flex-1 flex flex-col items-center md:items-start">
            {providerNeedsConfig ? (
              <ConfigureEmailProviderForm
                provider={selectedProvider}
                initialConfig={emailConfig}
                onSave={(cfg) => {
                  setEmailConfig(cfg);
                  setStep("done");
                }}
              />
            ) : (
              <div className="p-6 border rounded-lg text-center bg-muted/10 w-full">
                <p className="text-sm text-muted-foreground mb-4">
                  No configuration needed — continue to the next step.
                </p>
                <Button onClick={() => setStep("done")}>Continue</Button>
              </div>
            )}
          </div>
        </div>
      }
    />
  );
}
