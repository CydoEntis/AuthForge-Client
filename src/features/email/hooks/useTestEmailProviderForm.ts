import { useZodForm } from "@/hooks/useZodForm";
import { testEmailConfigSchema } from "../email.schemas";
import { useTestEmailProviderMutation } from "./useTestEmailProviderMutation";
import type { EmailProviderConfig } from "../email.types";
import { EMAIL_PROVIDERS, type AllowedEmailProviders } from "../email.constants";

export function useTestEmailForm(provider: AllowedEmailProviders, initialConfig?: EmailProviderConfig) {
  const form = useZodForm(testEmailConfigSchema, {
    defaultValues: initialConfig
      ? { ...initialConfig, testRecipient: "" }
      : {
          emailProvider: provider,
          fromEmail: provider === EMAIL_PROVIDERS.SMTP ? "noreply@example.com" : "noreply@resend.com",
          fromName: "AuthForge",
          smtpHost: "smtp.gmail.com",
          smtpPort: 587,
          smtpUsername: "",
          smtpPassword: "",
          useSsl: true,
          resendApiKey: "",
          testRecipient: "",
        },
  });

  const mutation = useTestEmailProviderMutation(form.setError);

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
}
