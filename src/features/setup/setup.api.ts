import { apiClient } from "@/lib/api/apiClient";
import {
  setupStatusResponseSchema,
  testDatabaseConnectionResponseSchema,
  completeSetupResponseSchema,
} from "./setup.schemas";
import type {
  TestDatabaseConnectionResponse,
  SetupStatusResponse,
  CompleteSetupRequest,
  CompleteSetupResponse,
  TestDatabaseConnectionRequest,
} from "./setup.types";

const prefix = "/setup";

export const setupApi = {
  getSetupStatus: async (): Promise<SetupStatusResponse> => {
    const data = await apiClient.get<SetupStatusResponse>(`${prefix}/status`);
    return setupStatusResponseSchema.parse(data);
  },

  testDatabaseConnection: async (request: TestDatabaseConnectionRequest): Promise<TestDatabaseConnectionResponse> => {
    const data = await apiClient.post<TestDatabaseConnectionResponse>(`${prefix}/test-database`, request);
    return testDatabaseConnectionResponseSchema.parse(data);
  },

  completeSetup: async (request: CompleteSetupRequest): Promise<CompleteSetupResponse> => {
    const data = await apiClient.post<CompleteSetupResponse>(`${prefix}/complete`, request);
    return completeSetupResponseSchema.parse(data);
  },
};
