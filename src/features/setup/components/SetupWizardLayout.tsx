import { useState } from "react";
import WelcomeToSetup from "./WelcomeToSetup";
import SelectDatabase from "./SelectDatabase";
import AuthCard from "@/components/shared/AuthCard";
import SelectEmailProvider from "./SelectEmailProvider";
import {
  type AllowedDatabases,
  type AllowedEmailProviders,
  type EmailConfig,
  type PostgresConfig,
  type SetupWizardStep,
} from "../types";

export default function SetupWizardLayout() {
  const [step, setStep] = useState<SetupWizardStep>("welcome");

  const [selectedDatabase, setSelectedDatabase] = useState<AllowedDatabases>("SQLite");
  const [postgresConfig, setPostgresConfig] = useState<PostgresConfig>({
    host: "",
    port: "",
    user: "",
    password: "",
    database: "",
  });

  const [selectedEmail, setSelectedEmail] = useState<AllowedEmailProviders>("SMTP");
  const [emailConfig, setEmailConfig] = useState<EmailConfig>({
    host: "",
    port: "",
    username: "",
    password: "",
    apiKey: "",
    from: "",
    to: "",
  });

  const steps: SetupWizardStep[] = ["welcome", "selectDatabase", "selectEmailProvider", "done"];
  const currentIndex = steps.indexOf(step);

  const handleBack = () => {
    if (currentIndex > 0) setStep(steps[currentIndex - 1]);
  };

  const handleContinue = () => {
    if (currentIndex < steps.length - 1) setStep(steps[currentIndex + 1]);
  };

  function renderStep() {
    switch (step) {
      case "welcome":
        return <WelcomeToSetup setStep={setStep} />;

      case "selectDatabase":
        return (
          <SelectDatabase
            selectedDatabase={selectedDatabase}
            setSelectedDatabase={setSelectedDatabase}
            initialConfig={postgresConfig}
            onConnectionSuccess={(cfg) => setPostgresConfig(cfg)}
          />
        );

      case "selectEmailProvider":
        return (
          <SelectEmailProvider
            selectedProvider={selectedEmail}
            setSelectedProvider={setSelectedEmail}
            emailConfig={emailConfig}
            setEmailConfig={setEmailConfig}
          />
        );

      case "done":
        return <AuthCard title="Setup Complete" subText="You can now start using Auth Forge!" children={undefined} />;

      default:
        return null;
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 py-10">
      <div className="w-full max-w-4xl">{renderStep()}</div>

      {step !== "welcome" && step !== "done" && (
        <div className="flex justify-center w-full gap-4 mt-6">
          <button className="px-4 py-2 border rounded" onClick={handleBack} disabled={currentIndex === 0}>
            ← Back
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded" onClick={handleContinue}>
            Continue →
          </button>
        </div>
      )}
    </section>
  );
}
