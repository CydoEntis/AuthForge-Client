import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type {
  DatabaseConfig,
  EmailConfig,
  CompleteSetupRequest,
  AllowedDatabases,
  AdminCredentials,
} from "@/features/setup/setup.types";
import { SetupSidebar } from "@/features/setup/components/SetupSidebar";
import { DatabaseStep } from "@/features/setup/components/steps/DatabaseStep";
import { CreateAdminAccountStep } from "@/features/setup/components/steps/CreateAdminAccountStep";
import { useCompleteSetup } from "@/features/setup/hooks/useCompleteSetup";
import { EmailProviderStep } from "@/features/setup/components/steps/EmailProvderStep";
import { buildConnectionString } from "@/features/setup/utils/buildConnectionString";
import { DATABASES } from "@/features/setup/setup.constants";
import { Wizard } from "@/features/setup/components/Wizard";

export const Route = createFileRoute("/(setup)/setup")({
  component: SetupWizard,
});

export default function SetupWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDbType, setSelectedDbType] = useState<AllowedDatabases>(DATABASES.SQLITE);
  const [dbConfig, setDbConfig] = useState<DatabaseConfig | null>(null);
  const [emailConfig, setEmailConfig] = useState<EmailConfig | null>(null);

  const completeSetup = useCompleteSetup();

  const handleFinish = (admin: AdminCredentials) => {
    const connectionString =
      selectedDbType === DATABASES.SQLITE ? null : buildConnectionString(selectedDbType, dbConfig!);

    const payload: CompleteSetupRequest = {
      databaseType: selectedDbType,
      connectionString,
      fromEmail: emailConfig!.fromEmail,
      fromName: emailConfig?.fromName,
      ...(emailConfig &&
        "smtpHost" in emailConfig && {
          smtpHost: emailConfig.smtpHost,
          smtpPort: emailConfig.smtpPort,
          smtpUsername: emailConfig.smtpUsername,
          smtpPassword: emailConfig.smtpPassword,
          useSsl: emailConfig.useSsl,
        }),
      ...(emailConfig &&
        "resendApiKey" in emailConfig && {
          resendApiKey: emailConfig.resendApiKey,
        }),
      adminEmail: admin.email,
      adminPassword: admin.password,
    };

    completeSetup.mutate(payload);
  };

  const canContinue = () => {
    if (currentStep === 1) {
      return selectedDbType === DATABASES.SQLITE || dbConfig !== null;
    }
    if (currentStep === 2) {
      return emailConfig !== null;
    }
    return true;
  };

  const handleContinue = () => {
    if (canContinue()) {
      setCurrentStep((s) => Math.min(s + 1, 3));
    }
  };

  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 1));

  return (
    <div className="flex gap-4 py-8 min-h-[90vh]">
      <SetupSidebar currentStep={currentStep} />

      <div className="w-3/4">
        <Wizard currentStep={currentStep}>
          <DatabaseStep
            selectedDbType={selectedDbType}
            dbConfig={dbConfig}
            onDbTypeChange={setSelectedDbType}
            onConfigChange={setDbConfig}
          />
          <CreateAdminAccountStep onSubmit={handleFinish} isLoading={completeSetup.isPending} />
          <EmailProviderStep emailConfig={emailConfig} onConfigChange={setEmailConfig} />
        </Wizard>

        <div className="flex flex-col items-center gap-4 mt-8 pb-8">
          {currentStep < 3 && (
            <Button
              onClick={handleContinue}
              disabled={!canContinue()}
              className="w-[250px] rounded-lg inset-shadow-lg bg-linear-to-t from-primary to-accent/75 font-semibold hover:to-accent/95 border border-background"
            >
              Continue
            </Button>
          )}

          {currentStep !== 1 && (
            <Button
              onClick={handleBack}
              disabled={completeSetup.isPending}
              variant="outline"
              className="w-[250px] rounded-lg inset-shadow-lg bg-linear-to-t from-card to-background font-semibold hover:to-sidebar text-muted-foreground border border-background"
            >
              Back
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
