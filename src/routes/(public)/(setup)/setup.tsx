// routes/(public)/(setup)/setup.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/shared/LoadingButton";
import type {
  DatabaseConfig,
  CompleteSetupRequest,
  AllowedDatabases,
  AdminCredentials,
} from "@/features/setup/setup.types";
import { SetupSidebar } from "@/features/setup/components/SetupSidebar";
import { SetAppDomain } from "@/features/setup/components/steps/SetAppDomain";
import { DatabaseStep } from "@/features/setup/components/steps/DatabaseStep";
import { EmailProviderStep } from "@/features/setup/components/steps/EmailProvderStep";
import { CreateAdminAccountStep } from "@/features/setup/components/steps/CreateAdminAccountStep";
import { useCompleteSetupMutation } from "@/features/setup/hooks/useCompleteSetupMutation";
import { buildConnectionString } from "@/features/setup/utils/buildConnectionString";
import { DATABASES } from "@/features/setup/setup.constants";
import { Wizard } from "@/features/setup/components/Wizard";
import { setupApi } from "@/features/setup/setup.api";
import type { EmailProviderConfig } from "@/types/shared.types";

export const Route = createFileRoute("/(public)/(setup)/setup")({
  beforeLoad: async ({ context }) => {
    const { isSetupComplete } = await context.queryClient.ensureQueryData({
      queryKey: ["setup-status"],
      queryFn: setupApi.getSetupStatus,
    });

    if (isSetupComplete) {
      throw redirect({ to: "/login" });
    }
  },
  component: SetupWizard,
});

export default function SetupWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [authForgeDomain, setAuthForgeDomain] = useState("");
  const [selectedDbType, setSelectedDbType] = useState<AllowedDatabases>(DATABASES.SQLITE);
  const [dbConfig, setDbConfig] = useState<DatabaseConfig | null>(null);
  const [emailConfig, setEmailConfig] = useState<EmailProviderConfig | null>(null);
  const [adminCredentials, setAdminCredentials] = useState<AdminCredentials | null>(null);
  const [isAdminFormValid, setIsAdminFormValid] = useState(false);

  const completeSetup = useCompleteSetupMutation();

  const handleDomainChange = useCallback((domain: string) => {
    setAuthForgeDomain(domain);
  }, []);

  const handleAdminFormChange = useCallback((data: AdminCredentials, isValid: boolean) => {
    setAdminCredentials(data);
    setIsAdminFormValid(isValid);
  }, []);

  const isValidUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch {
      return false;
    }
  };

  const canContinue = () => {
    if (currentStep === 1) {
      return authForgeDomain && isValidUrl(authForgeDomain);
    }
    if (currentStep === 2) {
      return selectedDbType === DATABASES.SQLITE || dbConfig !== null;
    }
    if (currentStep === 3) {
      return emailConfig !== null;
    }
    if (currentStep === 4) {
      return isAdminFormValid;
    }
    return true;
  };

  const handleContinue = () => {
    if (canContinue()) {
      setCurrentStep((s) => Math.min(s + 1, 4));
    }
  };

  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleFinishSetup = () => {
    if (!emailConfig || !adminCredentials || !isAdminFormValid) return;

    const connectionString =
      selectedDbType === DATABASES.SQLITE ? null : buildConnectionString(selectedDbType, dbConfig!);

    const payload: CompleteSetupRequest = {
      authForgeDomain: authForgeDomain.trim().replace(/\/$/, ""),
      databaseType: selectedDbType,
      connectionString,
      emailProviderConfig: emailConfig,
      adminCredentials,
    };

    completeSetup.mutate(payload);
  };

  return (
    <div className="flex gap-4 py-8 min-h-[90vh] w-full">
      <SetupSidebar currentStep={currentStep} />
      <div className="w-3/4">
        <Wizard currentStep={currentStep}>
          <SetAppDomain domain={authForgeDomain} onDomainChange={handleDomainChange} />
          <DatabaseStep
            selectedDbType={selectedDbType}
            dbConfig={dbConfig}
            onDbTypeChange={setSelectedDbType}
            onConfigChange={setDbConfig}
          />
          <EmailProviderStep emailConfig={emailConfig} onConfigChange={setEmailConfig} />
          <CreateAdminAccountStep onFormChange={handleAdminFormChange} isLoading={completeSetup.isPending} />
        </Wizard>

        <div className="flex flex-col items-center gap-4 mt-8 pb-8">
          {currentStep < 4 && (
            <Button
              onClick={handleContinue}
              disabled={!canContinue()}
              className="w-[250px] rounded-lg inset-shadow-lg bg-linear-to-t from-primary to-accent/75 font-semibold hover:to-accent/95 border border-background"
            >
              Continue
            </Button>
          )}

          {currentStep === 4 && (
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
