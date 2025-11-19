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

export const adminTestEmailProviderRequest = z
  .object({
    emailProvider: z.enum(["Smtp", "Resend"]),
    fromEmail: z.email({ message: "From email must be valid" }),
    fromName: z.string().optional().default("AuthForge"),
    testRecipient: z.email({ message: "Test recipient must be valid" }),

    smtpHost: z.string().optional(),
    smtpPort: z.union([z.string(), z.number()]).optional(),
    smtpUsername: z.string().optional(),
    smtpPassword: z.string().optional(),
    useSsl: z.boolean().optional().default(true),

    resendApiKey: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.emailProvider === "Smtp") {
        return !!(data.smtpHost && data.smtpPort && data.smtpUsername && data.smtpPassword);
      }
      return true;
    },
    {
      message: "All SMTP fields are required when using SMTP",
      path: ["smtpHost"],
    }
  )
  .refine(
    (data) => {
      if (data.emailProvider === "Resend") {
        return !!data.resendApiKey;
      }
      return true;
    },
    {
      message: "Resend API key is required when using Resend",
      path: ["resendApiKey"],
    }
  );
