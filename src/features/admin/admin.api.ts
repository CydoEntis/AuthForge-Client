import { apiClient } from "@/lib/api/apiClient";
import type {
  AdminLoginResponse,
  AdminForgotPasswordResponse,
  AdminRefreshTokenResponse,
  AdminForgotPasswordRequest,
  AdminLoginRequest,
  AdminChangePasswordRequest,
  AdminResetPasswordRequest,
  AdminVerifyPasswordResetTokenResponse,
} from "./admin.types";

export const adminApi = {
  login: async (request: AdminLoginRequest): Promise<AdminLoginResponse> => {
    return apiClient.post<AdminLoginResponse>("/admin/login", request);
  },

  forgotPassword: async (request: AdminForgotPasswordRequest): Promise<AdminForgotPasswordResponse> => {
    return apiClient.post<AdminForgotPasswordResponse>("/admin/forgot-password", request);
  },

  verifyPasswordResetToken: async (token: string): Promise<AdminVerifyPasswordResetTokenResponse> => {
    return apiClient.post<AdminVerifyPasswordResetTokenResponse>("/admin/verify-password-reset-token", { token });
  },

  resetPassword: async (request: AdminResetPasswordRequest): Promise<void> => {
    return apiClient.post<void>("/admin/reset-password", request);
  },

  changePassword: async (request: AdminChangePasswordRequest): Promise<AdminForgotPasswordResponse> => {
    return apiClient.post<AdminForgotPasswordResponse>("/admin/change-password", request);
  },

  refreshToken: async (refreshToken: string): Promise<AdminRefreshTokenResponse> => {
    return apiClient.post<AdminRefreshTokenResponse>("/admin/refresh", { refreshToken });
  },

  logout: async (refreshToken: string): Promise<void> => {
    return apiClient.post<void>("/admin/logout", { refreshToken });
  },
};
