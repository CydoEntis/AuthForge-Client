import { FormProvider } from "react-hook-form";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { useZodForm } from "@/hooks/useZodForm";
import { z } from "zod";
import { FormInput } from "@/components/shared/FormInput";
import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import { motion, AnimatePresence } from "framer-motion";
import SelectAppEmailProvider from "./SelectAppEmailProvider";
import { useEffect } from "react";
import type { Application, CreateApplication } from "../types";

const applicationFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  allowedOrigins: z.string().min(1, "At least one origin is required"),
  jwtSecret: z.string().optional().nullable(),
  emailProvider: z.enum(["Smtp", "Resend"]),
  emailConfig: z.object({
    host: z.string().optional(),
    port: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    apiKey: z.string().optional(),
    from: z.email().optional(),
    fromName: z.string().optional(),
  }),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

interface ApplicationFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateApplication) => Promise<void>;
  application?: Application | null;
  isLoading?: boolean;
}

export default function ApplicationFormModal({
  open,
  onOpenChange,
  onSubmit,
  application,
  isLoading = false,
}: ApplicationFormModalProps) {
  const isEditMode = !!application;

  const form = useZodForm<ApplicationFormValues>(applicationFormSchema, {
    emailProvider: "Smtp",
  });

  useEffect(() => {
    if (application && open) {
      const emailProvider = application.emailSettings?.provider || "Smtp";

      form.reset({
        name: application.name,
        description: application.description || "",
        allowedOrigins: application.allowedOrigins.join("\n"),
        jwtSecret: null,
        emailProvider,
        emailConfig: {
          apiKey: application.emailSettings?.apiKey || "",
          from: application.emailSettings?.fromEmail || "",
          fromName: application.emailSettings?.fromName || "",
          host: "",
          port: "",
          username: "",
          password: "",
        },
      });
    } else if (!open) {
      form.reset({
        emailProvider: "Smtp",
      });
    }
  }, [application, open, form]);

  const selectedEmailProvider = form.watch("emailProvider");

  const handleSubmit = async (values: ApplicationFormValues) => {
    const payload: CreateApplication = {
      name: values.name,
      description: values.description,
      allowedOrigins: values.allowedOrigins
        .split("\n")
        .map((o) => o.trim())
        .filter(Boolean),
      jwtSecret: values.jwtSecret || null,
      emailSettings: {
        provider: values.emailProvider,
        apiKey: values.emailConfig.apiKey || "",
        fromEmail: values.emailConfig.from || "",
        fromName: values.emailConfig.fromName || "",
        passwordResetCallbackUrl: null,
        emailVerificationCallbackUrl: null,
      },
      oauthSettings: null,
    };

    await onSubmit(payload);
  };

  return (
    <Modal title={isEditMode ? "Edit Application" : "Create New Application"} open={open} onOpenChange={onOpenChange}>
      <FormProvider {...form}>
        <motion.form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6" layout>
          <FormInput
            form={form}
            name="name"
            label="Application Name"
            placeholder="My Awesome App"
            isLoading={isLoading}
          />

          <FormInput
            form={form}
            name="description"
            label="Description (Optional)"
            placeholder="What does this application do?"
            isLoading={isLoading}
          />

          <div className="space-y-2">
            <FormInput
              form={form}
              name="allowedOrigins"
              label="Allowed Origins"
              placeholder="https://myapp.com&#10;https://app.myapp.com"
              type="textarea"
              isLoading={isLoading}
            />
            <p className="text-sm text-muted-foreground">Enter one origin per line</p>
          </div>

          <SelectAppEmailProvider form={form} />

          <AnimatePresence mode="wait">
            {selectedEmailProvider === "Smtp" && (
              <motion.div
                key="smtp-fields"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                layout
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <FormInput
                  form={form}
                  name="emailConfig.host"
                  label="SMTP Host"
                  placeholder="smtp.gmail.com"
                  isLoading={isLoading}
                />
                <FormInput form={form} name="emailConfig.port" label="Port" placeholder="587" isLoading={isLoading} />
                <FormInput
                  form={form}
                  name="emailConfig.username"
                  label="Username"
                  placeholder="user@gmail.com"
                  isLoading={isLoading}
                />
                <FormInput
                  form={form}
                  name="emailConfig.password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  isLoading={isLoading}
                />
                <FormInput
                  form={form}
                  name="emailConfig.from"
                  label="From Email"
                  placeholder="noreply@myapp.com"
                  isLoading={isLoading}
                />
                <FormInput
                  form={form}
                  name="emailConfig.fromName"
                  label="From Name"
                  placeholder="My App"
                  isLoading={isLoading}
                />
              </motion.div>
            )}

            {selectedEmailProvider === "Resend" && (
              <motion.div
                key="resend-fields"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                layout
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <FormInput
                  form={form}
                  name="emailConfig.apiKey"
                  label="Resend API Key"
                  placeholder="re_..."
                  isLoading={isLoading}
                />
                <FormInput
                  form={form}
                  name="emailConfig.from"
                  label="From Email"
                  placeholder="noreply@myapp.com"
                  isLoading={isLoading}
                />
                <FormInput
                  form={form}
                  name="emailConfig.fromName"
                  label="From Name"
                  placeholder="My App"
                  isLoading={isLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                form.reset();
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <LoadingButton type="submit" isLoading={form.formState.isSubmitting || isLoading}>
              {isEditMode ? "Save Changes" : "Create Application"}
            </LoadingButton>
          </div>
        </motion.form>
      </FormProvider>
    </Modal>
  );
}
