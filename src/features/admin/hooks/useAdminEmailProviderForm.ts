import { useState } from "react";
import { useZodForm } from "@/hooks/useZodForm";
import { useAdminUpdateEmailProviderMutation } from "./useAdminUpdateEmailProviderMutation";
import { adminTestEmailProviderRequest } from "../admin.schemas";
import { EMAIL_PROVIDERS } from "@/features/setup/setup.constants";
import type { AllowedEmailProviders } from "@/features/setup/setup.types";
import { useAdminTestEmailProviderMutation } from "./useAdminTestEmailProviderMutation";

export function useAdminEmailProviderForm(provider: AllowedEmailProviders) {
  const [testSuccessful, setTestSuccessful] = useState(false);

  const smtpForm = useZodForm(adminTestEmailProviderRequest, {
    defaultValues: {
      emailProvider: EMAIL_PROVIDERS.SMTP,
      fromEmail: "noreply@example.com",
      fromName: "",
      smtpHost: "smtp.gmail.com",
      smtpPort: 587,
      smtpUsername: "",
      smtpPassword: "",
      useSsl: true,
      testRecipient: "",
    },
  });

  const resendForm = useZodForm(adminTestEmailProviderRequest, {
    defaultValues: {
      emailProvider: EMAIL_PROVIDERS.RESEND,
      fromEmail: "noreply@resend.com",
      fromName: "",
      resendApiKey: "",
      testRecipient: "",
    },
  });

  const currentForm = provider === EMAIL_PROVIDERS.SMTP ? smtpForm : resendForm;

  const testMutation = useAdminTestEmailProviderMutation(currentForm.setError as any);
  const updateMutation = useAdminUpdateEmailProviderMutation(currentForm.setError as any);

  const handleTestConnection = currentForm.handleSubmit(async (values) => {
    await testMutation.mutateAsync(values, {
      onSuccess: () => {
        setTestSuccessful(true);
      },
    });
  });

  const handleSaveConfig = currentForm.handleSubmit(async (values) => {
    if (!testSuccessful) return;

    await updateMutation.mutateAsync(
      {
        emailProviderConfig: values,
      },
      {
        onSuccess: () => {
          setTestSuccessful(false);
        },
      }
    );
  });

  return {
    smtpForm,
    resendForm,
    handleTestConnection,
    handleSaveConfig,
    isTestingConnection: testMutation.isPending,
    isSavingConfig: updateMutation.isPending,
    testSuccessful,
  };
}
