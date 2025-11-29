import z from "zod";
import { emailProviderConfigSchema } from "../email/email.schemas";
import { pagedResponseSchema } from "@/lib/api/lib.schemas";

export const applicationSortFieldSchema = z.enum(["Name", "Slug", "CreatedAt", "UpdatedAt", "IsActive"]);

export const sortOrderSchema = z.enum(["Asc", "Desc"]);

export const oauthSettingsSchema = z
  .object({
    googleEnabled: z.boolean().default(false),
    googleClientId: z.string().optional(),
    googleClientSecret: z.string().optional(),
    githubEnabled: z.boolean().default(false),
    githubClientId: z.string().optional(),
    githubClientSecret: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.googleEnabled) {
        return !!data.googleClientId && !!data.googleClientSecret;
      }
      return true;
    },
    { message: "Client ID and Secret required", path: ["googleClientId"] }
  )
  .refine(
    (data) => {
      if (data.githubEnabled) {
        return !!data.githubClientId && !!data.githubClientSecret;
      }
      return true;
    },
    { message: "Client ID and Secret required", path: ["githubClientId"] }
  );

export const createApplicationRequestSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional().nullable(),
  allowedOrigins: z.array(z.url("Invalid URL")).min(1, "At least one origin is required"),
  passwordResetCallbackUrl: z.url("Invalid URL").optional().nullable().or(z.literal("")),
  emailVerificationCallbackUrl: z.url("Invalid URL").optional().nullable().or(z.literal("")),
  magicLinkCallbackUrl: z.url("Invalid URL").optional().nullable().or(z.literal("")),
  requireEmailVerification: z.boolean().default(true),
  useGlobalEmailSettings: z.boolean().default(true),
  emailProviderConfig: emailProviderConfigSchema.optional().nullable(),
  oauthSettings: oauthSettingsSchema.optional().nullable(),
});

export const updateApplicationEmailProviderRequestSchema = z.object({
  useGlobalEmailSettings: z.boolean(),
  emailProviderConfig: emailProviderConfigSchema.optional().nullable(),
  passwordResetCallbackUrl: z.url("Invalid URL").optional().nullable(),
  emailVerificationCallbackUrl: z.url("Invalid URL").optional().nullable(),
});

export const updateApplicationOriginsRequestSchema = z.object({
  allowedOrigins: z.array(z.url("Invalid URL")).min(1, "At least one origin is required"),
});

export const updateApplicationOAuthRequestSchema = oauthSettingsSchema;

export const createApplicationResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
  clientId: z.string(),
  clientSecret: z.string(),
  createdAtUtc: z.string(),
});

export const authMethodsSchema = z.object({
  basicAuth: z.boolean(),
  googleOAuth: z.boolean(),
  githubOAuth: z.boolean(),
  magicLinks: z.boolean(),
});

export const applicationListItemSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
  clientId: z.string(),
  isActive: z.boolean(),
  userCount: z.number(),
  authMethods: authMethodsSchema,
  createdAtUtc: z.string(),
  updatedAtUtc: z.string().nullable(),
});

export const getApplicationResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  clientId: z.string(),
  isActive: z.boolean(),
  totalUsers: z.number(),
  createdAtUtc: z.string(),
  updatedAtUtc: z.string().nullable(),
});

export const applicationResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  clientId: z.string(),
  allowedOrigins: z.array(z.string()),
  isActive: z.boolean(),
  requireEmailVerification: z.boolean(),
  createdAtUtc: z.string(),
  updatedAtUtc: z.string().nullable(),
});

export const regenerateKeysResponseSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
});

export const listApplicationsParamsSchema = z.object({
  search: z.string().optional(),
  isActive: z.boolean().optional(),
  sortBy: applicationSortFieldSchema.default("CreatedAt"),
  sortOrder: sortOrderSchema.default("Desc"),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(10),
});

export const listApplicationsResponseSchema = pagedResponseSchema(applicationListItemSchema);
