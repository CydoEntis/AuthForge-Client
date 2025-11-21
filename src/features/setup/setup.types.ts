import type z from "zod";
import type { adminCredentialsSchema, databaseConfigSchema } from "./setup.schemas";
import type { DATABASES, SETUP_WIZARD_STEPS } from "./setup.constants";
import type { EmailProviderConfig } from "@/types/shared.types";

// ======================
//        Setup
// ======================
export type SetupWizardStep = (typeof SETUP_WIZARD_STEPS)[keyof typeof SETUP_WIZARD_STEPS];

export type SetupStatusResponse = {
  isSetupComplete: boolean;
  message: string;
};

export type CompleteSetupRequest = {
  authForgeDomain: string;
  databaseType: AllowedDatabases;
  connectionString: string | null;
  emailProviderConfig: EmailProviderConfig;
  adminCredentials: AdminCredentials;
};

export type CompleteSetupResponse = {
  message: string;
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
//      Admin Account
// ======================
export type AdminCredentials = z.infer<typeof adminCredentialsSchema>;
