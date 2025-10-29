export type SetupWizardStep = "welcome" | "selectDatabase" | "selectEmailProvider" | "configureEmail" | "done";

export type AllowedDatabases = "SQLite" | "PostgreSQL";

export type AllowedEmailProviders = "SMTP" | "Resend";

export type SmtpConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  fromAddress: string;
};

export type ResendConfig = {
  apiKey: string;
  fromAddress: string;
};

export type EmailConfig = SmtpConfig | ResendConfig;
