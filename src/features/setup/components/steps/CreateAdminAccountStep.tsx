import { useEffect, useRef } from "react";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import FormError from "@/components/shared/FormError";
import { useZodForm } from "@/hooks/useZodForm";
import type { AdminCredentials } from "../../setup.types";
import { adminCredentialsSchema } from "../../setup.schemas";
import FadeSlide from "@/components/shared/animations/FadeSlide";

type CreateAdminAccountStepProps = {
  onFormChange: (data: AdminCredentials, isValid: boolean) => void;
  isLoading?: boolean;
};

export const CreateAdminAccountStep = ({ onFormChange, isLoading }: CreateAdminAccountStepProps) => {
  const form = useZodForm<AdminCredentials>(adminCredentialsSchema, {
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const formValues = form.watch();

  const prevValuesRef = useRef<string>("");

  useEffect(() => {
    const currentValues = JSON.stringify(formValues);

    if (currentValues !== prevValuesRef.current) {
      prevValuesRef.current = currentValues;
      const result = adminCredentialsSchema.safeParse(formValues);
      onFormChange(formValues, result.success);
    }
  }, [formValues]);

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
            <form className="space-y-6">
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
};
