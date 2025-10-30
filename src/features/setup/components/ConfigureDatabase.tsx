import FormError from "@/components/shared/FormError";
import { FormInput } from "@/components/shared/FormInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { FormProvider } from "react-hook-form";
import type { PostgresConfig, AllowedDatabases } from "../types";
import { useConfigureDatabaseForm } from "../hooks/useConfigureDatabaseForm";
import ConfigDialog from "./ConfigDialog";
import { useEffect } from "react";
import FadeSlide from "@/components/shared/animations/FadeSlide";

export default function ConfigureDatabase({
  databaseType,
  initialConfig,
  onConnectionSuccess,
  open,
  onOpenChange,
}: {
  databaseType: AllowedDatabases;
  initialConfig: PostgresConfig;
  onConnectionSuccess: (cfg: PostgresConfig) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { form, handleSubmit, isLoading } = useConfigureDatabaseForm(databaseType, initialConfig, (cfg) => {
    onConnectionSuccess(cfg);
    onOpenChange(false);
  });

  useEffect(() => {
    if (open) {
      form.reset(initialConfig);
    }
  }, [open, initialConfig, form]);

  const rootError = form.formState.errors.root?.message;

  return (
    <ConfigDialog title="Configure your database" open={open} onOpenChange={onOpenChange}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <FormInput form={form} name="host" label="Host" placeholder="localhost" />
            <FormInput form={form} name="port" label="Port" placeholder="5432" />
            <FormInput form={form} name="user" label="User" placeholder="postgres" />
            <FormInput form={form} name="password" label="Password" placeholder="••••••" type="password" />
            <FormInput form={form} name="database" label="Database" placeholder="authforge" />
          </div>

          <div className="min-h-[3rem]">
            <FadeSlide visible={!!rootError} direction="down" className="text-sm text-destructive">
              <FormError message={rootError!} />
            </FadeSlide>
          </div>

          <div className="flex justify-end gap-3">
            <LoadingButton
              type="submit"
              isLoading={isLoading}
              loadingText="Testing configuration..."
              className="border border-primary/20 bg-primary/10 hover:bg-primary/30 text-primary"
            >
              Test Connection
            </LoadingButton>
          </div>
        </form>
      </FormProvider>
    </ConfigDialog>
  );
}
