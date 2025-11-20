import { z } from "zod";
import type { TokenPair } from "@/lib/api/types";
import type {
  adminChangePasswordSchema,
  adminForgotPasswordSchema,
  adminLoginSchema,
  adminResetPasswordSchema,
  adminUpdateDomainSchema,
  adminUpdateEmailSchema,
} from "./admin.schemas";
import type { EmailProviderConfig } from "@/types/email.types";

export type AdminLoginRequest = z.infer<typeof adminLoginSchema>;
export type AdminForgotPasswordRequest = z.infer<typeof adminForgotPasswordSchema>;
export type AdminResetPasswordRequest = z.infer<typeof adminResetPasswordSchema>;
export type AdminChangePasswordRequest = z.infer<typeof adminChangePasswordSchema>;
export type AdminUpdateEmailRequest = z.infer<typeof adminUpdateEmailSchema>;
export type AdminUpdateDomainRequest = z.infer<typeof adminUpdateDomainSchema>;
export type AdminTestEmailProviderRequest = z.infer<typeof adminUpdateEmailSchema>;

export type AdminLoginResponse = {
  tokens: TokenPair;
};

export type AdminVerifyPasswordResetTokenResponse = {
  isValid: boolean;
  message?: string;
};

export type AdminForgotPasswordResponse = {
  message: string;
};

export type AdminRefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
};

export type AdminUpdateEmailProviderRequest = {
  emailProviderConfig: EmailProviderConfig;
};

export type TestEmailConfigResponse = {
  isSuccessful: boolean;
  message: string;
};

export type AdminRevokeAllSessionsResponse = {
  message: string;
  sessionsRevoked: number;
};

export type GetAdminResponse = {
  id: string;
  email: string;
  createdAtUtc: string;
  updatedAtUtc: string | null;
};

export type AdminDetails = GetAdminResponse;

export type AdminSettingsResponse = {
  email: string;
  authForgeDomain: string;
  emailProvider: EmailProviderConfig;
};
