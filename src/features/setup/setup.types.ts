import type z from "zod";
import type { postgresSchema, smtpSchema, resendSchema, setupAdminSchema } from "./setup.schemas";
import type { DATABASES, EMAIL_PROVIDERS, SETUP_WIZARD_STEPS } from "./setup.constants";

// ======================
//        Setup
// ======================
export type SetupWizardStep = (typeof SETUP_WIZARD_STEPS)[keyof typeof SETUP_WIZARD_STEPS];

export type SetupStatusResponse = {
  isSetupComplete: boolean;
  message: string;
};

export type CompleteSetupRequest = {
  databaseType: AllowedDatabases;
  connectionString: string | null;
  emailProvider: AllowedEmailProviders;
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

export type CompleteSetupResponse = {
  databaseType: AllowedDatabases;
  connectionString: string;
  emailProviderCofing: EmailProviderConfig;
  adminCredentials: AdminCredentials;
};

// ======================
//        Database
// ======================
export type AllowedDatabases = (typeof DATABASES)[keyof typeof DATABASES];

export type PostgresConfig = z.infer<typeof postgresSchema>;

export type TestDatabaseConnectionRequest = {
  databaseType: AllowedDatabases;
  connectionString: string | null;
};

export type TestDatabaseConnectionResponse = {
  isSuccessful: boolean;
  message: string;
};

// ======================
//        Email
// ======================
export type SmtpConfig = z.infer<typeof smtpSchema>;
export type ResendConfig = z.infer<typeof resendSchema>;

export type AllowedEmailProviders = (typeof EMAIL_PROVIDERS)[keyof typeof EMAIL_PROVIDERS];

export type EmailProviderConfig = {
  emailProvider: AllowedEmailProviders;
  resendingApiKey?: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUsername?: string;
  smtpPassword?: string;
  fromEmail?: string;
  fromName?: string;
  useSsl: boolean;
};

export type TestEmailConfigRequest = {
  emailProviderConfig: EmailProviderConfig;
  testRecipient: string;
};

export type TestEmailResponse = {
  isSuccessful: boolean;
  message: string;
};

// ======================
//      Admin Account
// ======================
export type AdminConfig = z.infer<typeof setupAdminSchema>;

export type AdminCredentials = {
  email: string;
  password: string;
};
