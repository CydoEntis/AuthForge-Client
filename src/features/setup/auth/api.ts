import { apiClient } from "@/lib/api/apiClient";
import type { ApiResponse } from "@/lib/api/types";
import type { LoginAdminValues, LoginAdminResponse, RegisterAdminValues, ForgotPasswordAdminValues } from "./types";

export const authApi = {
  registerAdmin: async (values: RegisterAdminValues) => {
    // TODO: Add proper return type for RegisteredAdminResponse
    const res = await apiClient.post<ApiResponse<{}>>("/admin/register", values);
    if (!res.Success) throw new Error(res.Error?.Message);
    return res.Data;
  },

  loginAdmin: async (values: LoginAdminValues) => {
    const res = await apiClient.post<ApiResponse<LoginAdminResponse>>("/admin/login", values);
    if (!res.Success) throw new Error(res.Error?.Message);
    return res.Data;
  },

  forgotPasswordAdmin: async (values: ForgotPasswordAdminValues) => {
    const res = await apiClient.post<ApiResponse<LoginAdminResponse>>("/admin/forgot-password", values);
    if (!res.Success) throw new Error(res.Error?.Message);
    return res.Data;
  },

  // Todo Add Reset Password

  // Todo Add Change Password

  // Todo Add Refresh Token
};
