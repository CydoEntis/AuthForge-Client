import AuthCard from "@/components/shared/AuthCard";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import FormError from "@/components/shared/FormError";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { useSetupAdminForm } from "../hooks/useSetupAdminForm";

function RegisterAdmin() {
  const { form, handleSubmit, isLoading } = useSetupAdminForm();

  return (
    <AuthCard title="Welcome to Auth Forge" subText="Please setup your admin account.">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput form={form} name="email" label="Email" placeholder="example@email.com" isLoading={isLoading} />
          <FormInput
            form={form}
            name="password"
            label="Password"
            placeholder="******"
            type="password"
            isLoading={isLoading}
          />
          <FormInput
            form={form}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="******"
            type="password"
            isLoading={isLoading}
          />

          {form.formState.errors.root && <FormError message={form.formState.errors.root.message!} />}

          <LoadingButton type="submit" className="w-full mt-8" isLoading={isLoading} loadingText="Setting up...">
            Setup Account
          </LoadingButton>
        </form>
      </Form>
    </AuthCard>
  );
}

export default RegisterAdmin;
