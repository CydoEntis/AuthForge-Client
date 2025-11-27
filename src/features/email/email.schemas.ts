import z from "zod";
import { EMAIL_PROVIDERS } from "./email.constants";

export const allowedEmailProvidersEnum = z.enum([EMAIL_PROVIDERS.SMTP, EMAIL_PROVIDERS.RESEND]);

export const emailProviderConfigSchema = z.object({
  emailProvider: allowedEmailProvidersEnum,
  fromEmail: z.email("From email must be valid"),
  fromName: z.string().optional(),
  smtpHost: z.string().optional(),
  smtpPort: z.number().int().min(1).max(65535).optional(),
  smtpUsername: z.string().optional(),
  smtpPassword: z.string().optional(),
  useSsl: z.boolean().default(true),
  resendApiKey: z.string().optional(),
});

export const testEmailConfigSchema = emailProviderConfigSchema.extend({
  testRecipient: z.email("Test recipient must be valid"),
});

export const testEmailConfigResponseSchema = z.object({
  isSuccessful: z.boolean(),
  message: z.string(),
});
