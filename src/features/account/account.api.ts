import { apiClient } from "@/lib/api/apiClient";
import { getAccountResponseSchema } from "./account.schemas";
import type { UpdateEmailRequest, GetAccountResponse } from "./account.types";
import type { ChangePasswordRequest, ForgotPasswordResponse } from "../auth/auth.types";
import type { RevokeAllSessionsResponse } from "../settings/settings.types";
import { revokeAllSessionsResponseSchema } from "../settings/settings.schema";

const prefix = "/account";

export const accountApi = {
  getAccount: async (): Promise<GetAccountResponse> => {
    const data = await apiClient.get<GetAccountResponse>(`${prefix}/me`);
    return getAccountResponseSchema.parse(data);
  },

  updateEmail: async (request: UpdateEmailRequest): Promise<void> => {
    await apiClient.put<void>(`${prefix}/email`, request);
  },

  changePassword: async (request: ChangePasswordRequest): Promise<ForgotPasswordResponse> => {
    const data = await apiClient.post<ForgotPasswordResponse>(`${prefix}/change-password`, request);
    return data;
  },

  revokeAllSessions: async (): Promise<RevokeAllSessionsResponse> => {
    const data = await apiClient.post<RevokeAllSessionsResponse>(`${prefix}/sessions/revoke-all`);
    return revokeAllSessionsResponseSchema.parse(data);
  },
};
