import { useZodForm } from "@/hooks/useZodForm";
import { postgresSchema } from "../schemas";
import { DATABASES, type AllowedDatabases, type PostgresConfig, type TestDatabaseConnectionResponse } from "../types";
import { useFormMutation } from "@/hooks/useFormMutation";
import { setupApi } from "../api";

export function useConfigureDatabaseForm(
  databaseType: AllowedDatabases,
  initialConfig: PostgresConfig,
  onSave: (cfg: PostgresConfig) => void
) {
  const form = useZodForm<PostgresConfig>(postgresSchema, initialConfig);

  const mutation = useFormMutation<PostgresConfig, TestDatabaseConnectionResponse>({
    mutationFn: async (values) => {
      const connectionString =
        databaseType === DATABASES.POSTGRESQL
          ? `Host=${values.host};Port=${values.port};Username=${values.user};Password=${values.password};Database=${values.database}`
          : null;

      return setupApi.testDatabaseConnection(DATABASES.POSTGRESQL, connectionString);
    },
    setError: form.setError,
    successMessage: "Database connection successful!",
    onSuccess: (response) => {
      if (response.isSuccessful) {
        onSave(form.getValues());
      } else {
        form.setError("root", { type: "manual", message: response.message });
      }
    },
  });

  const handleSubmit = form.handleSubmit((values) => mutation.mutate(values));

  return { form, handleSubmit, isLoading: mutation.isPending };
}
