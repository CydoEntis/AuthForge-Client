import z from "zod";

export const setupAdminSchema = z
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

export const postgresSchema = z.object({
  host: z
    .string()
    .min(1, "Host is required.")
    .refine(
      (val) => /^([a-zA-Z0-9.-]+|\d{1,3}(\.\d{1,3}){3})$/.test(val),
      "Host must be a valid hostname or IP address (e.g. localhost or 192.168.1.10)."
    ),
  port: z
    .string()
    .min(1, "Port is required.")
    .refine(
      (val) => /^\d+$/.test(val) && Number(val) > 0 && Number(val) <= 65535,
      "Port must be a number between 1 and 65535."
    ),
  user: z.string().min(1, "Database user is required."),
  password: z.string().min(1, "Password is required.").max(128, "Password is too long."),
  database: z
    .string()
    .min(1, "Database name is required.")
    .regex(/^[a-zA-Z0-9_-]+$/, "Database name can only contain letters, numbers, underscores, or hyphens."),
});

export const smtpSchema = z.object({
  host: z.string().min(1, { message: "SMTP host is required" }),
  port: z
    .string()
    .min(1, { message: "SMTP port is required" })
    .refine((val) => !isNaN(Number(val)), { message: "Port must be a number" }),
  username: z.string().min(1, { message: "SMTP username is required" }),
  password: z.string().min(1, { message: "SMTP password is required" }),
  from: z.email({ message: "From email must be valid" }),
  to: z.email({ message: "To email must be valid" }),
});

export const resendSchema = z.object({
  apiKey: z.string().min(1, { message: "Resend API key is required" }),
  from: z.email({ message: "From email must be valid" }),
  to: z.email({ message: "To email must be valid" }),
});
