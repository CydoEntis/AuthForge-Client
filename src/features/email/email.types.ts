import type z from "zod";
import type { emailProviderConfigSchema, testEmailConfigSchema } from "./email.schemas";

export type EmailProviderConfig = z.infer<typeof emailProviderConfigSchema>;
export type TestEmailConfigRequest = z.infer<typeof testEmailConfigSchema>;

export type TestEmailConfigResponse = {
  isSuccessful: boolean;
  message: string;
};
