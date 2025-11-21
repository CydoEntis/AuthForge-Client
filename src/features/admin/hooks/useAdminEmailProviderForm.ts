import { useState, useEffect } from "react";
import { useZodForm } from "@/hooks/useZodForm";
import { useAdminUpdateEmailProviderMutation } from "./useAdminUpdateEmailProviderMutation";
import { adminTestEmailProviderRequest } from "../admin.schemas";
import { useAdminTestEmailProviderMutation } from "./useAdminTestEmailProviderMutation";
import { type AllowedEmailProviders, type EmailProviderConfig, EMAIL_PROVIDERS } from "@/types/shared.types";

export function useAdminEmailProviderForm(provider: AllowedEmailProviders, existingConfig?: EmailProviderConfig) {
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

  useEffect(() => {
    if (existingConfig) {
      if (existingConfig.emailProvider === EMAIL_PROVIDERS.SMTP) {
        smtpForm.reset({
          emailProvider: EMAIL_PROVIDERS.SMTP,
          fromEmail: existingConfig.fromEmail,
          fromName: existingConfig.fromName || "",
          smtpHost: existingConfig.smtpHost || "",
          smtpPort: existingConfig.smtpPort || 587,
          smtpUsername: existingConfig.smtpUsername || "",
          smtpPassword: "",
          useSsl: existingConfig.useSsl ?? true,
          testRecipient: "",
        });
      } else if (existingConfig.emailProvider === EMAIL_PROVIDERS.RESEND) {
        resendForm.reset({
          emailProvider: EMAIL_PROVIDERS.RESEND,
          fromEmail: existingConfig.fromEmail,
          fromName: existingConfig.fromName || "",
          resendApiKey: "",
          testRecipient: "",
        });
      }
    }
  }, [existingConfig, smtpForm, resendForm]);

  const currentForm = provider === EMAIL_PROVIDERS.SMTP ? smtpForm : resendForm;

  const testMutation = useAdminTestEmailProviderMutation(currentForm.setError as any);
  const updateMutation = useAdminUpdateEmailProviderMutation(currentForm.setError as any);

  useEffect(() => {
    setTestSuccessful(false);
    currentForm.clearErrors();
  }, [provider]);

  useEffect(() => {
    const subscription = currentForm.watch(() => {
      if (testSuccessful) {
        setTestSuccessful(false);
      }
      if (currentForm.formState.errors.root) {
        currentForm.clearErrors("root");
      }
    });

    return () => {
      try {
        (subscription as any)?.unsubscribe?.();
      } catch (e) {}
    };
  }, [currentForm, testSuccessful]);

  const handleTestConnection = currentForm.handleSubmit(async (values) => {
    setTestSuccessful(false);
    currentForm.clearErrors();

    try {
      await testMutation.mutateAsync(values);
      setTestSuccessful(true);
    } catch (error) {
      console.error("Test failed:", error);
    }
  });

  const handleSaveConfig = currentForm.handleSubmit(async (values) => {
    if (!testSuccessful) {
      currentForm.setError("root", {
        type: "manual",
        message: "Please test the connection first",
      });
      return;
    }

    try {
      const emailProviderConfig =
        provider === EMAIL_PROVIDERS.SMTP
          ? {
              emailProvider: values.emailProvider as "Smtp",
              fromEmail: values.fromEmail,
              fromName: values.fromName,
              smtpHost: (values as any).smtpHost,
              smtpPort: (values as any).smtpPort,
              smtpUsername: (values as any).smtpUsername,
              smtpPassword: (values as any).smtpPassword,
              useSsl: (values as any).useSsl,
            }
          : {
              emailProvider: values.emailProvider as "Resend",
              fromEmail: values.fromEmail,
              fromName: values.fromName,
              resendApiKey: (values as any).resendApiKey,
            };

      await updateMutation.mutateAsync({
        emailProviderConfig,
      });

      setTestSuccessful(false);
    } catch (error) {
      console.error("Save failed:", error);
    }
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
