import FormError from "@/components/shared/FormError";
import { FormInput } from "@/components/shared/FormInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { FormProvider } from "react-hook-form";
import type { DatabaseConfig, AllowedDatabases } from "../setup.types";
import { useConfigureDatabaseForm } from "../hooks/useConfigureDatabaseForm";
import ConfigDialog from "../../../components/shared/Modal";
import { useEffect } from "react";
import FadeSlide from "@/components/shared/animations/FadeSlide";
import { DATABASE_DEFAULTS } from "../setup.constants";

export default function ConfigureDatabase({
  databaseType,
  initialConfig,
  onConnectionSuccess,
  open,
  onOpenChange,
}: {
  databaseType: AllowedDatabases;
  initialConfig: DatabaseConfig | null;
  onConnectionSuccess: (cfg: DatabaseConfig) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { form, handleSubmit, isLoading } = useConfigureDatabaseForm(databaseType, initialConfig, (cfg) => {
    onConnectionSuccess(cfg);
    onOpenChange(false);
  });

  useEffect(() => {
    if (open) {
      const defaults = DATABASE_DEFAULTS[databaseType];

      if (initialConfig) {
        form.reset(initialConfig);
      } else {
        form.reset({
          host: "localhost",
          port: defaults.port,
          user: defaults.defaultUser || "",
          password: "",
          database: defaults.defaultDatabase || "authforge",
        });
      }
    }
  }, [open, databaseType, initialConfig, form]);

  const rootError = form.formState.errors.root?.message;

  return (
    <ConfigDialog title={`Configure ${databaseType}`} open={open} onOpenChange={onOpenChange} className="max-w-2xl">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput form={form} name="host" label="Host" placeholder="localhost" isLoading={isLoading} />
            <FormInput
              form={form}
              name="port"
              label="Port"
              placeholder={DATABASE_DEFAULTS[databaseType].port}
              isLoading={isLoading}
            />
            <FormInput
              form={form}
              name="user"
              label="User"
              placeholder={DATABASE_DEFAULTS[databaseType].defaultUser || "user"}
              isLoading={isLoading}
            />
            <FormInput
              form={form}
              name="password"
              label="Password"
              placeholder="••••••"
              type="password"
              isLoading={isLoading}
              autoComplete="off"
            />
            <FormInput
              form={form}
              name="database"
              label="Database"
              placeholder={DATABASE_DEFAULTS[databaseType].defaultDatabase || "authforge"}
              className="col-span-2"
              isLoading={isLoading}
            />
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
