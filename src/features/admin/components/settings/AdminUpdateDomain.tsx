import { FormInput } from "@/components/shared/FormInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { Form } from "@/components/ui/form";
import { useAdminUpdateDomainForm } from "../../hooks/useAdminUpdateDomainForm";

export function AdminUpdateDomain({ currentDomain }: { currentDomain?: string }) {
  const { form, handleSubmit, isLoading } = useAdminUpdateDomainForm(currentDomain);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <FormInput
          form={form}
          name="authForgeDomain"
          label="Domain"
          placeholder={currentDomain || "https://auth.example.com"}
          className="flex-1"
          isLoading={isLoading}
        />
        <LoadingButton type="submit" isLoading={isLoading} loadingText="Updating..." className="mb-2">
          Update
        </LoadingButton>
      </form>
    </Form>
  );
}
