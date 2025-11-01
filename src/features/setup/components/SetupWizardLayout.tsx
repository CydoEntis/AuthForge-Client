import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WelcomeToSetup from "./WelcomeToSetup";
import SelectDatabase from "./SelectDatabase";
import SelectEmailProvider from "./SelectEmailProvider";
import CreateAdmin from "./CreateAdmin";
import { useCompleteSetup } from "../hooks/useCompleteSetup";
import {
  type AllowedDatabases,
  type AllowedEmailProviders,
  type EmailConfig,
  type PostgresConfig,
  type SetupWizardStep,
  type AdminConfig,
  DATABASES,
  EMAIL_PROVIDERS,
} from "../types";

export default function SetupWizardLayout() {
  const [step, setStep] = useState<SetupWizardStep>("welcome");
  const [direction, setDirection] = useState(0);

  const [selectedDatabase, setSelectedDatabase] = useState<AllowedDatabases>(DATABASES.SQLITE);
  const [postgresConfig, setPostgresConfig] = useState<PostgresConfig>({
    host: "",
    port: "",
    user: "",
    password: "",
    database: "",
  });
  const [isDatabaseConfigured, setIsDatabaseConfigured] = useState(false);

  const [selectedEmail, setSelectedEmail] = useState<AllowedEmailProviders>(EMAIL_PROVIDERS.SMTP);
  const [emailConfig, setEmailConfig] = useState<EmailConfig>({
    host: "",
    port: "",
    username: "",
    password: "",
    apiKey: "",
    from: "",
    to: "",
  });
  const [isEmailConfigured, setIsEmailConfigured] = useState(false);

  const [adminConfig, setAdminConfig] = useState<AdminConfig>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const completeSetupMutation = useCompleteSetup();

  const steps: SetupWizardStep[] = ["welcome", "selectDatabase", "selectEmailProvider", "createAdmin", "done"];
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

  const canContinue = () => {
    if (step === "selectDatabase") {
      return selectedDatabase === DATABASES.SQLITE || isDatabaseConfigured;
    }

    if (step === "selectEmailProvider") {
      return isEmailConfigured;
    }

    return true;
  };

  const handleContinue = () => {
    if (!canContinue()) return;
    if (currentIndex < steps.length - 1) goToStep(steps[currentIndex + 1]);
  };

  const handleCompleteSetup = () => {
    const setupPayload = {
      databaseType: selectedDatabase,
      connectionString:
        selectedDatabase === DATABASES.POSTGRESQL
          ? `Host=${postgresConfig.host};Port=${postgresConfig.port};Username=${postgresConfig.user};Password=${postgresConfig.password};Database=${postgresConfig.database}`
          : null,
      emailProvider: selectedEmail,
      resendApiKey: selectedEmail === EMAIL_PROVIDERS.RESEND ? emailConfig.apiKey || null : null,
      smtpHost: selectedEmail === EMAIL_PROVIDERS.SMTP ? emailConfig.host || null : null,
      smtpPort: selectedEmail === EMAIL_PROVIDERS.SMTP && emailConfig.port ? Number(emailConfig.port) : null,
      smtpUsername: selectedEmail === EMAIL_PROVIDERS.SMTP ? emailConfig.username || null : null,
      smtpPassword: selectedEmail === EMAIL_PROVIDERS.SMTP ? emailConfig.password || null : null,
      smtpUseSsl: selectedEmail === EMAIL_PROVIDERS.SMTP ? true : null,
      fromEmail: emailConfig.from,
      fromName: "AuthForge",
      adminEmail: adminConfig.email,
      adminPassword: adminConfig.password,
    };

    completeSetupMutation.mutate(setupPayload, {
      onSuccess: () => {
        goToStep("done");
      },
    });
  };

  const renderStepContent = () => {
    switch (step) {
      case "welcome":
        return <WelcomeToSetup onBegin={() => goToStep("selectDatabase")} />;

      case "selectDatabase":
        return (
          <SelectDatabase
            selectedDatabase={selectedDatabase}
            setSelectedDatabase={setSelectedDatabase}
            initialConfig={postgresConfig}
            onConnectionSuccess={(cfg) => {
              setPostgresConfig(cfg);
              setIsDatabaseConfigured(true);
            }}
            onDatabaseChange={() => setIsDatabaseConfigured(false)}
          />
        );

      case "selectEmailProvider":
        return (
          <SelectEmailProvider
            selectedProvider={selectedEmail}
            setSelectedProvider={setSelectedEmail}
            emailConfig={emailConfig}
            setEmailConfig={setEmailConfig}
            onEmailConfigured={() => setIsEmailConfigured(true)}
            onProviderChange={() => setIsEmailConfigured(false)}
          />
        );

      case "createAdmin":
        return (
          <CreateAdmin
            adminConfig={adminConfig}
            setAdminConfig={setAdminConfig}
            onComplete={handleCompleteSetup}
            isLoading={completeSetupMutation.isPending}
          />
        );

      case "done":
        return <h3 className="text-7xl text-center text-foreground font-semibold">Setup Complete!</h3>;

      default:
        return null;
    }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 py-10">
      <div className="relative w-full max-w-4xl flex flex-col items-center">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="w-full flex flex-col items-center"
            layout
          >
            <div className="w-full">{renderStepContent()}</div>

            {step !== "welcome" && step !== "done" && step !== "createAdmin" && (
              <div className="flex justify-center w-full gap-4 mt-6">
                <button
                  className="px-4 py-2 border rounded hover:bg-muted"
                  onClick={handleBack}
                  disabled={currentIndex === 0}
                >
                  ← Back
                </button>
                <button
                  className={`px-4 py-2 rounded transition-colors ${
                    canContinue()
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                  onClick={handleContinue}
                  disabled={!canContinue()}
                >
                  Continue →
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
