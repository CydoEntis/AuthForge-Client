import { apiClient } from "@/lib/api/apiClient";
import { getAccountResponseSchema } from "./account.schemas";
import type { UpdateEmailRequest, GetAccountResponse } from "./account.types";
import type { ChangePasswordRequest, ForgotPasswordResponse } from "../auth/auth.types";

export const accountApi = {
  getAccount: async (): Promise<GetAccountResponse> => {
    const data = await apiClient.get<GetAccountResponse>("/admin/me");
    return getAccountResponseSchema.parse(data);
  },

  updateEmail: async (request: UpdateEmailRequest): Promise<void> => {
    await apiClient.put<void>("/admin/email", request);
  },

  changePassword: async (request: ChangePasswordRequest): Promise<ForgotPasswordResponse> => {
    const data = await apiClient.post<ForgotPasswordResponse>("/admin/change-password", request);
    return data;
  },
};
