import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useZodForm } from "@/hooks/useZodForm";
import { useFormMutation } from "@/hooks/useFormMutation";
import { applicationsApi } from "../api";
import type { CreateApplication } from "../types";
import Modal from "@/components/shared/Modal";
import FieldSetSection from "@/components/shared/FieldSetSection";
import ManageOrigins from "./ManageOrigins";
import SelectAppEmailProvider from "./SelectAppEmailProvider";
import EmailProviderSettingsForm from "@/components/EmailProviderSettingsForm";

const createApplicationSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().optional(),
    allowedOrigins: z.array(z.string().url("Invalid URL")).min(1, "At least one origin is required"),
    emailProvider: z.enum(["Smtp", "Resend"]),

    // Email fields
    fromEmail: z.string().email("Must be valid email"),
    fromName: z.string().min(1, "From name is required"),
    smtpHost: z.string().optional(),
    smtpPort: z.union([z.string(), z.number()]).optional(),
    smtpUsername: z.string().optional(),
    smtpPassword: z.string().optional(),
    useSsl: z.boolean().default(true),
    resendApiKey: z.string().optional(),

    // OAuth fields
    googleEnabled: z.boolean().default(false),
    googleClientId: z.string().optional(),
    googleClientSecret: z.string().optional(),
    githubEnabled: z.boolean().default(false),
    githubClientId: z.string().optional(),
    githubClientSecret: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.emailProvider === "Smtp") {
        return !!(data.smtpHost && data.smtpPort && data.smtpUsername && data.smtpPassword);
      }
      return true;
    },
    { message: "All SMTP fields required", path: ["smtpHost"] }
  )
  .refine(
    (data) => {
      if (data.emailProvider === "Resend") {
        return !!data.resendApiKey;
      }
      return true;
    },
    { message: "Resend API key required", path: ["resendApiKey"] }
  )
  .refine(
    (data) => {
      if (data.googleEnabled) {
        return !!data.googleClientId && !!data.googleClientSecret;
      }
      return true;
    },
    { message: "Client ID and Secret required", path: ["googleClientId"] }
  )
  .refine(
    (data) => {
      if (data.githubEnabled) {
        return !!data.githubClientId && !!data.githubClientSecret;
      }
      return true;
    },
    { message: "Client ID and Secret required", path: ["githubClientId"] }
  );

type CreateApplicationFormValues = z.infer<typeof createApplicationSchema>;

interface CreateApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateApplicationModal({ open, onOpenChange }: CreateApplicationModalProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showGoogleSecret, setShowGoogleSecret] = useState(false);
  const [showGithubSecret, setShowGithubSecret] = useState(false);

  const form = useZodForm<CreateApplicationFormValues>(createApplicationSchema, {
    defaultValues: {
      emailProvider: "Smtp",
      useSsl: true,
      googleEnabled: false,
      githubEnabled: false,
    },
  });

  const mutation = useFormMutation<CreateApplicationFormValues, any>({
    mutationFn: async (values) => {
      const payload: CreateApplication = {
        name: values.name,
        description: values.description,
        allowedOrigins: values.allowedOrigins,
        jwtSecret: null,
        emailSettings: {
          provider: values.emailProvider,
          apiKey: values.resendApiKey || "",
          fromEmail: values.fromEmail,
          fromName: values.fromName,
          passwordResetCallbackUrl: null,
          emailVerificationCallbackUrl: null,
        },
        oauthSettings:
          values.googleEnabled || values.githubEnabled
            ? {
                googleEnabled: values.googleEnabled,
                googleClientId: values.googleClientId,
                googleClientSecret: values.googleClientSecret,
                githubEnabled: values.githubEnabled,
                githubClientId: values.githubClientId,
                githubClientSecret: values.githubClientSecret,
              }
            : null,
      };

      return await applicationsApi.create(payload);
    },
    setError: form.setError,
    successMessage: "Application created successfully",
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      onOpenChange(false);
      form.reset();
      navigate({ to: "/applications/$id", params: { id: data.applicationId } });
    },
  });

  const emailProvider = form.watch("emailProvider");
  const googleEnabled = form.watch("googleEnabled");
  const githubEnabled = form.watch("githubEnabled");

  return (
    <Modal
      title="Create New Application"
      open={open}
      onOpenChange={onOpenChange}
      className="max-w-3xl max-h-[90vh] overflow-y-auto"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="space-y-6">
          <FieldSetSection title="Application Details">
            <FormInput form={form} name="name" label="Name" placeholder="My Awesome App" />
            <FormInput form={form} name="description" label="Description" placeholder="What does this app do?" />
          </FieldSetSection>

          <FieldSetSection title="Allowed Origins">
            <ManageOrigins name="allowedOrigins" />
          </FieldSetSection>

          <FieldSetSection title="Email Provider">
            <SelectAppEmailProvider form={form} />
            <EmailProviderSettingsForm form={form} provider={emailProvider} />
          </FieldSetSection>

          <FieldSetSection title="OAuth (Optional)">
            {/* Google */}
            <div className="space-y-3 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <Label className="text-base">Google OAuth</Label>
                <Switch
                  checked={googleEnabled}
                  onCheckedChange={(checked) => form.setValue("googleEnabled", checked)}
                />
              </div>

              {googleEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-3 pt-3 border-t"
                >
                  <FormInput
                    form={form}
                    name="googleClientId"
                    label="Client ID"
                    placeholder="123456789-abc.apps.googleusercontent.com"
                  />
                  <div className="space-y-2">
                    <Label>Client Secret</Label>
                    <div className="flex gap-2">
                      <FormInput
                        form={form}
                        name="googleClientSecret"
                        type={showGoogleSecret ? "text" : "password"}
                        placeholder="GOCSPX-..."
                        label={""}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setShowGoogleSecret(!showGoogleSecret)}
                      >
                        {showGoogleSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <a
                      href="https://console.cloud.google.com/apis/credentials"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Google Cloud Console
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </p>
                </motion.div>
              )}
            </div>

            {/* GitHub */}
            <div className="space-y-3 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <Label className="text-base">GitHub OAuth</Label>
                <Switch
                  checked={githubEnabled}
                  onCheckedChange={(checked) => form.setValue("githubEnabled", checked)}
                />
              </div>

              {githubEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-3 pt-3 border-t"
                >
                  <FormInput form={form} name="githubClientId" label="Client ID" placeholder="Iv1.abc123def456" />
                  <div className="space-y-2">
                    <Label>Client Secret</Label>
                    <div className="flex gap-2">
                      <FormInput
                        form={form}
                        name="githubClientSecret"
                        type={showGithubSecret ? "text" : "password"}
                        placeholder="ghp_..."
                        label={""}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setShowGithubSecret(!showGithubSecret)}
                      >
                        {showGithubSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <a
                      href="https://github.com/settings/developers"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      GitHub Developer Settings
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </p>
                </motion.div>
              )}
            </div>
          </FieldSetSection>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={mutation.isPending}>
              Cancel
            </Button>
            <LoadingButton type="submit" isLoading={mutation.isPending}>
              Create Application
            </LoadingButton>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
