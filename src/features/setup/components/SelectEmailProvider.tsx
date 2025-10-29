import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import SetupOptionCard from "../auth/components/SetupOptionCard";
import { Mail } from "lucide-react";
import ResendBlack from "@/public/resend-icon-black.svg";
import ResendWhite from "@/public/resend-icon-white.svg";
import { useTheme } from "@/features/theme/hooks/useTheme";
import type { AllowedEmailProviders, EmailConfig, SetupWizardStep } from "../types";
import ConfigureEmailProviderForm from "./ConfigureEmailProviderForm";
import { EMAIL_PROVIDERS } from "../types";

type SelectEmailProviderProps = {
  selectedProvider: AllowedEmailProviders;
  setSelectedProvider: (provider: AllowedEmailProviders) => void;
  setStep: (step: SetupWizardStep) => void;
  emailConfig: EmailConfig;
  setEmailConfig: (cfg: EmailConfig) => void;
};

export default function SelectEmailProvider({
  selectedProvider = EMAIL_PROVIDERS.SMTP,
  setSelectedProvider,
  setStep,
  emailConfig,
  setEmailConfig,
}: SelectEmailProviderProps) {
  const { theme } = useTheme();
  const resendImg = theme === "dark" ? ResendWhite : ResendBlack;

  const handleSave = (cfg: EmailConfig) => {
    setEmailConfig(cfg);
    setStep("done");
  };

  return (
    <motion.div
      layout
      className="flex flex-col items-center justify-center min-h-[70vh]"
      transition={{ layout: { duration: 0.4, type: "spring" } }}
    >
      <AnimatePresence mode="wait">
        {!selectedProvider ? (
          <motion.div
            key="email-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="flex justify-center gap-6"
          >
            <SetupOptionCard
              title={EMAIL_PROVIDERS.SMTP}
              description="Use your existing SMTP credentials"
              icon={<Mail size={80} />}
              selected={false}
              onSelect={() => setSelectedProvider(EMAIL_PROVIDERS.SMTP)}
            />
            <SetupOptionCard
              title={EMAIL_PROVIDERS.RESEND}
              description="Use Resend’s modern email API"
              imageSrc={resendImg}
              selected={false}
              onSelect={() => setSelectedProvider(EMAIL_PROVIDERS.RESEND)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="email-config"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-start justify-center gap-8 w-full max-w-4xl"
          >
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

            <motion.div layout className="w-full md:flex-1 flex flex-col items-center md:items-start">
              <ConfigureEmailProviderForm provider={selectedProvider} initialConfig={emailConfig} onSave={handleSave} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedProvider && (
        <div className="flex w-full justify-center gap-4 items-center mt-4">
          <Button
            variant="outline"
            className="text-xs opacity-80 hover:opacity-100"
            onClick={() => setSelectedProvider(EMAIL_PROVIDERS.SMTP)}
          >
            ← Back
          </Button>
        </div>
      )}
    </motion.div>
  );
}
