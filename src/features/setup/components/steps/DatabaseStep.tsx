import { AlertMessage } from "@/components/AlertMessage";
import OptionCard from "@/components/OptionCard";
import { useState } from "react";
import { DATABASE_META, DATABASES } from "../../setup.constants";
import type { DatabaseConfig, AllowedDatabases } from "../../setup.types";
import ConfigureDatabase from "../ConfigureDatabase";

export function DatabaseStep({
  selectedDbType,
  dbConfig,
  onDbTypeChange,
  onConfigChange,
}: {
  selectedDbType: AllowedDatabases;
  dbConfig: DatabaseConfig | null;
  onDbTypeChange: (type: AllowedDatabases) => void;
  onConfigChange: (config: DatabaseConfig | null) => void;
}) {
  const [dbModalOpen, setDbModalOpen] = useState(false);

  const handleDbSelect = (db: AllowedDatabases) => {
    onDbTypeChange(db);

    if (db === DATABASES.SQLITE) {
      onConfigChange(null);
    } else {
      if (selectedDbType !== db) {
        onConfigChange(null);
      }
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <h3 className="text-4xl font-semibold">Let's get your database setup</h3>
        <p className="text-lg text-muted-foreground mt-2">Choose to bring your own database or opt for SQLite</p>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center w-1/2 mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-4">
          {Object.values(DATABASES).map((db) => (
            <OptionCard
              key={db}
              title={DATABASE_META[db].displayName}
              iconClass={DATABASE_META[db].icon}
              selected={selectedDbType === db}
              onSelect={() => handleDbSelect(db)}
            />
          ))}
        </div>

        <div className="mt-6 min-h-[80px]">
          {selectedDbType === DATABASES.SQLITE && (
            <AlertMessage message="SQLite requires no configuration" type="success" />
          )}

          {selectedDbType !== DATABASES.SQLITE && !dbConfig && (
            <AlertMessage
              message={`${selectedDbType} requires configuration before continuing`}
              type="warning"
              onConfigure={() => setDbModalOpen(true)}
            />
          )}

          {selectedDbType !== DATABASES.SQLITE && dbConfig && (
            <AlertMessage
              message={`${selectedDbType} configured successfully`}
              type="success"
              onConfigure={() => setDbModalOpen(true)}
            />
          )}
        </div>
      </div>

      <ConfigureDatabase
        databaseType={selectedDbType}
        initialConfig={dbConfig}
        open={dbModalOpen}
        onOpenChange={setDbModalOpen}
        onConnectionSuccess={onConfigChange}
      />
    </>
  );
}
