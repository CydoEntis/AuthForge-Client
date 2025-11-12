import { z } from "zod";
import type { forgotPasswordAdminSchema, loginAdminSchema } from "./schemas";
import type { TokenPair } from "@/lib/api/types";
import type { AdminDetails } from "@/types/types";

export type LoginAdminValues = z.infer<typeof loginAdminSchema>;
export type ForgotPasswordAdminValues = z.infer<typeof forgotPasswordAdminSchema>;

export type SetupStatusResponse = {
  isSetupRequired: boolean;
};

export type LoginAdminResponse = {
  tokens: TokenPair;
  admin: AdminDetails;
};

export type ForgotPasswordAdminResponse = {
  message: string;
};

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}
