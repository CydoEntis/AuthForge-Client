import { ContentSection } from "@/features/admin/components/SettingsSection";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { useUpdateGeneralForm } from "@/features/applications/hooks/useUpdateGeneralForm";
import type { Application } from "../../types";

type GeneralSettingsSectionProps = {
  applicationId: string;
  application: Application;
};

export function GeneralSettingsSection({ applicationId, application }: GeneralSettingsSectionProps) {
  const { form, handleSubmit, isLoading } = useUpdateGeneralForm(applicationId, application);

  return (
    <ContentSection title="General Settings" description="Basic information about your application">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput form={form} name="name" label="Application Name" placeholder="My Awesome App" />
          <FormInput
            form={form}
            name="description"
            label="Description (Optional)"
            placeholder="What does this application do?"
          />

          <div className="flex justify-end">
            <LoadingButton type="submit" isLoading={isLoading}>
              Save General Settings
            </LoadingButton>
          </div>
        </form>
      </Form>
    </ContentSection>
  );
}
