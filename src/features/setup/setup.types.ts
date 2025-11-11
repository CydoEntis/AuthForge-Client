import type z from "zod";
import type { smtpFormSchema, resendFormSchema, adminCredentialsSchema, databaseConfigSchema } from "./setup.schemas";
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
  fromEmail: string;
  fromName?: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUsername?: string;
  smtpPassword?: string;
  useSsl?: boolean;
  resendApiKey?: string;
  adminEmail: string;
  adminPassword: string;
};

export type CompleteSetupResponse = {
  databaseType: AllowedDatabases;
  connectionString: string;
  emailProviderConfig: EmailConfig;
  adminCredentials: AdminCredentials;
};

// ======================
//        Database
// ======================
export type AllowedDatabases = (typeof DATABASES)[keyof typeof DATABASES];
export type DatabaseConfig = z.infer<typeof databaseConfigSchema>;

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
export type AllowedEmailProviders = (typeof EMAIL_PROVIDERS)[keyof typeof EMAIL_PROVIDERS];

export type SmtpFormValues = z.infer<typeof smtpFormSchema>;
export type ResendFormValues = z.infer<typeof resendFormSchema>;

export type TestEmailConfigRequest = {
  fromEmail: string;
  fromName?: string;
  testRecipient: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUsername?: string;
  smtpPassword?: string;
  useSsl?: boolean;
  resendApiKey?: string;
};

export type TestEmailResponse = {
  isSuccessful: boolean;
  message: string;
};

export type SmtpConfig = {
  fromEmail: string;
  fromName?: string;
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  useSsl: boolean;
};

export type ResendConfig = {
  fromEmail: string;
  fromName?: string;
  resendApiKey: string;
};

export type EmailConfig = SmtpConfig | ResendConfig;

// ======================
//      Admin Account
// ======================
export type AdminCredentials = z.infer<typeof adminCredentialsSchema>;
