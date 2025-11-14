import { apiClient } from "@/lib/api/apiClient";
import type {
  AdminLoginResponse,
  AdminForgotPasswordResponse,
  AdminRefreshTokenResponse,
  AdminForgotPasswordRequest,
  AdminLoginRequest,
  AdminChangePasswordRequest,
} from "./admin.types";

export const adminApi = {
  login: async (values: AdminLoginRequest): Promise<AdminLoginResponse> => {
    return apiClient.post<AdminLoginResponse>("/admin/login", values);
  },

  forgotPassword: async (values: AdminForgotPasswordRequest): Promise<AdminForgotPasswordResponse> => {
    return apiClient.post<AdminForgotPasswordResponse>("/admin/forgot-password", values);
  },

  changePassword: async (values: AdminChangePasswordRequest): Promise<AdminForgotPasswordResponse> => {
    return apiClient.post<AdminForgotPasswordResponse>("/admin/change-password", values);
  },

  refreshToken: async (refreshToken: string): Promise<AdminRefreshTokenResponse> => {
    return apiClient.post<AdminRefreshTokenResponse>("/admin/refresh", { refreshToken });
  },

  logout: async (refreshToken: string): Promise<void> => {
    return apiClient.post<void>("/admin/logout", { refreshToken });
  },
};
