import { useEffect } from "react";
import { Info } from "lucide-react";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shared/FormInput";
import { useZodForm } from "@/hooks/useZodForm";
import type { DomainConfig } from "../../setup.types";
import { domainSchema } from "../../setup.schemas";
import { Card } from "@/components/ui/card";

type SetAppDomainProps = {
  authForgeDomain: string;
  onDomainChange: (domain: string) => void;
};

export function SetAppDomain({ authForgeDomain, onDomainChange }: SetAppDomainProps) {
  const form = useZodForm<DomainConfig>(domainSchema, {
    mode: "onChange",
    defaultValues: {
      authForgeDomain: authForgeDomain || "",
    },
  });

  useEffect(() => {
    if (!authForgeDomain) {
      const detected = `${window.location.protocol}//${window.location.host}`;
      form.setValue("authForgeDomain", detected);
      onDomainChange(detected);
    }
  }, []);

  const watchedDomain = form.watch("authForgeDomain");

  useEffect(() => {
    if (watchedDomain !== authForgeDomain) {
      onDomainChange(watchedDomain);
    }
  }, [watchedDomain, authForgeDomain, onDomainChange]);

  const isValid = domainSchema.safeParse({ authForgeDomain: watchedDomain }).success;

  return (
    <div className="flex flex-col h-full">
      <div className="text-center mb-8">
        <h3 className="text-4xl font-semibold">Configure AuthForge</h3>
        <p className="text-lg text-muted-foreground mt-2">
          Set up where AuthForge is hosted. This URL is used in email links.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-4">
          <Form {...form}>
            <form className="space-y-4">
              <FormInput
                form={form}
                name="authForgeDomain"
                label="AuthForge Public URL"
                placeholder="https://auth.mycompany.com"
                description="Auto-detected. Edit if needed (e.g., if using a reverse proxy)."
              />

              {watchedDomain && isValid && (
                <Card className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <div className="flex gap-2 items-center">
                    <Info className="w-5 h-5 text-muted-foreground  shrink-0" />
                    <p className="text-sm font-medium">Email links will look like:</p>
                  </div>
                  <div className="space-y-1">
                    <code className="text-xs text-muted-foreground block break-all">
                      {watchedDomain}/admin/reset-password?token=...
                    </code>
                  </div>
                </Card>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
