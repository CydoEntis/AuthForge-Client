import type z from "zod";
import type { postgresSchema, smtpSchema, resendSchema } from "./schemas";

export const SETUP_WIZARD_STEPS = {
  WELCOME: "welcome",
  SELECT_DB: "selectDatabase",
  SELECT_EMAIL: "selectEmailProvider",
  CONFIGURE_EMAIL: "configureEmail",
  DONE: "done",
} as const;

export type SetupWizardStep = (typeof SETUP_WIZARD_STEPS)[keyof typeof SETUP_WIZARD_STEPS];

export const DATABASES = {
  SQLITE: "SQLite",
  POSTGRESQL: "PostgreSQL",
} as const;

export type AllowedDatabases = (typeof DATABASES)[keyof typeof DATABASES];

export const EMAIL_PROVIDERS = {
  SMTP: "SMTP",
  RESEND: "Resend",
} as const;

export type AllowedEmailProviders = (typeof EMAIL_PROVIDERS)[keyof typeof EMAIL_PROVIDERS];

export type PostgresConfig = z.infer<typeof postgresSchema>;
export type SmtpConfig = z.infer<typeof smtpSchema>;
export type ResendConfig = z.infer<typeof resendSchema>;
export type EmailConfig = SmtpConfig | ResendConfig;

export type TestDatabaseConnectionResponse = {
  isSuccessful: boolean;
  message: string;
};

export type TestEmailResponse = {
  isSuccessful: boolean;
  message: string;
};
