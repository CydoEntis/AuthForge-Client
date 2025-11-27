import type { z } from "zod";
import type {
  emailProviderConfigSchema,
  testEmailConfigSchema,
  testEmailConfigResponseSchema,
  allowedEmailProvidersEnum,
} from "./email.schemas";

export type AllowedEmailProviders = z.infer<typeof allowedEmailProvidersEnum>;

export type EmailProviderConfig = z.infer<typeof emailProviderConfigSchema>;
export type TestEmailConfigRequest = z.infer<typeof testEmailConfigSchema>;
export type TestEmailConfigResponse = z.infer<typeof testEmailConfigResponseSchema>;
