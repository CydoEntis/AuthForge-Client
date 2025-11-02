import type z from "zod";
import type { postgresSchema, smtpSchema, resendSchema, setupAdminSchema } from "./schemas";

export const SETUP_WIZARD_STEPS = {
  WELCOME: "welcome",
  SELECT_DB: "selectDatabase",
  SELECT_EMAIL: "selectEmailProvider",
  CREATE_ADMIN: "createAdmin",
  DONE: "done",
} as const;

export type SetupWizardStep = (typeof SETUP_WIZARD_STEPS)[keyof typeof SETUP_WIZARD_STEPS];

export const DATABASES = {
  SQLITE: "Sqlite",
  POSTGRESQL: "PostgreSql",
} as const;

export type AllowedDatabases = (typeof DATABASES)[keyof typeof DATABASES];

export const EMAIL_PROVIDERS = {
  SMTP: "Smtp",
  RESEND: "Resend",
} as const;

export type AllowedEmailProviders = (typeof EMAIL_PROVIDERS)[keyof typeof EMAIL_PROVIDERS];

export type PostgresConfig = z.infer<typeof postgresSchema>;
export type SmtpConfig = z.infer<typeof smtpSchema>;
export type ResendConfig = z.infer<typeof resendSchema>;

export type EmailConfig = {
  host?: string;
  port?: string;
  username?: string;
  password?: string;
  apiKey?: string;
  from: string;
  to: string;
};

export type AdminConfig = z.infer<typeof setupAdminSchema>;

export type CompleteSetupPayload = {
  databaseType: string;
  connectionString: string | null;
  emailProvider: string;
  resendApiKey: string | null;
  smtpHost: string | null;
  smtpPort: number | null;
  smtpUsername: string | null;
  smtpPassword: string | null;
  smtpUseSsl: boolean | null;
  fromEmail: string;
  fromName: string;
  adminEmail: string;
  adminPassword: string;
};

export type TestDatabaseConnectionResponse = {
  isSuccessful: boolean;
  message: string;
};

export type TestEmailResponse = {
  isSuccessful: boolean;
  message: string;
};

export type CompleteSetupResponse = {
  message: string;
};

export type SetupStatusResponse = {
  isComplete: boolean;
};
