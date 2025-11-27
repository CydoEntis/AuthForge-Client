import z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
});

export const resetPasswordSchema = z
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

export const changePasswordSchema = z
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

export const tokenPairSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  accessTokenExpiresAt: z.string(),
  refreshTokenExpiresAt: z.string(),
});

export const loginResponseSchema = z.object({
  tokens: tokenPairSchema,
});

export const forgotPasswordResponseSchema = z.object({
  message: z.string(),
});

export const verifyPasswordResetTokenResponseSchema = z.object({
  isValid: z.boolean(),
  message: z.string().optional(),
});

export const refreshTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.string(),
});
