import FormError from "@/components/shared/FormError";
import { FormInput } from "@/components/shared/FormInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { useFormMutation } from "@/hooks/useFormMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { postgresSchema } from "../schemas";
import type { PostgresConfig } from "../types";

export default function ConfigureDatabaseForm({
  initialConfig,
  onSave,
}: {
  initialConfig: PostgresConfig;
  onSave: (cfg: PostgresConfig) => void;
}) {
  const form = useForm<PostgresConfig>({
    resolver: zodResolver(postgresSchema),
    defaultValues: initialConfig,
  });

  const { mutateAsync, isPending } = useFormMutation({
    mutationFn: async (values: PostgresConfig) => {
      console.log("Testing Postgres config", values);
      return new Promise((res) => setTimeout(res, 1000));
    },
    setError: form.setError,
    successMessage: "Postgres configuration works!",
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((values) => mutateAsync(values).then(() => onSave(values)))}
        className="space-y-6"
      >
        <h2 className="text-xl font-semibold">Configure Postgres</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput form={form} name="host" label="Host" placeholder="localhost" />
          <FormInput form={form} name="port" label="Port" placeholder="5432" />
          <FormInput form={form} name="user" label="User" placeholder="postgres" />
          <FormInput form={form} name="password" label="Password" placeholder="••••••" type="password" />
          <FormInput form={form} name="database" label="Database" placeholder="authforge" />
        </div>
        {form.formState.errors.root && <FormError message={form.formState.errors.root.message!} />}
        <div className="flex justify-end gap-3">
          <LoadingButton type="submit" isLoading={isPending} loadingText="Testing configuration...">
            Test & Continue
          </LoadingButton>
        </div>
      </form>
    </FormProvider>
  );
}
