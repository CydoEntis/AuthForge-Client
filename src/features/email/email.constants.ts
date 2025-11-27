export const EMAIL_PROVIDERS = {
  SMTP: "Smtp",
  RESEND: "Resend",
} as const;

export type AllowedEmailProviders = (typeof EMAIL_PROVIDERS)[keyof typeof EMAIL_PROVIDERS];
