import { useZodForm } from "@/hooks/useZodForm";
import { smtpSchema, resendSchema } from "../schemas";
import type { EmailConfig, AllowedEmailProviders, TestEmailResponse } from "../types";
import { useFormMutation } from "@/hooks/useFormMutation";
import { setupApi } from "../api";

export function useConfigureEmailForm(
  provider: AllowedEmailProviders,
  initialConfig: EmailConfig,
  onSave: (cfg: EmailConfig) => void
) {
  const schema = provider === "SMTP" ? smtpSchema : resendSchema;
  const form = useZodForm<EmailConfig>(schema, initialConfig);

  const mutation = useFormMutation<EmailConfig, TestEmailResponse>({
    mutationFn: async (values) => {
      return setupApi.testEmailProvider(provider, values);
    },
    setError: form.setError,
    onSuccess: (response) => {
      if (response.isSuccessful) onSave(form.getValues());
      else form.setError("root", { type: "manual", message: response.message });
    },
  });

  const handleSubmit = form.handleSubmit((values) => mutation.mutate(values));

  return { form, handleSubmit, isLoading: mutation.isPending };
}
