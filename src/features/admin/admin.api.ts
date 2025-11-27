import { apiClient } from "@/lib/api/apiClient";
import {
  adminLoginResponseSchema,
  adminForgotPasswordResponseSchema,
  adminVerifyPasswordResetTokenResponseSchema,
  adminRefreshTokenResponseSchema,
  adminRevokeAllSessionsResponseSchema,
  getAdminResponseSchema,
  adminSettingsResponseSchema,
} from "./admin.schemas";
import type {
  AdminLoginResponse,
  AdminForgotPasswordResponse,
  AdminRefreshTokenResponse,
  AdminForgotPasswordRequest,
  AdminLoginRequest,
  AdminChangePasswordRequest,
  AdminResetPasswordRequest,
  AdminVerifyPasswordResetTokenResponse,
  AdminUpdateEmailRequest,
  AdminUpdateDomainRequest,
  AdminUpdateEmailProviderRequest,
  AdminRevokeAllSessionsResponse,
  GetAdminResponse,
  AdminSettingsResponse,
} from "./admin.types";

export const adminApi = {
  login: async (request: AdminLoginRequest): Promise<AdminLoginResponse> => {
    const data = await apiClient.post<AdminLoginResponse>("/admin/login", request);
    return adminLoginResponseSchema.parse(data);
  },

  forgotPassword: async (request: AdminForgotPasswordRequest): Promise<AdminForgotPasswordResponse> => {
    const data = await apiClient.post<AdminForgotPasswordResponse>("/admin/forgot-password", request);
    return adminForgotPasswordResponseSchema.parse(data);
  },

  verifyPasswordResetToken: async (token: string): Promise<AdminVerifyPasswordResetTokenResponse> => {
    const data = await apiClient.post<AdminVerifyPasswordResetTokenResponse>("/admin/verify-password-reset-token", {
      token,
    });
    return adminVerifyPasswordResetTokenResponseSchema.parse(data);
  },

  resetPassword: async (request: AdminResetPasswordRequest): Promise<void> => {
    await apiClient.post<void>("/admin/reset-password", request);
  },

  changePassword: async (request: AdminChangePasswordRequest): Promise<AdminForgotPasswordResponse> => {
    const data = await apiClient.post<AdminForgotPasswordResponse>("/admin/change-password", request);
    return adminForgotPasswordResponseSchema.parse(data);
  },

  refreshToken: async (refreshToken: string): Promise<AdminRefreshTokenResponse> => {
    const data = await apiClient.post<AdminRefreshTokenResponse>("/admin/refresh", { refreshToken });
    return adminRefreshTokenResponseSchema.parse(data);
  },

  logout: async (refreshToken: string): Promise<void> => {
    await apiClient.post<void>("/admin/logout", { refreshToken });
  },

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
