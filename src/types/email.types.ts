export const EMAIL_PROVIDERS = {
  SMTP: "Smtp",
  RESEND: "Resend",
} as const;

export type AllowedEmailProviders = (typeof EMAIL_PROVIDERS)[keyof typeof EMAIL_PROVIDERS];

export type EmailProviderConfig = {
  emailProvider: AllowedEmailProviders;
  fromEmail: string;
  fromName?: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUsername?: string;
  smtpPassword?: string;
  useSsl?: boolean;
  resendApiKey?: string;
};

export type TestEmailConfigRequest = EmailProviderConfig & {
  testRecipient: string;
};

export type TestEmailConfigResponse = {
  isSuccessful: boolean;
  message: string;
};
