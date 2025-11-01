import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import FormError from "@/components/shared/FormError";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { useZodForm } from "@/hooks/useZodForm";
import { setupAdminSchema } from "../schemas";
import type { AdminConfig } from "../types";

type CreateAdminProps = {
  adminConfig: AdminConfig;
  setAdminConfig: (config: AdminConfig) => void;
  onComplete: () => void;
  isLoading?: boolean;
};

export default function CreateAdmin({ adminConfig, setAdminConfig, onComplete, isLoading }: CreateAdminProps) {
  const form = useZodForm<AdminConfig>(setupAdminSchema, adminConfig);

  const handleSubmit = form.handleSubmit((values) => {
    setAdminConfig(values);
    onComplete();
  });

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Create Admin Account</h2>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <FormInput form={form} name="email" label="Email" placeholder="admin@example.com" isLoading={isLoading} />

          <FormInput
            form={form}
            name="password"
            label="Password"
            placeholder="••••••••"
            type="password"
            isLoading={isLoading}
          />

          <FormInput
            form={form}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            type="password"
            isLoading={isLoading}
          />

          {form.formState.errors.root && <FormError message={form.formState.errors.root.message!} />}

          <LoadingButton type="submit" className="w-full" isLoading={isLoading} loadingText="Completing setup...">
            Complete Setup
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
