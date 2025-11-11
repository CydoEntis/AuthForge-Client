// import type { AllowedEmailProviders } from "../setup.types";

// export const buildEmailProviderConfig = (
//   selectedEmail: AllowedEmailProviders,
//   emailConfig: any
// ): EmailProviderConfig => {
//   switch (selectedEmail) {
//     case EMAIL_PROVIDERS.RESEND:
//       return {
//         emailProvider: selectedEmail,
//         resendApiKey: emailConfig.apiKey ?? null,
//         fromEmail: emailConfig.from,
//         fromName: "AuthForge",
//         useSsl: false,
//       };
//     case EMAIL_PROVIDERS.SMTP:
//       return {
//         emailProvider: selectedEmail,
//         smtpHost: emailConfig.host ?? null,
//         smtpPort: Number(emailConfig.port),
//         smtpUsername: emailConfig.username ?? null,
//         smtpPassword: emailConfig.password ?? null,
//         fromEmail: emailConfig.from,
//         fromName: "AuthForge",
//         useSsl: true,
//       };
//     default:
//       return {
//         emailProvider: selectedEmail,
//         fromEmail: emailConfig.from,
//         fromName: "AuthForge",
//         useSsl: false,
//       };
//   }
// };
