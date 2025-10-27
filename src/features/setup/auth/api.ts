import { apiClient } from "@/lib/api/apiClient";
import type { ApiResponse } from "@/lib/api/types";
import type {
  LoginAdminValues,
  LoginAdminResponse,
  RegisterAdminValues,
  ForgotPasswordAdminValues,
  ForgotPasswordAdminResponse,
  SetupStatusResponse,
} from "./types";

export const authApi = {
  getSetupStatus: async (): Promise<SetupStatusResponse> => {
    const res = await apiClient.get<ApiResponse<SetupStatusResponse>>("/admin/setup/status");

    if (!res.success || !res.data) {
      throw new Error("Failed to get setup status");
    }

    return res.data;
  },

  registerAdmin: async (values: RegisterAdminValues) => {
    const res = await apiClient.post<ApiResponse<{}>>("/admin/register", values);
    if (!res.success) throw new Error(res.error?.message);
    return res.data;
  },

  loginAdmin: async (values: LoginAdminValues): Promise<LoginAdminResponse> => {
    const res = await apiClient.post<ApiResponse<LoginAdminResponse>>("/admin/login", values);
    if (!res.success) throw new Error(res.error?.message);

    if (!res.data) {
      throw new Error("Login response is missing data");
    }

    return res.data;
  },

  forgotPasswordAdmin: async (values: ForgotPasswordAdminValues): Promise<ForgotPasswordAdminResponse> => {
    const res = await apiClient.post<ApiResponse<ForgotPasswordAdminResponse>>("/admin/forgot-password", values);
    if (!res.success) throw new Error(res.error?.message);

    if (!res.data) {
      throw new Error("Forgot password response is missing data");
    }

    return res.data;
  },

  // Todo Add Reset Password
  // Todo Add Change Password
  // Todo Add Refresh Token
};
