import { CardWithLogo } from "@/components/CardWithLogo";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import FormError from "@/components/shared/FormError";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { Link } from "@tanstack/react-router";
import { useAdminForgotPasswordForm } from "../hooks/useAdminForgotPasswordForm";

export function AdminForgotPassword() {
  const { form, handleSubmit, isLoading } = useAdminForgotPasswordForm();

  return (
    <CardWithLogo title="Welcome Back" subText="Log in to manage your apps.">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <FormInput form={form} name="email" label="Email" placeholder="example@email.com" isLoading={isLoading} />
            <div className="w-full flex justify-end text-sm">
              <Link to="/login" className="text-primary hover:underline">
                Rembered your password? Log in
              </Link>
            </div>
          </div>

          {form.formState.errors.root && <FormError message={form.formState.errors.root.message as string} />}

          <LoadingButton type="submit" className="w-full mt-8" isLoading={isLoading} loadingText="Sending Email...">
            Forgot Password
          </LoadingButton>
        </form>
      </Form>
    </CardWithLogo>
  );
}
