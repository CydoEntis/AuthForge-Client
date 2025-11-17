import { FormInput } from "@/components/shared/FormInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { Form } from "@/components/ui/form";
import { useAdminUpdateEmailForm } from "@/features/admin/hooks/useAdminUpdateEmailForm";

export function AdminUpdateEmail() {
  const { form, handleSubmit, isLoading } = useAdminUpdateEmailForm();

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <FormInput
          form={form}
          name="email"
          label="Email"
          type="email"
          placeholder="admin@authforge.com"
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
