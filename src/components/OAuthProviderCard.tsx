import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { FormInput } from "@/components/shared/FormInput";
import type { UseFormReturn } from "react-hook-form";

interface OAuthProviderCardProps {
  form: UseFormReturn<any>;
  provider: "Google" | "GitHub";
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  clientIdFieldName: string;
  clientSecretFieldName: string;
  setupUrl: string;
  instructions: string[];
}

export function OAuthProviderCard({
  form,
  provider,
  enabled,
  onEnabledChange,
  clientIdFieldName,
  clientSecretFieldName,
  setupUrl,
  instructions,
}: OAuthProviderCardProps) {
  const clientIdPlaceholder = provider === "Google" ? "123456789-abc.apps.googleusercontent.com" : "Iv1.abc123def456";

  const clientSecretPlaceholder = provider === "Google" ? "GOCSPX-..." : "ghp_...";

  return (
    <div className="space-y-4 p-4 inset-shadow rounded-xl bg-linear-to-t from-card to-background border dark:border-black border-[#c7c7c7]">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label className="text-base font-semibold">{provider} OAuth</Label>
          <p className="text-sm text-muted-foreground">Allow users to sign in with {provider}</p>
        </div>
        <Switch checked={enabled} onCheckedChange={onEnabledChange} />
      </div>

      {enabled && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-4 pt-4 border-t"
        >
          <FormInput form={form} name={clientIdFieldName} label="Client ID" placeholder={clientIdPlaceholder} />

          <FormInput
            form={form}
            name={clientSecretFieldName}
            label="Client Secret"
            placeholder={clientSecretPlaceholder}
            showPasswordToggle
          />

          <div className="bg-primary/10 p-3 text-sm border inset-shadow-sm border-black rounded-xl">
            <p className="font-medium mb-2">Setup Instructions:</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              {instructions.map((instruction, i) => (
                <li key={i}>
                  {i === 0 ? (
                    <a
                      href={setupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {instruction}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    instruction
                  )}
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}
    </div>
  );
}
