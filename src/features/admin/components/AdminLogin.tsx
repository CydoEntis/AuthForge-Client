import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import FormError from "@/components/shared/FormError";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { useAdminLoginForm } from "../hooks/useAdminLoginForm";
import { Link } from "@tanstack/react-router";
import { CardWithLogo } from "@/components/CardWithLogo";

export function AdminLogin() {
  const { form, handleSubmit, isLoading } = useAdminLoginForm();

  return (
    <CardWithLogo title="Welcome Back" subText="Log in to manage your apps.">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            form={form}
            name="email"
            label="Email"
            placeholder="example@email.com"
            isLoading={isLoading}
            autoComplete="email"
          />

          <div className="space-y-1">
            <FormInput
              form={form}
              name="password"
              label="Password"
              placeholder="******"
              type="password"
              isLoading={isLoading}
              autoComplete="current-password"
            />
            <div className="w-full flex justify-end text-sm">
              <Link
                to="/forgot-password"
                className="text-primary hover:underline"
                viewTransition={{ types: ["slide-right"] }}
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {form.formState.errors.root && <FormError message={form.formState.errors.root.message as string} />}

          <LoadingButton type="submit" className="w-full mt-8" isLoading={isLoading} loadingText="Logging In...">
            Log in
          </LoadingButton>
        </form>
      </Form>
    </CardWithLogo>
  );
}
