import { useZodForm } from "@/hooks/useZodForm";
import { useFormMutation } from "@/hooks/useFormMutation";
import { setupApi } from "../setup.api";
import { EMAIL_PROVIDERS } from "../setup.constants";
import { smtpFormSchema, resendFormSchema } from "../setup.schemas";
import type {
  EmailConfig,
  TestEmailConfigRequest,
  TestEmailResponse,
  AllowedEmailProviders,
  SmtpFormValues,
  ResendFormValues,
  SmtpConfig,
  ResendConfig,
} from "../setup.types";

export function useConfigureEmailProviderForm(
  provider: AllowedEmailProviders,
  initialConfig: Partial<EmailConfig>,
  onSave: (cfg: EmailConfig) => void
) {
  const schema = provider === EMAIL_PROVIDERS.SMTP ? smtpFormSchema : resendFormSchema;
  const form = useZodForm(schema, initialConfig as any);

  let currentValues: SmtpFormValues | ResendFormValues;

  const mutation = useFormMutation<SmtpFormValues | ResendFormValues, TestEmailResponse>({
    mutationFn: async (values) => {
      currentValues = values;

      const request: TestEmailConfigRequest = {
        fromEmail: values.fromEmail || "",
        fromName: values.fromName || "AuthForge",
        testRecipient: values.testRecipient,
        useSsl: true,
      };

      if (provider === EMAIL_PROVIDERS.SMTP) {
        const smtp = values as SmtpFormValues;
        request.smtpHost = smtp.smtpHost;
        request.smtpPort = Number(smtp.smtpPort);
        request.smtpUsername = smtp.smtpUsername;
        request.smtpPassword = smtp.smtpPassword;
      } else {
        const resend = values as ResendFormValues;
        request.resendApiKey = resend.resendApiKey;
      }

      return setupApi.testEmailProvider(request);
    },
    setError: form.setError,
    successMessage: "Email configuration successful!",
    onSuccess: (response: TestEmailResponse) => {
      if (response.isSuccessful) {
        const { testRecipient, ...rest } = currentValues;

        if (provider === EMAIL_PROVIDERS.SMTP) {
          const smtp = rest as Omit<SmtpFormValues, "testRecipient">;
          onSave({
            fromEmail: smtp.fromEmail || "",
            fromName: smtp.fromName || "AuthForge",
            smtpHost: smtp.smtpHost,
            smtpPort: Number(smtp.smtpPort),
            smtpUsername: smtp.smtpUsername,
            smtpPassword: smtp.smtpPassword,
            useSsl: smtp.useSsl ?? true,
          } as SmtpConfig);
        } else {
          const resend = rest as Omit<ResendFormValues, "testRecipient">;
          onSave({
            fromEmail: resend.fromEmail || "",
            fromName: resend.fromName || "AuthForge",
            resendApiKey: resend.resendApiKey,
          } as ResendConfig);
        }
      } else {
        form.setError("root", { type: "manual", message: response.message });
      }
    },
  });

  const handleSubmit = form.handleSubmit((values) => mutation.mutate(values));

  return { form, handleSubmit, isLoading: mutation.isPending };
}
