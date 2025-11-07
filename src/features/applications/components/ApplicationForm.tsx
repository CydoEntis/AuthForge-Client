import { FormProvider } from "react-hook-form";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { useZodForm } from "@/hooks/useZodForm";
import { z } from "zod";
import { FormInput } from "@/components/shared/FormInput";
import { motion, AnimatePresence } from "framer-motion";
import SelectAppEmailProvider from "./SelectAppEmailProvider";
import { useEffect } from "react";
import type { Application, CreateApplication } from "../types";
import FieldSetSection from "@/components/shared/FieldSetSection";
import ManageOrigins from "./ManageOrigins";
import EmailProviderSettings from "@/components/shared/EmailProviderSettings";

const applicationFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  allowedOrigins: z.array(z.string().url("Invalid URL")).min(1, "At least one origin is required"),
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

interface ApplicationFormProps {
  onSubmit: (data: CreateApplication) => Promise<void>;
  application?: Application | null;
  isLoading?: boolean;
}

export default function ApplicationForm({ onSubmit, application, isLoading = false }: ApplicationFormProps) {
  const isEditMode = !!application;

  const form = useZodForm<ApplicationFormValues>(applicationFormSchema, {
    emailProvider: "Smtp",
  });

  useEffect(() => {
    if (application) {
      const emailProvider = application.emailSettings?.provider || "Smtp";

      form.reset({
        name: application.name,
        description: application.description || "",
        allowedOrigins: application.allowedOrigins,
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
      allowedOrigins: values.allowedOrigins,
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
    <FormProvider {...form}>
      <motion.form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-10" layout>
        <FieldSetSection title="Application Details">
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
        </FieldSetSection>

        <FieldSetSection title="Allowed Origins">
          <ManageOrigins name="allowedOrigins" isLoading={isLoading} />
        </FieldSetSection>

        <FieldSetSection title="Email Provider">
          <SelectAppEmailProvider form={form} />
          <EmailProviderSettings form={form} provider={selectedEmailProvider} isLoading={isLoading} />
        </FieldSetSection>

        <div className="flex justify-end gap-3 mt-4">
          <LoadingButton type="submit" isLoading={form.formState.isSubmitting || isLoading}>
            {isEditMode ? "Save Changes" : "Create Application"}
          </LoadingButton>
        </div>
      </motion.form>
    </FormProvider>
  );
}
