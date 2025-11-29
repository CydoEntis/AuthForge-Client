import { EmailConfigForm } from "@/features/email/components/EmailConfigForm";
import type { EmailProviderConfig } from "@/features/email/email.types";
import { useUpdateEmailProviderMutation } from "../hooks/useUpdateEmailProviderMutation";

export function UpdateEmailProvider({ emailProviderSettings }: { emailProviderSettings?: EmailProviderConfig }) {
  const updateEmail = useUpdateEmailProviderMutation();

  const handleSave = async (config: EmailProviderConfig) => {
    await updateEmail.mutateAsync({ emailProviderConfig: config });
  };

  return <EmailConfigForm initialConfig={emailProviderSettings} onSave={handleSave} isSaving={updateEmail.isPending} />;
}
