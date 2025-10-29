import { Button } from "@/components/ui/button";
import SetupOptionCard from "../auth/components/SetupOptionCard";
import { DATABASES } from "../types";
import ConfigureDatabaseForm from "./ConfigureDatabaseForm";
import type { AllowedDatabases, SetupWizardStep, PostgresConfig } from "../types";
import { WizardStep } from "./WizardStep";

export default function SelectDatabase({
  selectedDatabase,
  setSelectedDatabase,
  setStep,
  postgresConfig,
  setPostgresConfig,
}: {
  selectedDatabase: AllowedDatabases;
  setSelectedDatabase: (db: AllowedDatabases) => void;
  setStep: (step: SetupWizardStep) => void;
  postgresConfig: PostgresConfig;
  setPostgresConfig: (cfg: PostgresConfig) => void;
}) {
  return (
    <WizardStep
      isEmpty={!selectedDatabase}
      selectionKey="db-selection"
      configKey="db-config"
      selectionContent={Object.values(DATABASES).map((db) => (
        <SetupOptionCard
          key={db}
          title={db}
          description={
            db === DATABASES.SQLITE
              ? "No setup needed — start instantly with local storage"
              : "Connect to your own Postgres instance"
          }
          iconClass={db === DATABASES.SQLITE ? "devicon-sqlite-plain" : "devicon-postgresql-plain"}
          selected={selectedDatabase === db}
          onSelect={() => setSelectedDatabase(db)}
        />
      ))}
      configContent={
        <div className="flex flex-col md:flex-row items-start gap-8 w-full max-w-4xl">
          <SetupOptionCard
            title={selectedDatabase!}
            description={
              selectedDatabase === DATABASES.SQLITE
                ? "No setup needed — start instantly with local storage"
                : "Connect to your own Postgres instance"
            }
            iconClass={selectedDatabase === DATABASES.SQLITE ? "devicon-sqlite-plain" : "devicon-postgresql-plain"}
            selected
            onSelect={() => {}}
          />
          <div className="w-full md:flex-1 flex flex-col items-center md:items-start">
            {selectedDatabase === DATABASES.POSTGRESQL ? (
              <ConfigureDatabaseForm
                initialConfig={postgresConfig}
                onSave={(cfg) => {
                  setPostgresConfig(cfg);
                  setStep("selectEmailProvider");
                }}
              />
            ) : (
              <div className="p-6 border rounded-lg text-center bg-muted/10 w-full">
                <h3 className="text-xl font-semibold mb-2">SQLite Selected</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  No setup needed — Auth Forge will use a local SQLite database.
                </p>
                <Button onClick={() => setStep("selectEmailProvider")}>Continue</Button>
              </div>
            )}
          </div>
        </div>
      }
    />
  );
}
