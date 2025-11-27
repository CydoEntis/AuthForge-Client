import { apiClient } from "@/lib/api/apiClient";
import type {
  TestDatabaseConnectionResponse,
  SetupStatusResponse,
  CompleteSetupRequest,
  CompleteSetupResponse,
  TestDatabaseConnectionRequest,
} from "./setup.types";

export const setupApi = {
  getSetupStatus: async (): Promise<SetupStatusResponse> => {
    return apiClient.get<SetupStatusResponse>("/setup/status");
  },

  testDatabaseConnection: async (request: TestDatabaseConnectionRequest): Promise<TestDatabaseConnectionResponse> => {
    return apiClient.post<TestDatabaseConnectionResponse>("/setup/test-database", request);
  },

  completeSetup: async (request: CompleteSetupRequest): Promise<CompleteSetupResponse> => {
    return apiClient.post<CompleteSetupResponse>("/setup/complete", request);
  },
};
