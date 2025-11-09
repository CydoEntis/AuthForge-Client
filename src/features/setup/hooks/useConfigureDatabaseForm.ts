import { useZodForm } from "@/hooks/useZodForm";
import { type AllowedDatabases, type PostgresConfig, type TestDatabaseConnectionResponse } from "../setup.types";
import { useFormMutation } from "@/hooks/useFormMutation";
import { setupApi } from "../setup.api";
import { DATABASES } from "../setup.constants";
import { postgresSchema } from "../setup.schemas";

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

      const request = {
        databaseType: DATABASES.POSTGRESQL,
        connectionString,
      };

      return setupApi.testDatabaseConnection(request);
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
