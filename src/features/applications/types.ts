import type { AllowedEmailProviders } from "../setup/setup.types";

export type Application = {
  applicationId: string;
  name: string;
  slug: string;
  description: string | null;
  publicKey: string;
  secretKey: string;
  jwtSecret: string;
  allowedOrigins: string[];
  isActive: boolean;
  createdAtUtc: string;
  emailSettings?: EmailSettings | null;
  oauthSettings?: OAuthSettings | null;
};

export type ApplicationSummary = {
  applicationId: string;
  name: string;
  slug: string;
  publicKey: string;
  isActive: boolean;
  userCount: number;
  createdAtUtc: string;
};

export type ApplicationFilterParameters = {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  isActive?: boolean;
  sortBy?: "Name" | "Slug" | "CreatedAt" | "UpdatedAt";
  sortOrder?: "Asc" | "Desc";
};

export type CreateApplication = {
  name: string;
  description?: string;
  allowedOrigins: string[];
  jwtSecret?: string | null;
  emailSettings: EmailSettings;
  oauthSettings?: OAuthSettings | null;
};

export type EmailSettings = {
  provider: AllowedEmailProviders;
  apiKey: string;
  fromEmail: string;
  fromName: string;
  passwordResetCallbackUrl?: string | null;
  emailVerificationCallbackUrl?: string | null;
};

export type OAuthSettings = {
  googleEnabled: boolean;
  googleClientId?: string | null;
  googleClientSecret?: string | null;
  githubEnabled: boolean;
  githubClientId?: string | null;
  githubClientSecret?: string | null;
};

export type PrivateAndPublicKeys = { publicKey: string; secretKey: string };
