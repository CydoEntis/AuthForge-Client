import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/shared/LoadingButton";
import type {
  DatabaseConfig,
  CompleteSetupRequest,
  AllowedDatabases,
  EmailProviderConfig,
} from "@/features/setup/setup.types";
import { SetupSidebar } from "@/features/setup/components/SetupSidebar";
import { DatabaseStep } from "@/features/setup/components/steps/DatabaseStep";
import { EmailProviderStep } from "@/features/setup/components/steps/EmailProvderStep";
import {
  CreateAdminAccountStep,
  type CreateAdminAccountStepRef,
} from "@/features/setup/components/steps/CreateAdminAccountStep";
import { useCompleteSetup } from "@/features/setup/hooks/useCompleteSetup";
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
  const [emailConfig, setEmailConfig] = useState<EmailProviderConfig | null>(null);

  const adminStepRef = useRef<CreateAdminAccountStepRef>(null);
  const completeSetup = useCompleteSetup();

  const canContinue = () => {
    if (currentStep === 1) {
      return selectedDbType === DATABASES.SQLITE || dbConfig !== null;
    }
    if (currentStep === 2) {
      return emailConfig !== null;
    }
    if (currentStep === 3) {
      return adminStepRef.current?.isValid() ?? false;
    }
    return true;
  };

  const handleContinue = () => {
    if (canContinue()) {
      setCurrentStep((s) => Math.min(s + 1, 3));
    }
  };

  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleFinishSetup = () => {
    if (!emailConfig || !adminStepRef.current) return;

    adminStepRef.current.submit();

    if (adminStepRef.current.isValid()) {
      const adminCredentials = adminStepRef.current.getValues();

      const connectionString =
        selectedDbType === DATABASES.SQLITE ? null : buildConnectionString(selectedDbType, dbConfig!);

      const payload: CompleteSetupRequest = {
        databaseType: selectedDbType,
        connectionString,
        emailProviderConfig: emailConfig,
        adminCredentials,
      };

      completeSetup.mutate(payload);
    }
  };

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
          <EmailProviderStep emailConfig={emailConfig} onConfigChange={setEmailConfig} />
          <CreateAdminAccountStep ref={adminStepRef} onSubmit={() => {}} isLoading={completeSetup.isPending} />
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

          {currentStep === 3 && (
            <LoadingButton
              onClick={handleFinishSetup}
              disabled={!canContinue() || completeSetup.isPending}
              isLoading={completeSetup.isPending}
              loadingText="Setting up..."
              className="w-[250px] rounded-lg inset-shadow-lg bg-linear-to-t from-primary to-accent/75 font-semibold hover:to-accent/95 border border-background"
            >
              Finish Setup
            </LoadingButton>
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
