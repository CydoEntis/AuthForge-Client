import { apiClient } from "@/lib/api/apiClient";
import type { UpdateDomainRequest, UpdateEmailProviderRequest, SettingsResponse } from "./settings.types";
import { settingsResponseSchema } from "./settings.schema";

const prefix = "/settings";

export const settingsApi = {
  getSettings: async (): Promise<SettingsResponse> => {
    const data = await apiClient.get<SettingsResponse>(`${prefix}`);
    return settingsResponseSchema.parse(data);
  },

  updateDomain: async (request: UpdateDomainRequest): Promise<void> => {
    await apiClient.put<void>(`${prefix}/domain`, request);
  },

  updateEmailProvider: async (request: UpdateEmailProviderRequest): Promise<void> => {
    await apiClient.put<void>(`${prefix}/email-provider`, request);
  },

  regenerateJwtSecret: async (): Promise<void> => {
    await apiClient.post<void>(`${prefix}/jwt/regenerate`);
  },
};
