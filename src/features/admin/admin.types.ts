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

export interface AdminVerifyPasswordResetTokenResponse {
  isValid: boolean;
  message?: string;
}

export type AdminForgotPasswordResponse = {
  message: string;
};

export interface AdminRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}
