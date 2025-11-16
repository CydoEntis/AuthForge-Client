import z from "zod";

export const adminLoginSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
});

export const adminForgotPasswordSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
});

export const adminVerifyResetPasswordToken = z.object({
  token: z.string().min(1, { message: "Please provide a valid token." }),
});

export const adminResetPasswordSchema = z
  .object({
    token: z.string().min(1, { message: "Please provide a token." }),
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

export const adminChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Password cannot be empty" }),
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
  authForgeDomain: z
    .url("Please enter a valid URL starting with http:// or https://")
    .refine((url) => url.startsWith("http://") || url.startsWith("https://"), {
      message: "URL must start with http:// or https://",
    }),
});

export const adminTestEmailProviderRequest = z.object({
  fromEmail: z.email({ message: "From email must be valid" }),
  fromName: z.string().default("AuthForge"),
  testRecipient: z.email({ message: "Test recipient must be valid" }),
  smtpHost: z.string().optional(),
  smtpPort: z
    .string()
    .min(1, "Port is required.")
    .refine((val) => /^\d+$/.test(val) && Number(val) > 0 && Number(val) <= 65535, "Port must be between 1 and 65535."),
  smtpUsername: z.string().optional(),
  smtpPassword: z.string().optional(),
  useSsl: z.boolean().optional().default(true),
  resendApiKey: z.string().optional(),
});
