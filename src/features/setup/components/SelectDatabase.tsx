import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import SetupOptionCard from "../auth/components/SetupOptionCard";
import type { AllowedDatabases, SetupWizardStep } from "../types";
import ConfigureDatabaseForm from "./ConfigureDatabaseForm";

type SelectDatabaseProps = {
  selectedDatabase: string;
  setSelectedDatabase: (db: AllowedDatabases) => void;
  setStep: (step: SetupWizardStep) => void;
  postgresConfig: () => void;
  setPostgresConfig: (cfg: any) => void;
};

function SelectDatabase({
  selectedDatabase,
  setSelectedDatabase,
  setStep,
  postgresConfig,
  setPostgresConfig,
}: SelectDatabaseProps) {
  return (
    <motion.div
      layout
      className="flex flex-col items-center justify-center min-h-[70vh]"
      transition={{ layout: { duration: 0.4, type: "spring" } }}
    >
      <AnimatePresence mode="wait">
        {!selectedDatabase ? (
          <motion.div
            key="db-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="flex justify-center gap-6"
          >
            {["SQLite", "PostgreSQL"].map((db) => (
              <SetupOptionCard
                key={db}
                title={db}
                description={
                  db === "SQLite"
                    ? "No setup needed — start instantly with local storage"
                    : "Connect to your own Postgres instance"
                }
                iconClass={db === "SQLite" ? "devicon-sqlite-plain" : "devicon-postgresql-plain"}
                selected={false}
                onSelect={() => setSelectedDatabase(db as "SQLite" | "PostgreSQL")}
              />
            ))}
          </motion.div>
        ) : (
          <div>
            <motion.div
              key="db-config"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col md:flex-row items-start justify-center gap-8 w-full max-w-4xl"
            >
              <div className="relative">
                <SetupOptionCard
                  title={selectedDatabase}
                  description={
                    selectedDatabase === "SQLite"
                      ? "No setup needed — start instantly with local storage"
                      : "Connect to your own Postgres instance"
                  }
                  iconClass={selectedDatabase === "SQLite" ? "devicon-sqlite-plain" : "devicon-postgresql-plain"}
                  selected
                  onSelect={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>

              <motion.div layout className="w-full md:flex-1 flex flex-col items-center md:items-start">
                {selectedDatabase === "PostgreSQL" ? (
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
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default SelectDatabase;
