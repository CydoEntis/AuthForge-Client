import { apiClient } from "@/lib/api/apiClient";
import { testEmailConfigResponseSchema } from "./email.schemas";
import type { TestEmailConfigRequest, TestEmailConfigResponse } from "./email.types";

export const emailApi = {
  test: async (request: TestEmailConfigRequest): Promise<TestEmailConfigResponse> => {
    const data = await apiClient.post<TestEmailConfigResponse>("/email/test", request);
    return testEmailConfigResponseSchema.parse(data);
  },
};
