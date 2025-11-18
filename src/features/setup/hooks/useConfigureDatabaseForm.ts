import { useZodForm } from "@/hooks/useZodForm";
import { useFormMutation } from "@/hooks/useFormMutation";
import { setupApi } from "../setup.api";
import { databaseConfigSchema } from "../setup.schemas";
import type {
  DatabaseConfig,
  TestDatabaseConnectionRequest,
  TestDatabaseConnectionResponse,
  AllowedDatabases,
} from "../setup.types";
import { buildConnectionString } from "../utils/buildConnectionString";

export function useConfigureDatabaseForm(
  databaseType: AllowedDatabases,
  initialConfig: DatabaseConfig | null,
  onSave: (cfg: DatabaseConfig) => void
) {
  const form = useZodForm(databaseConfigSchema, {
    defaultValues: initialConfig || {
      host: "",
      port: "",
      user: "",
      password: "",
      database: "",
    },
  });

  const mutation = useFormMutation<DatabaseConfig, TestDatabaseConnectionResponse>({
    mutationFn: async (values) => {
      const connectionString = buildConnectionString(databaseType, values);

      const request: TestDatabaseConnectionRequest = {
        databaseType,
        connectionString,
      };

      return setupApi.testDatabaseConnection(request);
    },
    setError: form.setError,
    successMessage: "Database connection successful!",
    onSuccess: (response: TestDatabaseConnectionResponse) => {
      if (response.isSuccessful) {
        const values = form.getValues();
        onSave(values);
      } else {
        form.setError("root", { type: "manual", message: response.message });
      }
    },
  });

  const handleSubmit = form.handleSubmit((values) => mutation.mutate(values));

  return { form, handleSubmit, isLoading: mutation.isPending };
}
