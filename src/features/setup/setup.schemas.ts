import z from "zod";

// ======================
//        Database
// ======================
export const domainSchema = z.object({
  authForgeDomain: z
    .url("Please enter a valid URL starting with http:// or https://")
    .refine((url) => url.startsWith("http://") || url.startsWith("https://"), {
      message: "URL must start with http:// or https://",
    }),
});

export const databaseConfigSchema = z.object({
  host: z
    .string()
    .min(1, "Host is required.")
    .refine(
      (val) => /^([a-zA-Z0-9.-]+|\d{1,3}(\.\d{1,3}){3})$/.test(val),
      "Host must be a valid hostname or IP address."
    ),
  port: z
    .string()
    .min(1, "Port is required.")
    .refine((val) => /^\d+$/.test(val) && Number(val) > 0 && Number(val) <= 65535, "Port must be between 1 and 65535."),
  user: z.string().min(1, "Database user is required."),
  password: z.string().min(1, "Password is required.").max(128, "Password is too long."),
  database: z
    .string()
    .min(1, "Database name is required.")
    .regex(/^[a-zA-Z0-9_-]+$/, "Database name can only contain letters, numbers, underscores, or hyphens."),
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
//      Admin Account
// ======================
export const adminCredentialsSchema = z
  .object({
    email: z.email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[\W_]/, { message: "Password must contain at least one special character." }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
