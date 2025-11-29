import { apiClient } from "@/lib/api/apiClient";

import type {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  ResetPasswordRequest,
  VerifyPasswordResetTokenResponse,
} from "./auth.types";
import {
  forgotPasswordResponseSchema,
  loginResponseSchema,
  refreshTokenResponseSchema,
  verifyPasswordResetTokenResponseSchema,
} from "./auth.schemas";

const prefix = "/auth";

export const authApi = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    const data = await apiClient.post<LoginResponse>(`${prefix}/login`, request);
    return loginResponseSchema.parse(data);
  },

  forgotPassword: async (request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    const data = await apiClient.post<ForgotPasswordResponse>(`${prefix}/forgot-password`, request);
    return forgotPasswordResponseSchema.parse(data);
  },

  verifyPasswordResetToken: async (token: string): Promise<VerifyPasswordResetTokenResponse> => {
    const data = await apiClient.post<VerifyPasswordResetTokenResponse>(`${prefix}/verify-password-reset-token`, {
      token,
    });
    return verifyPasswordResetTokenResponseSchema.parse(data);
  },

  resetPassword: async (request: ResetPasswordRequest): Promise<void> => {
    await apiClient.post<void>(`${prefix}/reset-password`, request);
  },

  changePassword: async (request: ChangePasswordRequest): Promise<ForgotPasswordResponse> => {
    const data = await apiClient.post<ForgotPasswordResponse>(`${prefix}/change-password`, request);
    return forgotPasswordResponseSchema.parse(data);
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const data = await apiClient.post<RefreshTokenResponse>(`${prefix}/refresh`, { refreshToken });
    return refreshTokenResponseSchema.parse(data);
  },

  logout: async (refreshToken: string): Promise<void> => {
    await apiClient.post<void>(`${prefix}/logout`, { refreshToken });
  },
};
