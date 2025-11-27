import z from "zod";
import { emailProviderConfigSchema } from "../email/email.schemas";

export const adminLoginRequestSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, "Password is required"),
});

export const adminForgotPasswordRequestSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
});

export const adminResetPasswordRequestSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[\W_]/, { message: "Password must contain at least one special character." }),
    confirmNewPassword: z.string().min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export const adminChangePasswordRequestSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[\W_]/, { message: "Password must contain at least one special character." }),
    confirmNewPassword: z.string().min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export const adminUpdateEmailSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
});

export const adminUpdateDomainSchema = z.object({
  domain: z.url("Must be a valid URL"),
});

export const adminUpdateEmailProviderRequestSchema = z.object({
  emailProviderConfig: emailProviderConfigSchema,
});

export const tokenPairSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  accessTokenExpiresAt: z.string(),
  refreshTokenExpiresAt: z.string(),
});

export const adminLoginResponseSchema = z.object({
  tokens: tokenPairSchema,
});

export const adminVerifyPasswordResetTokenResponseSchema = z.object({
  isValid: z.boolean(),
  message: z.string().optional(),
});

export const adminForgotPasswordResponseSchema = z.object({
  message: z.string(),
});

export const adminRefreshTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.string(),
});

export const adminRevokeAllSessionsResponseSchema = z.object({
  message: z.string(),
  sessionsRevoked: z.number(),
});

export const getAdminResponseSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  createdAtUtc: z.string(),
  updatedAtUtc: z.string().nullable(),
});

export const adminSettingsResponseSchema = z.object({
  email: z.email(),
  authForgeDomain: z.string(),
  emailProvider: emailProviderConfigSchema,
});
