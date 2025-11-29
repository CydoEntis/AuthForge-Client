import type { z } from "zod";
import type {
  revokeAllSessionsResponseSchema,
  settingsResponseSchema,
  updateDomainSchema,
  updateEmailProviderRequestSchema,
} from "./settings.schema";

export type UpdateDomainRequest = z.infer<typeof updateDomainSchema>;
export type UpdateEmailProviderRequest = z.infer<typeof updateEmailProviderRequestSchema>;
export type RevokeAllSessionsResponse = z.infer<typeof revokeAllSessionsResponseSchema>;
export type SettingsResponse = z.infer<typeof settingsResponseSchema>;
