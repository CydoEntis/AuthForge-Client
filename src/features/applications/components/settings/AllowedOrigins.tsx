import { ContentSection } from "@/features/admin/components/SettingsSection";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/shared/LoadingButton";
import ManageOrigins from "@/features/applications/components/ManageOrigins";
import type { Application } from "../../application.types";
import { useUpdateOriginsForm } from "../../hooks/updateOriginsForm";

type AllowedOriginsSectionProps = {
  applicationId: string;
  application: Application;
};

export function AllowedOriginsSection({ applicationId, application }: AllowedOriginsSectionProps) {
  const { form, handleSubmit, isLoading } = useUpdateOriginsForm(applicationId, application);

  return (
    <ContentSection title="Allowed Origins" description="Domains that can authenticate with this application">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ManageOrigins name="allowedOrigins" />

          <div className="flex justify-end">
            <LoadingButton type="submit" isLoading={isLoading}>
              Save Origins
            </LoadingButton>
          </div>
        </form>
      </Form>
    </ContentSection>
  );
}
