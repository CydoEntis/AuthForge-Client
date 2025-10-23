import AuthCard from "@/components/shared/AuthCard";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import FormError from "@/components/shared/FormError";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { useLoginAdminForm } from "../hooks/useLoginAdminForm";
import { Link } from "@tanstack/react-router";

function LoginAdmin() {
  const { form, handleSubmit, isLoading, error } = useLoginAdminForm();

  return (
    <AuthCard title="Welcome Back" subText="Log in to manage your apps.">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput form={form} name="email" label="Email" placeholder="example@email.com" isLoading={isLoading} />
          <div className="space-y-1">
            <FormInput
              form={form}
              name="password"
              label="Password"
              placeholder="******"
              type="password"
              isLoading={isLoading}
            />
            <div className="w-full flex justify-end text-sm">
              <Link to="/setup" className="text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>

          {error && <FormError message={(error as Error).message} />}

          <LoadingButton type="submit" className="w-full mt-8" isLoading={isLoading} loadingText="Logging In...">
            Log in
          </LoadingButton>
        </form>
      </Form>
    </AuthCard>
  );
}

export default LoginAdmin;
