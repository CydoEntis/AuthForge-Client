import { apiClient } from "@/lib/api/apiClient";
import type {
  AllowedDatabases,
  AllowedEmailProviders,
  EmailConfig,
  TestDatabaseConnectionResponse,
  TestEmailResponse,
} from "./types";

export const setupApi = {
  testDBConnection: async (
    databaseType: AllowedDatabases,
    connectionString: string | null
  ): Promise<TestDatabaseConnectionResponse> => {
    return apiClient.post<TestDatabaseConnectionResponse>("/admin/setup/test-db-connection", {
      databaseType,
      connectionString,
    });
  },
  testEmailProvider: async (provider: AllowedEmailProviders, config: EmailConfig): Promise<TestEmailResponse> => {
    return apiClient.post<TestEmailResponse>("/admin/setup/test-email", {
      provider,
      ...config,
    });
  },
};

// setupAdmin: async (values: SetupAdminValues): Promise<SetupAdminResponse> => {
//   return apiClient.post<SetupAdminResponse>("/admin/setup", values);
// },
