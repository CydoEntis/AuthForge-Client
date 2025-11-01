import { useState } from "react";
import SetupOptionCard from "../auth/components/SetupOptionCard";
import { DATABASES } from "../types";
import type { AllowedDatabases, PostgresConfig } from "../types";
import ConfigureDatabase from "./ConfigureDatabase";

type SelectDatabaseProps = {
  selectedDatabase: AllowedDatabases;
  setSelectedDatabase: (db: AllowedDatabases) => void;
  initialConfig: PostgresConfig;
  onConnectionSuccess: (cfg: PostgresConfig) => void;
  onDatabaseChange: () => void;
};

const SelectDatabase = ({
  selectedDatabase,
  setSelectedDatabase,
  initialConfig,
  onConnectionSuccess,
  onDatabaseChange,
}: SelectDatabaseProps) => {
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [databaseToConfigure, setDatabaseToConfigure] = useState<AllowedDatabases | null>(null);
  const [isDatabaseConfigured, setIsDatabaseConfigured] = useState(false);

  const handleSelect = (db: AllowedDatabases) => {
    setSelectedDatabase(db);
    onDatabaseChange();

    if (db === DATABASES.POSTGRESQL) {
      setIsDatabaseConfigured(false);
    }
  };

  const openConfig = (db: AllowedDatabases) => {
    setDatabaseToConfigure(db);
    setConfigModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold mb-6">Select your database</h2>
      <div className="flex gap-6">
        {Object.values(DATABASES).map((db) => (
          <SetupOptionCard
            key={db}
            title={db}
            description={
              db === DATABASES.SQLITE ? "Start instantly with local storage" : "Connect to your own Postgres instance"
            }
            iconClass={db === DATABASES.SQLITE ? "devicon-sqlite-plain" : "devicon-postgresql-plain"}
            selected={selectedDatabase === db}
            onSelect={() => handleSelect(db)}
            requiresConfig={db === DATABASES.POSTGRESQL}
            isConfigured={db === DATABASES.POSTGRESQL ? isDatabaseConfigured : true}
            onConfigure={db === DATABASES.POSTGRESQL ? () => openConfig(db) : undefined}
          />
        ))}
      </div>

      {databaseToConfigure && (
        <ConfigureDatabase
          databaseType={databaseToConfigure}
          initialConfig={initialConfig}
          open={configModalOpen}
          onOpenChange={setConfigModalOpen}
          onConnectionSuccess={(cfg) => {
            onConnectionSuccess(cfg);
            setIsDatabaseConfigured(true);
          }}
        />
      )}
    </div>
  );
};

export default SelectDatabase;
