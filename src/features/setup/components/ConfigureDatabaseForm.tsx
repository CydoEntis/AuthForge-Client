import FormError from "@/components/shared/FormError";
import { FormInput } from "@/components/shared/FormInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { FormProvider } from "react-hook-form";
import type { PostgresConfig, AllowedDatabases } from "../types";
import { useConfigureDatabaseForm } from "../hooks/useConfigureDatabaseForm";
import { DATABASES } from "../types";

export default function ConfigureDatabaseForm({
  databaseType,
  initialConfig,
  onSave,
}: {
  databaseType: AllowedDatabases;
  initialConfig: PostgresConfig;
  onSave: (cfg: PostgresConfig) => void;
}) {
  const { form, handleSubmit, isLoading } = useConfigureDatabaseForm(databaseType, initialConfig, onSave);

  if (databaseType === DATABASES.SQLITE) {
    return (
      <div className="p-6 border rounded-lg text-center bg-muted/10 w-full">
        <p>SQLite selected — no configuration required.</p>
        <LoadingButton onClick={() => onSave(initialConfig)}>Continue</LoadingButton>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold">Configure Postgres</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput form={form} name="host" label="Host" placeholder="localhost" />
          <FormInput form={form} name="port" label="Port" placeholder="5432" />
          <FormInput form={form} name="user" label="User" placeholder="postgres" />
          <FormInput form={form} name="password" label="Password" placeholder="••••••" type="password" />
          <FormInput form={form} name="database" label="Database" placeholder="authforge" />
        </div>
        {form.formState.errors.root && <FormError message={form.formState.errors.root.message!} />}
        <div className="flex justify-end gap-3">
          <LoadingButton type="submit" isLoading={isLoading} loadingText="Testing configuration...">
            Test & Continue
          </LoadingButton>
        </div>
      </form>
    </FormProvider>
  );
}
