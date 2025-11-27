import type { z } from "zod";
import type {
  adminCredentialsSchema,
  databaseConfigSchema,
  setupStatusResponseSchema,
  testDatabaseConnectionRequestSchema,
  testDatabaseConnectionResponseSchema,
  completeSetupRequestSchema,
  completeSetupResponseSchema,
  allowedDatabasesEnum,
} from "./setup.schemas";
import type { SETUP_WIZARD_STEPS } from "./setup.constants";

export type AllowedDatabases = z.infer<typeof allowedDatabasesEnum>;

export type DatabaseConfig = z.infer<typeof databaseConfigSchema>;
export type AdminCredentials = z.infer<typeof adminCredentialsSchema>;
export type TestDatabaseConnectionRequest = z.infer<typeof testDatabaseConnectionRequestSchema>;
export type CompleteSetupRequest = z.infer<typeof completeSetupRequestSchema>;

export type SetupStatusResponse = z.infer<typeof setupStatusResponseSchema>;
export type TestDatabaseConnectionResponse = z.infer<typeof testDatabaseConnectionResponseSchema>;
export type CompleteSetupResponse = z.infer<typeof completeSetupResponseSchema>;

export type SetupWizardStep = (typeof SETUP_WIZARD_STEPS)[keyof typeof SETUP_WIZARD_STEPS];
