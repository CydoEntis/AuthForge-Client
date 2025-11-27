import { EmailConfigForm } from "@/features/email/components/EmailConfigForm";
import type { EmailProviderConfig } from "@/features/email/email.types";
import { useUpdateAdminEmailProviderMutation } from "../../hooks/useAdminUpdateEmailProviderMutation";

export function AdminUpdateEmailProvider({ emailProviderSettings }: { emailProviderSettings?: EmailProviderConfig }) {
  const updateEmail = useUpdateAdminEmailProviderMutation();

  const handleSave = async (config: EmailProviderConfig) => {
    await updateEmail.mutateAsync({ emailProviderConfig: config });
  };

  return <EmailConfigForm initialConfig={emailProviderSettings} onSave={handleSave} isSaving={updateEmail.isPending} />;
}
