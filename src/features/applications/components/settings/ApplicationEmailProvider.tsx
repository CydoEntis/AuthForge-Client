import { EmailConfigForm } from "@/features/email/components/EmailConfigForm";
import type { EmailProviderConfig } from "@/features/email/email.types";
import { useUpdateApplicationEmailProviderMutation } from "../../hooks/useUpdateApplicationEmailProvider";

type ApplicationEmailProviderProps = {
  applicationId: string;
  emailProviderSettings?: EmailProviderConfig | null;
};

export function ApplicationEmailProvider({ applicationId, emailProviderSettings }: ApplicationEmailProviderProps) {
  const updateEmail = useUpdateApplicationEmailProviderMutation(applicationId);

  const handleSave = async (config: EmailProviderConfig) => {
    await updateEmail.mutateAsync({
      useGlobalEmailSettings: false,
      emailProviderConfig: config,
      passwordResetCallbackUrl: null,
      emailVerificationCallbackUrl: null,
    });
  };

  return (
    <EmailConfigForm
      initialConfig={emailProviderSettings || undefined}
      onSave={handleSave}
      isSaving={updateEmail.isPending}
    />
  );
}
