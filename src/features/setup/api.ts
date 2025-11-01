import { apiClient } from "@/lib/api/apiClient";
import type {
  AllowedDatabases,
  AllowedEmailProviders,
  EmailConfig,
  TestDatabaseConnectionResponse,
  TestEmailResponse,
  CompleteSetupPayload,
  CompleteSetupResponse,
  SetupStatusResponse,
} from "./types";

export const setupApi = {
  getSetupStatus: async (): Promise<SetupStatusResponse> => {
    return apiClient.get<SetupStatusResponse>("/setup/status");
  },

  testDatabaseConnection: async (
    databaseType: AllowedDatabases,
    connectionString: string | null
  ): Promise<TestDatabaseConnectionResponse> => {
    return apiClient.post<TestDatabaseConnectionResponse>("/setup/test-database", {
      databaseType,
      connectionString,
    });
  },

  testEmailProvider: async (provider: AllowedEmailProviders, config: EmailConfig): Promise<TestEmailResponse> => {
    return apiClient.post<TestEmailResponse>("/setup/test-email", {
      provider,
      resendApiKey: config.apiKey || null,
      smtpHost: config.host || null,
      smtpPort: config.port ? Number(config.port) : null,
      smtpUsername: config.username || null,
      smtpPassword: config.password || null,
      smtpUseSsl: true,
      fromEmail: config.from,
      fromName: "AuthForge",
      testRecipient: config.to,
    });
  },

  completeSetup: async (payload: CompleteSetupPayload): Promise<CompleteSetupResponse> => {
    return apiClient.post<CompleteSetupResponse>("/setup/complete", payload);
  },
};
