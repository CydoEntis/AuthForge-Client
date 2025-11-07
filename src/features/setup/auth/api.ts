import { apiClient } from "@/lib/api/apiClient";
import type {
  LoginAdminValues,
  LoginAdminResponse,
  ForgotPasswordAdminValues,
  ForgotPasswordAdminResponse,
  RefreshTokenResponse,
} from "./types";

export const authApi = {
  loginAdmin: async (values: LoginAdminValues): Promise<LoginAdminResponse> => {
    return apiClient.post<LoginAdminResponse>("/admin/login", values);
  },

  forgotPasswordAdmin: async (values: ForgotPasswordAdminValues): Promise<ForgotPasswordAdminResponse> => {
    return apiClient.post<ForgotPasswordAdminResponse>("/admin/forgot-password", values);
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    return apiClient.post<RefreshTokenResponse>("/admin/refresh", { refreshToken });
  },

  logoutAdmin: async (refreshToken: string): Promise<void> => {
    return apiClient.post<void>("/admin/logout", { refreshToken });
  },
};
