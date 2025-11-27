import type { z } from "zod";
import type {
  adminChangePasswordRequestSchema,
  adminUpdateEmailSchema,
  adminUpdateDomainSchema,
  adminUpdateEmailProviderRequestSchema,
  adminRevokeAllSessionsResponseSchema,
  getAdminResponseSchema,
  adminSettingsResponseSchema,
  domainSchema,
} from "./admin.schemas";

export type AdminChangePasswordRequest = z.infer<typeof adminChangePasswordRequestSchema>;
export type AdminUpdateEmailRequest = z.infer<typeof adminUpdateEmailSchema>;
export type AdminUpdateDomainRequest = z.infer<typeof adminUpdateDomainSchema>;
export type AdminUpdateEmailProviderRequest = z.infer<typeof adminUpdateEmailProviderRequestSchema>;
export type DomainRequest = z.infer<typeof domainSchema>;

export type AdminRevokeAllSessionsResponse = z.infer<typeof adminRevokeAllSessionsResponseSchema>;
export type GetAdminResponse = z.infer<typeof getAdminResponseSchema>;
export type AdminSettingsResponse = z.infer<typeof adminSettingsResponseSchema>;
