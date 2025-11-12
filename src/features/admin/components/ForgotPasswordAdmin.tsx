import AuthCard from "@/components/shared/AuthCard";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import FormError from "@/components/shared/FormError";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { useLoginAdminForm } from "../hooks/useLoginAdminForm";
import { Link } from "@tanstack/react-router";

function ForgotPasswordAdmin() {
  const { form, handleSubmit, isLoading, error } = useLoginAdminForm();

  return (
    <AuthCard title="Forgot Your Password" subText="Enter your email to recover account.">
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

          {error && <FormError message={(error as Error).message} />}

          <LoadingButton type="submit" className="w-full mt-8" isLoading={isLoading} loadingText="Sending Email...">
            Forgot Password
          </LoadingButton>
        </form>
      </Form>
    </AuthCard>
  );
}

export default ForgotPasswordAdmin;
