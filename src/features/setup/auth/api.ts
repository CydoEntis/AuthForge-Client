import { apiClient } from "@/lib/api/apiClient";
import type {
  LoginAdminValues,
  LoginAdminResponse,
  ForgotPasswordAdminValues,
  ForgotPasswordAdminResponse,
} from "./types";

export const authApi = {
  loginAdmin: async (values: LoginAdminValues): Promise<LoginAdminResponse> => {
    return apiClient.post<LoginAdminResponse>("/admin/login", values);
  },

  forgotPasswordAdmin: async (values: ForgotPasswordAdminValues): Promise<ForgotPasswordAdminResponse> => {
    return apiClient.post<ForgotPasswordAdminResponse>("/admin/forgot-password", values);
  },

  logoutAdmin: async (): Promise<void> => {
    return apiClient.post<void>("/admin/logout");
  },
};
