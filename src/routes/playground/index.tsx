import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/shared/AuthCard";
import { FormInput } from "@/components/shared/FormInput";
import FormError from "@/components/shared/FormError";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { useTheme } from "@/features/theme/hooks/useTheme";
import ResendBlack from "../../../public/resend-icon-black.svg";
import ResendWhite from "../../../public/resend-icon-white.svg";
import { Check, Lock, Mail } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormMutation } from "@/hooks/useFormMutation";
import SetupOptionCard from "@/features/setup/auth/components/SetupOptionCard";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";

// --------------------------
// Zod Schemas
// --------------------------
const adminSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const postgresSchema = z.object({
  host: z.string().min(1),
  port: z.string().min(1),
  user: z.string().min(1),
  password: z.string().min(1),
  database: z.string().min(1),
});

const smtpSchema = z.object({
  host: z.string().min(1),
  port: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
});

const resendSchema = z.object({
  apiKey: z.string().min(1),
});

// --------------------------
// Wizard Steps Enum
// --------------------------
type WizardStep = "welcome" | "selectDatabase" | "selectEmailProvider" | "configureEmail" | "done";

// --------------------------
// Main Route Component
// --------------------------
export const Route = createFileRoute("/playground/")({
  component: SetupWizard,
});

export function SetupWizard() {
  const { theme } = useTheme();
  const [step, setStep] = useState<WizardStep>("welcome");
  const [selectedDatabase, setSelectedDatabase] = useState<"SQLite" | "PostgreSQL" | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<"SMTP" | "Resend" | null>(null);

  const [postgresConfig, setPostgresConfig] = useState({});
  const [emailConfig, setEmailConfig] = useState({});
  const resendImg = theme === "dark" ? ResendWhite : ResendBlack;

  function renderStep() {
    switch (step) {
      case "welcome":
        return (
          <section className="min-h-screen w-2/5 mx-auto">
            <div className="my-18 flex flex-col justify-center space-y-8">
              <span className="inline-flex px-2 py-1 border rounded-full gap-2 border-primary/30 bg-primary/10 text-sm items-center font-semibold mx-auto">
                Auth that just works <Lock size={16} />
              </span>

              <div className="space-y-4 w-3/4 mx-auto">
                <h3 className="text-5xl leading-tight font-bold text-center">Authentication, Your Way</h3>
                <p className="text-lg font-semibold text-center">
                  From user login to password resets, Auth Forge lets you self-host authentication without sacrificing
                  speed or security. Easy setup, full control, and zero surprises.
                </p>
              </div>

              <Card className="w-[650px] mx-auto p-4 bg-linear-to-b from-muted/20 via-background to-bg-background border-border/30">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold">Setup Progress</h3>
                  <div className="px-1.5 py-1 bg-input rounded text-xs font-semibold shadow-md">Step 3 of 5</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary rounded-full w-8 h-8 text-black flex justify-center items-center">
                      <Check size={16} />
                    </div>
                    <p>Create Admin</p>
                  </div>
                  <div className="px-1.5 py-1 bg-primary/20 text-primary rounded text-xs font-semibold shadow-md">
                    Complete
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="border border-primary/20 bg-primary/10 rounded-full w-8 h-8 text-primary flex justify-center items-center">
                      2
                    </div>
                    <p>Choose Database</p>
                  </div>
                  <div className="px-1.5 py-1 border text-foreground rounded text-xs font-semibold shadow-md">
                    Current
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-muted-foreground/20 rounded-full w-8 h-8 text-muted-foreground flex justify-center items-center">
                      3
                    </div>
                    <p>Choose Email Provider</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress value={33} />
                  <p className="text-sm text-muted-foreground">33% Complete - Keep going!</p>
                </div>
              </Card>

              <div className="flex flex-col justify-center items-center space-y-4">
                <h3 className="text-center text-muted-foreground">
                  Time to forge your own authentication system. We’ll walk you through everything you need to get
                  started.
                </h3>
                <Button
                  className="border border-primary/30 bg-primary/10 text-foreground rounded"
                  onClick={() => setStep("selectDatabase")}
                >
                  Ready to Begin
                </Button>
              </div>
            </div>
          </section>
        );

      case "selectDatabase":
        return (
          <motion.div
            layout
            className="flex flex-col items-center justify-center min-h-[70vh]"
            transition={{ layout: { duration: 0.4, type: "spring" } }}
          >
            <AnimatePresence mode="wait">
              {!selectedDatabase ? (
                <motion.div
                  key="db-selection"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="flex justify-center gap-6"
                >
                  {["SQLite", "PostgreSQL"].map((db) => (
                    <SetupOptionCard
                      key={db}
                      title={db}
                      description={
                        db === "SQLite"
                          ? "No setup needed — start instantly with local storage"
                          : "Connect to your own Postgres instance"
                      }
                      iconClass={db === "SQLite" ? "devicon-sqlite-plain" : "devicon-postgresql-plain"}
                      selected={false}
                      onSelect={() => setSelectedDatabase(db as "SQLite" | "PostgreSQL")}
                    />
                  ))}
                </motion.div>
              ) : (
                <div>
                  <motion.div
                    key="db-config"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col md:flex-row items-start justify-center gap-8 w-full max-w-4xl"
                  >
                    <div className="relative">
                      <SetupOptionCard
                        title={selectedDatabase}
                        description={
                          selectedDatabase === "SQLite"
                            ? "No setup needed — start instantly with local storage"
                            : "Connect to your own Postgres instance"
                        }
                        iconClass={selectedDatabase === "SQLite" ? "devicon-sqlite-plain" : "devicon-postgresql-plain"}
                        selected
                        onSelect={function (): void {
                          throw new Error("Function not implemented.");
                        }}
                      />
                    </div>

                    <motion.div layout className="w-full md:flex-1 flex flex-col items-center md:items-start">
                      {selectedDatabase === "PostgreSQL" ? (
                        <DatabaseConfigStep
                          initialConfig={postgresConfig}
                          onSave={(cfg) => {
                            setPostgresConfig(cfg);
                            setStep("selectEmailProvider");
                          }}
                        />
                      ) : (
                        <div className="p-6 border rounded-lg text-center bg-muted/10 w-full">
                          <h3 className="text-xl font-semibold mb-2">SQLite Selected</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            No setup needed — Auth Forge will use a local SQLite database.
                          </p>
                          <Button onClick={() => setStep("selectEmailProvider")}>Continue</Button>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                  <div className="flex w-full justify-center gap-4 items-center mt-4">
                    <Button
                      variant="outline"
                      className=" text-xs opacity-80 hover:opacity-100"
                      onClick={() => setSelectedDatabase(null)}
                    >
                      ← Back
                    </Button>
                    <Button className="" onClick={() => setSelectedDatabase(null)}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case "selectEmailProvider":
        return (
          <div className="flex flex-wrap gap-6 justify-center">
            <SetupOptionCard
              title="SMTP"
              description="Use your existing SMTP credentials"
              icon={<Mail size={80} />}
              selected={selectedEmail === "SMTP"}
              onSelect={() => {
                setSelectedEmail("SMTP");
                setStep("configureEmail");
              }}
            />
            <SetupOptionCard
              title="Resend"
              description="Use Resend’s modern email API"
              imageSrc={resendImg}
              selected={selectedEmail === "Resend"}
              onSelect={() => {
                setSelectedEmail("Resend");
                setStep("configureEmail");
              }}
            />
          </div>
        );

      case "configureEmail":
        return (
          <EmailConfigStep
            provider={selectedEmail!}
            initialConfig={emailConfig}
            onSave={(cfg) => {
              setEmailConfig(cfg);
              setStep("done");
            }}
          />
        );

      case "done":
        return <AuthCard title="Setup Complete" subText="You can now start using Auth Forge!" children={undefined} />;
    }
  }

  return <section className="min-h-screen">{renderStep()}</section>;
}

// --------------------------
// Database Config Step
// --------------------------
function DatabaseConfigStep({ initialConfig, onSave }: { initialConfig: any; onSave: (cfg: any) => void }) {
  const form = useForm({
    resolver: zodResolver(postgresSchema),
    defaultValues: initialConfig,
  });

  const { mutateAsync, isPending } = useFormMutation({
    mutationFn: async (values: any) => {
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

// --------------------------
// Email Config Step
// --------------------------
function EmailConfigStep({
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
        className="space-y-6"
      >
        <h2 className="text-xl font-semibold">{provider} Configuration</h2>
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
