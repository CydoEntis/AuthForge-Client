import type { z } from "zod";
import type {
  createApplicationRequestSchema,
  createApplicationResponseSchema,
  oauthSettingsSchema,
  applicationListItemSchema,
  getApplicationResponseSchema,
  applicationResponseSchema,
  updateApplicationEmailProviderRequestSchema,
  updateApplicationOAuthRequestSchema,
  updateApplicationOriginsRequestSchema,
  regenerateKeysResponseSchema,
  listApplicationsResponseSchema,
  applicationSortFieldSchema,
  sortOrderSchema,
  listApplicationsParamsSchema,
} from "./application.schemas";

export type CreateApplicationRequest = z.infer<typeof createApplicationRequestSchema>;
export type UpdateApplicationEmailProviderRequest = z.infer<typeof updateApplicationEmailProviderRequestSchema>;
export type UpdateApplicationOAuthRequest = z.infer<typeof updateApplicationOAuthRequestSchema>;
export type UpdateApplicationOriginsRequest = z.infer<typeof updateApplicationOriginsRequestSchema>;

export type CreateApplicationResponse = z.infer<typeof createApplicationResponseSchema>;
export type ApplicationListItem = z.infer<typeof applicationListItemSchema>;
export type GetApplicationResponse = z.infer<typeof getApplicationResponseSchema>;
export type ApplicationResponse = z.infer<typeof applicationResponseSchema>;
export type RegenerateKeysResponse = z.infer<typeof regenerateKeysResponseSchema>;
export type ListApplicationsResponse = z.infer<typeof listApplicationsResponseSchema>;

export type OAuthSettings = z.infer<typeof oauthSettingsSchema>;

export type ApplicationSortField = z.infer<typeof applicationSortFieldSchema>;
export type SortOrder = z.infer<typeof sortOrderSchema>;

export type ListApplicationsParams = z.infer<typeof listApplicationsParamsSchema>;
