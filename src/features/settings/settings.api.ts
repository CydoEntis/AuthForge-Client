import { apiClient } from "@/lib/api/apiClient";
import type { UpdateDomainRequest, UpdateEmailProviderRequest, SettingsResponse } from "./settings.types";
import { settingsResponseSchema } from "./settings.schema";

export const settingsApi = {
  getSettings: async (): Promise<SettingsResponse> => {
    const data = await apiClient.get<SettingsResponse>("/admin/settings");
    return settingsResponseSchema.parse(data);
  },

  updateDomain: async (request: UpdateDomainRequest): Promise<void> => {
    await apiClient.put<void>("/admin/domain", request);
  },

  updateEmailProvider: async (request: UpdateEmailProviderRequest): Promise<void> => {
    await apiClient.put<void>("/admin/email-provider", request);
  },

  regenerateJwtSecret: async (): Promise<void> => {
    await apiClient.post<void>("/admin/jwt/regenerate");
  },
};
