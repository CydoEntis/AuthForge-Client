import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useZodForm } from "@/hooks/useZodForm";
import { useFormMutation } from "@/hooks/useFormMutation";
import { applicationsApi } from "@/features/applications/api";
import type { CreateApplication } from "@/features/applications/types";
import ManageOrigins from "@/features/applications/components/ManageOrigins";
import SelectAppEmailProvider from "@/features/applications/components/SelectAppEmailProvider";
import EmailProviderSettingsForm from "@/components/EmailProviderSettingsForm";

export const Route = createFileRoute("/(private)/applications/create")({
  component: CreateApplicationPage,
});

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

function CreateApplicationPage() {
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
      navigate({ to: "/applications/$id", params: { id: data.applicationId } });
    },
  });

  const emailProvider = form.watch("emailProvider");
  const googleEnabled = form.watch("googleEnabled");
  const githubEnabled = form.watch("githubEnabled");

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/applications" })}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Application</h1>
          <p className="text-muted-foreground">Set up a new application with authentication</p>
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="space-y-8">
          {/* Application Details */}
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
              <CardDescription>Basic information about your application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInput form={form} name="name" label="Application Name" placeholder="My Awesome App" />
              <FormInput
                form={form}
                name="description"
                label="Description (Optional)"
                placeholder="What does this application do?"
              />
            </CardContent>
          </Card>

          {/* Allowed Origins */}
          <Card>
            <CardHeader>
              <CardTitle>Allowed Origins</CardTitle>
              <CardDescription>Domains that can authenticate with this application</CardDescription>
            </CardHeader>
            <CardContent>
              <ManageOrigins name="allowedOrigins" />
            </CardContent>
          </Card>

          {/* Email Provider */}
          <Card>
            <CardHeader>
              <CardTitle>Email Provider</CardTitle>
              <CardDescription>Configure email settings for authentication emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SelectAppEmailProvider form={form} />
              <EmailProviderSettingsForm form={form} provider={emailProvider} />
            </CardContent>
          </Card>

          {/* OAuth Providers */}
          <Card>
            <CardHeader>
              <CardTitle>OAuth Providers (Optional)</CardTitle>
              <CardDescription>Allow users to sign in with their existing accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Google OAuth */}
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">Google OAuth</Label>
                    <p className="text-sm text-muted-foreground">Allow users to sign in with Google</p>
                  </div>
                  <Switch
                    checked={googleEnabled}
                    onCheckedChange={(checked) => form.setValue("googleEnabled", checked)}
                  />
                </div>

                {googleEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-4 pt-4 border-t"
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
                          label={"Client Secret"}
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

                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-2">Setup Instructions:</p>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                        <li>
                          <a
                            href="https://console.cloud.google.com/apis/credentials"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                          >
                            Google Cloud Console
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </li>
                        <li>Create a new OAuth 2.0 Client ID</li>
                        <li>Set application type to "Web application"</li>
                        <li>Add your redirect URI (you'll get this after creating the app)</li>
                        <li>Copy Client ID and Client Secret above</li>
                      </ol>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* GitHub OAuth */}
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold">GitHub OAuth</Label>
                    <p className="text-sm text-muted-foreground">Allow users to sign in with GitHub</p>
                  </div>
                  <Switch
                    checked={githubEnabled}
                    onCheckedChange={(checked) => form.setValue("githubEnabled", checked)}
                  />
                </div>

                {githubEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-4 pt-4 border-t"
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
                          label="Client Secret"
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

                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-2">Setup Instructions:</p>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                        <li>
                          <a
                            href="https://github.com/settings/developers"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                          >
                            GitHub Developer Settings
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </li>
                        <li>Click "New OAuth App"</li>
                        <li>Add your redirect URI (you'll get this after creating the app)</li>
                        <li>Copy Client ID and generate Client Secret</li>
                      </ol>
                    </div>
                  </motion.div>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                💡 You can skip OAuth now and configure it later in application settings
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/applications" })}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <LoadingButton type="submit" isLoading={mutation.isPending}>
              Create Application
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
