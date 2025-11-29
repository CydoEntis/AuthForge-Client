import z from "zod";
import { emailProviderConfigSchema } from "../email/email.schemas";

export const updateDomainSchema = z.object({
  authForgeDomain: z
    .url("Please enter a valid URL starting with http:// or https://")
    .refine((url) => url.startsWith("http://") || url.startsWith("https://"), {
      message: "URL must start with http:// or https://",
    }),
});

export const updateEmailProviderRequestSchema = z.object({
  emailProviderConfig: emailProviderConfigSchema,
});

export const revokeAllSessionsResponseSchema = z.object({
  message: z.string(),
  sessionsRevoked: z.number(),
});

export const settingsResponseSchema = z.object({
  authForgeDomain: z.string(),
  emailProvider: emailProviderConfigSchema,
});
