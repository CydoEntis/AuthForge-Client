import { forwardRef, useImperativeHandle } from "react";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import FormError from "@/components/shared/FormError";
import { useZodForm } from "@/hooks/useZodForm";
import type { AdminCredentials } from "../../setup.types";
import { adminCredentialsSchema } from "../../setup.schemas";
import FadeSlide from "@/components/shared/animations/FadeSlide";

type CreateAdminAccountStepProps = {
  onSubmit: (data: AdminCredentials) => void;
  isLoading?: boolean;
};

export interface CreateAdminAccountStepRef {
  submit: () => void;
  getValues: () => AdminCredentials;
  isValid: () => boolean;
}

export const CreateAdminAccountStep = forwardRef<CreateAdminAccountStepRef, CreateAdminAccountStepProps>(
  ({ onSubmit, isLoading }, ref) => {
    const form = useZodForm<AdminCredentials>(adminCredentialsSchema, {
      mode: "onChange",
    });

    useImperativeHandle(ref, () => ({
      submit: () => form.handleSubmit(onSubmit)(),
      getValues: () => form.getValues(),
      isValid: () => {
        // Manually validate current values
        const values = form.getValues();
        const result = adminCredentialsSchema.safeParse(values);
        return result.success;
      },
    }));

    const rootError = form.formState.errors.root?.message;

    return (
      <div className="flex flex-col h-full">
        <div className="text-center mb-8">
          <h3 className="text-4xl font-semibold">Create your admin account</h3>
          <p className="text-lg text-muted-foreground mt-2">Admin for AuthForge, only one can exist</p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormInput
                  form={form}
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="admin@example.com"
                  isLoading={isLoading}
                />
                <FormInput
                  form={form}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  isLoading={isLoading}
                />
                <FormInput
                  form={form}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  isLoading={isLoading}
                />

                <div className="min-h-[3rem]">
                  <FadeSlide visible={!!rootError} direction="down" className="text-sm text-destructive">
                    <FormError message={rootError!} />
                  </FadeSlide>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    );
  }
);
