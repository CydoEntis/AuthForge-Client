import z from "zod";
import { emailProviderConfigSchema } from "../email/email.schemas";
import { DATABASES } from "./setup.constants";

export const allowedDatabasesEnum = z.enum([DATABASES.SQLITE, DATABASES.POSTGRESQL, DATABASES.MYSQL, DATABASES.MSSQL]);

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

export const adminCredentialsSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address." }),
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

export const testDatabaseConnectionRequestSchema = z.object({
  databaseType: allowedDatabasesEnum,
  connectionString: z.string().nullable(),
});

export const completeSetupRequestSchema = z.object({
  authForgeDomain: z.string().url("Must be a valid URL"),
  databaseType: allowedDatabasesEnum,
  connectionString: z.string().nullable(),
  emailProviderConfig: emailProviderConfigSchema,
  adminCredentials: adminCredentialsSchema,
});

export const setupStatusResponseSchema = z.object({
  isSetupComplete: z.boolean(),
  message: z.string(),
});

export const testDatabaseConnectionResponseSchema = z.object({
  isSuccessful: z.boolean(),
  message: z.string(),
});

export const completeSetupResponseSchema = z.object({
  message: z.string(),
});
