import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import FormError from "@/components/shared/FormError";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { useAdminForgotPasswordForm } from "../hooks/useAdminForgotPasswordForm";

export function AdminChangePassword() {
  const { form, handleSubmit, isLoading } = useAdminForgotPasswordForm();
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
          />
          <FormInput
            form={form}
            name="newPassword"
            label="New Password"
            placeholder="********"
            type="password"
            isLoading={isLoading}
          />
          <FormInput
            form={form}
            name="confrimNewPassword"
            label="Confirm New Password"
            type="password"
            placeholder="********"
            isLoading={isLoading}
          />
        </div>

        {form.formState.errors.root && <FormError message={form.formState.errors.root.message as string} />}

        <LoadingButton type="submit" className="w-full mt-8" isLoading={isLoading} loadingText="Sending Email...">
          Change Password
        </LoadingButton>
      </form>
    </Form>
  );
}
