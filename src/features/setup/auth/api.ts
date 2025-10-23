import { apiClient } from "@/lib/api/apiClient";
import type { ApiResponse } from "@/lib/api/types";
import type { RegisterAdminValues } from "./types";

export const authApi = {
  registerAdmin: async (values: RegisterAdminValues) => {
    // TODO: Add proper return type for RegisteredAdminResponse
    const res = await apiClient.post<ApiResponse<{}>>("/setup/register-admin", values);
    if (!res.Success) throw new Error(res.Error?.Message);
    return res.Data;
  },

  // Todo Add Login

  // Todo Add Forgot Password

  // Todo Add Reset Password

  // Todo Add Change Password

  // Todo Add Refresh Token
};
