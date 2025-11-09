import { useZodForm } from "@/hooks/useZodForm";
import { smtpSchema, resendSchema } from "../schemas";
import { type EmailConfig, type AllowedEmailProviders, type TestEmailResponse, EMAIL_PROVIDERS } from "../setup.types";
import { useFormMutation } from "@/hooks/useFormMutation";
import { setupApi } from "../setup.api";

export function useConfigureEmailForm(
  provider: AllowedEmailProviders,
  initialConfig: Partial<EmailConfig>,
  onSave: (cfg: EmailConfig) => void
) {
  const schema = provider === EMAIL_PROVIDERS.SMTP ? smtpSchema : resendSchema;
  const form = useZodForm<EmailConfig>(schema, initialConfig as EmailConfig);

  const mutation = useFormMutation<EmailConfig, TestEmailResponse>({
    mutationFn: async (values) => {
      return setupApi.testEmailProvider(provider, values);
    },
    setError: form.setError,
    successMessage: "Email configuration successful!",
    onSuccess: (response) => {
      if (response.isSuccessful) {
        onSave(form.getValues());
      } else {
        form.setError("root", { type: "manual", message: response.message });
      }
    },
  });

  const handleSubmit = form.handleSubmit((values) => mutation.mutate(values));

  return { form, handleSubmit, isLoading: mutation.isPending };
}
