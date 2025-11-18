import { CardWithLogo } from "@/components/CardWithLogo";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import FormError from "@/components/shared/FormError";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { useAdminResetPasswordForm } from "../hooks/useAdminResetPasswordForm";

export function AdminResetPassword() {
  const { form, handleSubmit, isLoading } = useAdminResetPasswordForm();
  return (
    <CardWithLogo title="Reset Password" subText="Enter your new password">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <FormInput
              form={form}
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="••••••••"
              isLoading={isLoading}
              autoComplete="new-password"
            />
            <FormInput
              form={form}
              name="confirmNewPassword"
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              isLoading={isLoading}
              autoComplete="new-password"
            />
          </div>

          {form.formState.errors.root && <FormError message={form.formState.errors.root.message as string} />}

          <LoadingButton
            type="submit"
            className="w-full mt-8"
            isLoading={isLoading}
            loadingText="Resetting Password..."
          >
            Reset Password
          </LoadingButton>
        </form>
      </Form>
    </CardWithLogo>
  );
}
