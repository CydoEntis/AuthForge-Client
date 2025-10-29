import { apiClient } from "@/lib/api/apiClient";
import type { AllowedDatabases, TestDatabaseConnectionResponse } from "./types";

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
};

// setupAdmin: async (values: SetupAdminValues): Promise<SetupAdminResponse> => {
//   return apiClient.post<SetupAdminResponse>("/admin/setup", values);
// },
