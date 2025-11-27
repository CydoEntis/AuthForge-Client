import type { z } from "zod";
import type {
  adminLoginRequestSchema,
  adminForgotPasswordRequestSchema,
  adminResetPasswordRequestSchema,
  adminChangePasswordRequestSchema,
  adminUpdateEmailSchema,
  adminUpdateDomainSchema,
  adminUpdateEmailProviderRequestSchema,
  adminLoginResponseSchema,
  adminVerifyPasswordResetTokenResponseSchema,
  adminForgotPasswordResponseSchema,
  adminRefreshTokenResponseSchema,
  adminRevokeAllSessionsResponseSchema,
  getAdminResponseSchema,
  adminSettingsResponseSchema,
} from "./admin.schemas";

export type AdminLoginRequest = z.infer<typeof adminLoginRequestSchema>;
export type AdminForgotPasswordRequest = z.infer<typeof adminForgotPasswordRequestSchema>;
export type AdminResetPasswordRequest = z.infer<typeof adminResetPasswordRequestSchema>;
export type AdminChangePasswordRequest = z.infer<typeof adminChangePasswordRequestSchema>;
export type AdminUpdateEmailRequest = z.infer<typeof adminUpdateEmailSchema>;
export type AdminUpdateDomainRequest = z.infer<typeof adminUpdateDomainSchema>;
export type AdminUpdateEmailProviderRequest = z.infer<typeof adminUpdateEmailProviderRequestSchema>;

export type AdminLoginResponse = z.infer<typeof adminLoginResponseSchema>;
export type AdminVerifyPasswordResetTokenResponse = z.infer<typeof adminVerifyPasswordResetTokenResponseSchema>;
export type AdminForgotPasswordResponse = z.infer<typeof adminForgotPasswordResponseSchema>;
export type AdminRefreshTokenResponse = z.infer<typeof adminRefreshTokenResponseSchema>;
export type AdminRevokeAllSessionsResponse = z.infer<typeof adminRevokeAllSessionsResponseSchema>;
export type GetAdminResponse = z.infer<typeof getAdminResponseSchema>;
export type AdminSettingsResponse = z.infer<typeof adminSettingsResponseSchema>;
