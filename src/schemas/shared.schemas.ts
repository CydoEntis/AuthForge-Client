import z from "zod";

// ======================
//        Domain
// ======================
export const domainSchema = z.object({
  domain: z
    .url("Please enter a valid URL starting with http:// or https://")
    .refine((url) => url.startsWith("http://") || url.startsWith("https://"), {
      message: "URL must start with http:// or https://",
    }),
});

// ======================
//        Email
// ======================
export const emailProviderSchema = z.object({
  fromEmail: z.email({ message: "From email must be valid" }),
  fromName: z.string().default("AuthForge"),
  testRecipient: z.email({ message: "Test recipient must be valid" }),
  smtpHost: z.string().optional(),
  smtpPort: z
    .number("Port must be a number")
    .int("Port must be an integer")
    .min(1, "Port must be at least 1")
    .max(65535, "Port must be at most 65535")
    .optional(),
  smtpUsername: z.string().optional(),
  smtpPassword: z.string().optional(),
  useSsl: z.boolean().optional().default(true),
  resendApiKey: z.string().optional(),
});

// ======================
//        Auth
// ======================
export const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
});

export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
});

export const verifyResetPasswordTokenSchema = z.object({
  token: z.string().min(1, { message: "Please provide a valid token." }),
});

export const resetPasswordSchema = z
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

export const changePasswordSchema = z
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
