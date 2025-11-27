import { apiClient } from "@/lib/api/apiClient";
import type { TestEmailConfigRequest, TestEmailConfigResponse } from "./email.types";

export const emailApi = {
  test: async (request: TestEmailConfigRequest): Promise<TestEmailConfigResponse> => {
    return apiClient.post<TestEmailConfigResponse>("/email/test", request);
  },
};
