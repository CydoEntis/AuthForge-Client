import { z } from "zod";
import type { TokenPair } from "@/lib/api/types";
import type {
  adminChangePasswordSchema,
  adminForgotPasswordSchema,
  adminLoginSchema,
  adminResetPasswordSchema,
} from "./admin.schemas";

export type AdminLoginRequest = z.infer<typeof adminLoginSchema>;
export type AdminForgotPasswordRequest = z.infer<typeof adminForgotPasswordSchema>;
export type AdminChangePasswordRequest = z.infer<typeof adminChangePasswordSchema>;
export type AdminResetPasswordRequest = z.infer<typeof adminResetPasswordSchema>;

export type AdminLoginResponse = {
  tokens: TokenPair;
};

export type AdminForgotPasswordResponse = {
  message: string;
};

export interface AdminRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}
