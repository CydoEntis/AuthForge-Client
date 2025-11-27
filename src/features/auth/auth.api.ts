import { apiClient } from "@/lib/api/apiClient";
import {
  adminForgotPasswordResponseSchema,
  adminLoginResponseSchema,
  adminRefreshTokenResponseSchema,
  adminVerifyPasswordResetTokenResponseSchema,
} from "../admin/admin.schemas";
import type {
  AdminChangePasswordRequest,
  AdminForgotPasswordRequest,
  AdminForgotPasswordResponse,
  AdminLoginRequest,
  AdminLoginResponse,
  AdminRefreshTokenResponse,
  AdminResetPasswordRequest,
  AdminVerifyPasswordResetTokenResponse,
} from "../admin/admin.types";

export const authApi = {
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
};
