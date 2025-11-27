import type { z } from "zod";
import type {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  loginResponseSchema,
  forgotPasswordResponseSchema,
  verifyPasswordResetTokenResponseSchema,
  refreshTokenResponseSchema,
  tokenPairSchema,
} from "./auth.schemas";

export type LoginRequest = z.infer<typeof loginSchema>;
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>;

export type TokenPair = z.infer<typeof tokenPairSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type ForgotPasswordResponse = z.infer<typeof forgotPasswordResponseSchema>;
export type VerifyPasswordResetTokenResponse = z.infer<typeof verifyPasswordResetTokenResponseSchema>;
export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;
