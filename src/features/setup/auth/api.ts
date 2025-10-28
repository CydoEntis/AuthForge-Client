import { apiClient } from "@/lib/api/apiClient";
import type {
  LoginAdminValues,
  LoginAdminResponse,
  SetupAdminResponse,
  ForgotPasswordAdminValues,
  ForgotPasswordAdminResponse,
  SetupStatusResponse,
  SetupAdminValues,
} from "./types";

export const authApi = {
  getSetupStatus: async (): Promise<SetupStatusResponse> => {
    return apiClient.get<SetupStatusResponse>("/admin/setup/status");
  },

  setupAdmin: async (values: SetupAdminValues): Promise<SetupAdminResponse> => {
    return apiClient.post<SetupAdminResponse>("/admin/setup", values);
  },

  loginAdmin: async (values: LoginAdminValues): Promise<LoginAdminResponse> => {
    return apiClient.post<LoginAdminResponse>("/admin/login", values);
  },

  forgotPasswordAdmin: async (values: ForgotPasswordAdminValues): Promise<ForgotPasswordAdminResponse> => {
    return apiClient.post<ForgotPasswordAdminResponse>("/admin/forgot-password", values);
  },
};
