import { apiClient } from "@/lib/api/apiClient";
import {
  adminRevokeAllSessionsResponseSchema,
  getAdminResponseSchema,
  adminSettingsResponseSchema,
} from "./admin.schemas";
import type {
  AdminUpdateEmailRequest,
  AdminUpdateDomainRequest,
  AdminUpdateEmailProviderRequest,
  AdminRevokeAllSessionsResponse,
  GetAdminResponse,
  AdminSettingsResponse,
} from "./admin.types";

export const adminApi = {
  updateEmail: async (request: AdminUpdateEmailRequest): Promise<void> => {
    await apiClient.put<void>("/admin/email", request);
  },

  updateDomain: async (request: AdminUpdateDomainRequest): Promise<void> => {
    await apiClient.put<void>("/admin/domain", request);
  },

  updateEmailProvider: async (request: AdminUpdateEmailProviderRequest): Promise<void> => {
    await apiClient.put<void>("/admin/email-provider", request);
  },

  regenerateJwtSecret: async (): Promise<void> => {
    await apiClient.post<void>("/admin/jwt/regenerate");
  },

  revokeAllSessions: async (): Promise<AdminRevokeAllSessionsResponse> => {
    const data = await apiClient.post<AdminRevokeAllSessionsResponse>("/admin/sessions/revoke-all");
    return adminRevokeAllSessionsResponseSchema.parse(data);
  },

  getAdmin: async (): Promise<GetAdminResponse> => {
    const data = await apiClient.get<GetAdminResponse>("/admin/me");
    return getAdminResponseSchema.parse(data);
  },

  getSettings: async (): Promise<AdminSettingsResponse> => {
    const data = await apiClient.get<AdminSettingsResponse>("/admin/settings");
    return adminSettingsResponseSchema.parse(data);
  },
};
