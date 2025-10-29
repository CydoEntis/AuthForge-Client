import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import AuthCard from "@/components/shared/AuthCard";
import WelcomeToSetup from "@/features/setup/components/WelcomeToSetup";
import SelectDatabase from "@/features/setup/components/SelectDatabase";
import SelectEmailProvider from "@/features/setup/components/SelectEmailProvider";

import type {
  AllowedDatabases,
  AllowedEmailProviders,
  EmailConfig,
  PostgresConfig,
  SetupWizardStep,
} from "@/features/setup/types";

// --------------------------
// Route export
// --------------------------
export const Route = createFileRoute("/playground/")({
  component: SetupWizard,
});

// --------------------------
// Main Setup Wizard
// --------------------------
export function SetupWizard() {
  const [step, setStep] = useState<SetupWizardStep>("welcome");

  const [selectedDatabase, setSelectedDatabase] = useState<AllowedDatabases>("SQLite");
  const [postgresConfig, setPostgresConfig] = useState<PostgresConfig>({
    host: "",
    port: "",
    user: "",
    password: "",
    database: "",
  });

  // Default email provider is SMTP
  const [selectedEmail, setSelectedEmail] = useState<AllowedEmailProviders>("SMTP");
  const [emailConfig, setEmailConfig] = useState<EmailConfig>({
    host: "",
    port: "",
    username: "",
    password: "",
    apiKey: "",
  });

  function renderStep() {
    switch (step) {
      case "welcome":
        return <WelcomeToSetup setStep={setStep} />;

      case "selectDatabase":
        return (
          <SelectDatabase
            selectedDatabase={selectedDatabase}
            setSelectedDatabase={setSelectedDatabase}
            setStep={setStep}
            postgresConfig={postgresConfig}
            setPostgresConfig={setPostgresConfig}
          />
        );

      case "selectEmailProvider":
        return (
          <SelectEmailProvider
            selectedProvider={selectedEmail}
            setSelectedProvider={setSelectedEmail}
            setStep={setStep}
            emailConfig={emailConfig}
            setEmailConfig={setEmailConfig}
          />
        );

      case "done":
        return <AuthCard title="Setup Complete" subText="You can now start using Auth Forge!" children={undefined} />;
    }
  }

  return <section className="min-h-screen flex justify-center items-center">{renderStep()}</section>;
}
