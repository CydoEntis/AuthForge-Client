import AuthCard from "@/components/shared/AuthCard";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRegisterAdminForm } from "../hooks/useRegisterAdminForm";
import { FormInput } from "@/components/shared/FormInput";
import { FormRow } from "@/components/shared/FormRow";
import FormError from "@/components/shared/FormError";
import { LoadingButton } from "@/components/shared/LoadingButton";

function RegisterAdmin() {
  const { form, handleSubmit, isLoading, error } = useRegisterAdminForm();

  return (
    <AuthCard title="Welcome to Auth Forge" subText="Please setup your admin account.">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput form={form} name="username" label="Username" placeholder="User1234" />
          <FormRow>
            <FormInput form={form} name="firstName" label="First Name" placeholder="John" className="w-full" />
            <FormInput form={form} name="lastName" label="Last Name" placeholder="Doe" className="w-full" />
          </FormRow>
          <FormInput form={form} name="email" label="Email" placeholder="example@email.com" />
          <FormInput form={form} name="password" label="Password" placeholder="******" type="password" />
          <FormInput form={form} name="confirmPassword" label="Confirm Password" placeholder="******" type="password" />

          {error && <FormError message={(error as Error).message} />}

          <LoadingButton type="submit" className="w-full mt-8" isLoading={isLoading} loadingText="Setting up...">
            Setup Account
          </LoadingButton>
        </form>
      </Form>
    </AuthCard>
  );
}

export default RegisterAdmin;
