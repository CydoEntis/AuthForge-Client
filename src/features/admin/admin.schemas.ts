import z from "zod";

export const adminUpdateEmailSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
});

export const adminTestEmailProviderRequest = z
  .object({
    emailProvider: z.enum(["Smtp", "Resend"]),
    fromEmail: z.email({ message: "From email must be valid" }),
    fromName: z.string().optional().default("AuthForge"),
    testRecipient: z.email({ message: "Test recipient must be valid" }),

    smtpHost: z.string().optional(),
    smtpPort: z.union([z.string(), z.number()]).optional(),
    smtpUsername: z.string().optional(),
    smtpPassword: z.string().optional(),
    useSsl: z.boolean().optional().default(true),

    resendApiKey: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.emailProvider === "Smtp") {
        return !!(data.smtpHost && data.smtpPort && data.smtpUsername && data.smtpPassword);
      }
      return true;
    },
    {
      message: "All SMTP fields are required when using SMTP",
      path: ["smtpHost"],
    }
  )
  .refine(
    (data) => {
      if (data.emailProvider === "Resend") {
        return !!data.resendApiKey;
      }
      return true;
    },
    {
      message: "Resend API key is required when using Resend",
      path: ["resendApiKey"],
    }
  );
