// components/apps/CreateAppModal.tsx
import { FormProvider } from "react-hook-form";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { useZodForm } from "@/hooks/useZodForm";
import { useFormMutation } from "@/hooks/useFormMutation";
import { z } from "zod";
import { FormInput } from "@/components/shared/FormInput";
import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import { EMAIL_PROVIDERS } from "@/features/setup/types";
import SelectAppEmailProvider from "./SelectAppEmailProvider";
import { motion, AnimatePresence } from "framer-motion";

const createAppSchema = z.object({
  name: z.string().min(3),
  allowedOrigins: z.string().min(1),
  emailProvider: z.enum([EMAIL_PROVIDERS.SMTP, EMAIL_PROVIDERS.RESEND]),
  emailConfig: z.object({
    host: z.string().optional(),
    port: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    apiKey: z.string().optional(),
    from: z.string().email().optional(),
    to: z.string().email().optional(),
  }),
});

export type CreateAppFormValues = z.infer<typeof createAppSchema>;

export default function CreateAppModal({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (data: CreateAppFormValues) => Promise<void>;
}) {
  const form = useZodForm<CreateAppFormValues>(createAppSchema, {
    emailProvider: EMAIL_PROVIDERS.SMTP,
  });

  const mutation = useFormMutation({
    mutationFn: onCreate,
    setError: form.setError,
    successMessage: "Application created successfully",
    onSuccess: () => {
      onOpenChange(false);
      form.reset();
    },
  });

  const selectedEmailProvider = form.watch("emailProvider");

  return (
    <Modal title="Create New Application" open={open} onOpenChange={onOpenChange}>
      <FormProvider {...form}>
        <motion.form
          onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
          className="flex flex-col gap-6"
          layout
        >
          <FormInput form={form} name="name" label="Application Name" placeholder="My Awesome App" />
          <FormInput
            form={form}
            name="allowedOrigins"
            label="Allowed Origins"
            placeholder="Enter one origin per line"
          />
          <SelectAppEmailProvider form={form} />

          {/* THIS AnimatePresence + motion.div handles SMTP/Resend field height animation */}
          <AnimatePresence mode="wait">
            {selectedEmailProvider === EMAIL_PROVIDERS.SMTP && (
              <motion.div
                key="smtp-fields"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                layout
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
              >
                <FormInput form={form} name="emailConfig.host" label="SMTP Host" placeholder="smtp.example.com" />
                <FormInput form={form} name="emailConfig.port" label="Port" placeholder="587" />
                <FormInput form={form} name="emailConfig.username" label="Username" placeholder="user@example.com" />
                <FormInput
                  form={form}
                  name="emailConfig.password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                />
                <FormInput form={form} name="emailConfig.from" label="From Email" placeholder="from@example.com" />
                <FormInput form={form} name="emailConfig.to" label="To Email" placeholder="to@example.com" />
              </motion.div>
            )}

            {selectedEmailProvider === EMAIL_PROVIDERS.RESEND && (
              <motion.div
                key="resend-fields"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                layout
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
              >
                <FormInput form={form} name="emailConfig.apiKey" label="Resend API Key" placeholder="sk_1234567890" />
                <FormInput form={form} name="emailConfig.from" label="From Email" placeholder="from@example.com" />
                <FormInput form={form} name="emailConfig.to" label="To Email" placeholder="to@example.com" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <LoadingButton type="submit" isLoading={mutation.isPending}>
              Create Application
            </LoadingButton>
          </div>
        </motion.form>
      </FormProvider>
    </Modal>
  );
}
