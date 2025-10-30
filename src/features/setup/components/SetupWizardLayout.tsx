import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  const [direction, setDirection] = useState(0); // +1 forward, -1 backward

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

  const goToStep = (nextStep: SetupWizardStep) => {
    const nextIndex = steps.indexOf(nextStep);
    if (nextIndex === -1 || nextIndex === currentIndex) return;
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setStep(nextStep);
  };

  const handleBack = () => {
    if (currentIndex > 0) goToStep(steps[currentIndex - 1]);
  };

  const handleContinue = () => {
    if (currentIndex < steps.length - 1) goToStep(steps[currentIndex + 1]);
  };

  const renderStep = () => {
    switch (step) {
      case "welcome":
        return <WelcomeToSetup onBegin={() => goToStep("selectDatabase")} />;
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
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? -400 : 400,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? 400 : -400,
      opacity: 0,
    }),
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 py-10">
      <div className="relative w-full max-w-4xl h-[80vh] flex justify-center items-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

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
