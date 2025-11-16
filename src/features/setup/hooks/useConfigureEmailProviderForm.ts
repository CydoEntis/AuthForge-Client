import { useZodForm } from "@/hooks/useZodForm";
import { useFormMutation } from "@/hooks/useFormMutation";
import { setupApi } from "../setup.api";
import type { TestEmailConfigRequest, TestEmailResponse, AllowedEmailProviders } from "../setup.types";
import { emailProviderSchema } from "../setup.schemas";

export function useConfigureEmailProviderForm(
  initialConfig: Partial<TestEmailConfigRequest> | null,
  onSave: (cfg: TestEmailConfigRequest) => void
) {
  const defaultConfig: TestEmailConfigRequest = {
    emailProvider: "Smtp" as AllowedEmailProviders,
    fromEmail: "",
    fromName: "AuthForge",
    testRecipient: "",
    smtpHost: "",
    smtpPort: 587,
    smtpUsername: "",
    smtpPassword: "",
    useSsl: true,
    resendApiKey: "",
    ...initialConfig,
  };

  const form = useZodForm(emailProviderSchema, {
    defaultValues: defaultConfig,
  });

  const mutation = useFormMutation<TestEmailConfigRequest, TestEmailResponse>({
    mutationFn: async (values) => {
      const request: TestEmailConfigRequest = {
        ...values,
        fromName: values.fromName ?? "AuthForge",
        useSsl: values.useSsl ?? true,
        testRecipient: values.testRecipient!,
      };
      return setupApi.testEmailProvider(request);
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
