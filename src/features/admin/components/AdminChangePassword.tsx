import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import FormError from "@/components/shared/FormError";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { useAdminChangePasswordForm } from "../hooks/useAdminChangePasswordForm";

export function AdminChangePassword() {
  const { form, handleSubmit, isLoading } = useAdminChangePasswordForm();
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <FormInput
            form={form}
            name="currentPassword"
            label="Current Password"
            placeholder="********"
            type="password"
            isLoading={isLoading}
            autoComplete="current-password"
          />
          <FormInput
            form={form}
            name="newPassword"
            label="New Password"
            placeholder="********"
            type="password"
            isLoading={isLoading}
            autoComplete="new-password"
          />
          <FormInput
            form={form}
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            placeholder="********"
            isLoading={isLoading}
            autoComplete="new-password"
          />
        </div>

        {form.formState.errors.root && <FormError message={form.formState.errors.root.message as string} />}

        <LoadingButton type="submit" className="w-full" isLoading={isLoading} loadingText="Sending Email...">
          Change Password
        </LoadingButton>
      </form>
    </Form>
  );
}
