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
  host: z.string().min(1),
  port: z.string().min(1),
  user: z.string().min(1),
  password: z.string().min(1),
  database: z.string().min(1),
});

export const smtpSchema = z.object({
  host: z.string().min(1),
  port: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
});

export const resendSchema = z.object({
  apiKey: z.string().min(1),
});
