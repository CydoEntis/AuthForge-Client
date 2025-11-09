import { apiClient } from "@/lib/api/apiClient";
import type {
  TestDatabaseConnectionResponse,
  TestEmailResponse,
  SetupStatusResponse,
  CompleteSetupRequest,
  CompleteSetupResponse,
  TestEmailConfigRequest,
  TestDatabaseConnectionRequest,
} from "./setup.types";

export const setupApi = {
  getSetupStatus: async (): Promise<SetupStatusResponse> => {
    return apiClient.get<SetupStatusResponse>("/setup/status");
  },

  testDatabaseConnection: async (request: TestDatabaseConnectionRequest): Promise<TestDatabaseConnectionResponse> => {
    return apiClient.post<TestDatabaseConnectionResponse>("/setup/test-database", request);
  },

  testEmailProvider: async (request: TestEmailConfigRequest): Promise<TestEmailResponse> => {
    return apiClient.post<TestEmailResponse>("/setup/test-email", request);
  },

  completeSetup: async (request: CompleteSetupRequest): Promise<CompleteSetupResponse> => {
    return apiClient.post<CompleteSetupResponse>("/setup/complete", request);
  },
};
