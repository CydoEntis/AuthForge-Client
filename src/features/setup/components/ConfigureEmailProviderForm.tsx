import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/shared/FormInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import FormError from "@/components/shared/FormError";
import { useFormMutation } from "@/hooks/useFormMutation";
import { resendSchema, smtpSchema } from "../schemas";

export default function ConfigureEmailProviderForm({
  provider,
  initialConfig,
  onSave,
}: {
  provider: "SMTP" | "Resend";
  initialConfig: any;
  onSave: (cfg: any) => void;
}) {
  const schema = provider === "SMTP" ? smtpSchema : resendSchema;
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialConfig,
  });

  const { mutateAsync, isPending } = useFormMutation({
    mutationFn: async (values: any) => {
      console.log(`Testing ${provider} config`, values);
      return new Promise((res) => setTimeout(res, 1000));
    },
    setError: form.setError,
    successMessage: `${provider} configuration works!`,
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((values) => mutateAsync(values).then(() => onSave(values)))}
        className="space-y-6 w-full"
      >
        <h2 className="text-xl font-semibold">Configure {provider === "SMTP" ? "SMTP Server" : "Resend"}</h2>

        {provider === "SMTP" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput form={form} name="host" label="Host" placeholder="smtp.mailtrap.io" />
            <FormInput form={form} name="port" label="Port" placeholder="587" />
            <FormInput form={form} name="username" label="Username" placeholder="user" />
            <FormInput form={form} name="password" label="Password" placeholder="••••••" type="password" />
          </div>
        ) : (
          <FormInput form={form} name="apiKey" label="API Key" placeholder="re_xxx" />
        )}

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
