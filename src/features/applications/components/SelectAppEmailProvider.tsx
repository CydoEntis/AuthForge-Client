import { Field, FieldContent, FieldGroup, FieldLabel, FieldSet, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "@/features/theme/hooks/useTheme";
import ResendBlack from "@/assets/resend-icon-black.svg";
import ResendWhite from "@/assets/resend-icon-white.svg";
import { Mail } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { EMAIL_PROVIDERS } from "@/types/shared.types";
import { cn } from "@/lib/utils";

type SelectAppEmailProviderProps = {
  form: UseFormReturn<any>;
};

export default function SelectAppEmailProvider({ form }: SelectAppEmailProviderProps) {
  const { theme } = useTheme();
  const resendImg = theme === "dark" ? ResendWhite : ResendBlack;

  const selectedProvider = form.watch("emailProvider") || EMAIL_PROVIDERS.SMTP;

  return (
    <div className="w-full">
      <FieldGroup className="pb-2">
        <FieldSet>
          <RadioGroup
            value={selectedProvider}
            onValueChange={(val) => form.setValue("emailProvider", val)}
            className="flex gap-4"
          >
            <FieldLabel
              className={cn(
                "inset-shadow rounded-xl border transition-all duration-200 inset-shadow",
                selectedProvider === EMAIL_PROVIDERS.SMTP
                  ? "border-primary bg-linear-to-t from-primary/10 to-card"
                  : "bg-linear-to-t from-card to-background dark:border-black border-[#c7c7c7]"
              )}
              htmlFor="smtp"
            >
              <Field orientation="horizontal">
                <FieldContent>
                  <div className="flex items-center gap-4 h-14">
                    <Mail size={40} className="shrink-0" />
                    <FieldTitle>SMTP</FieldTitle>
                  </div>
                </FieldContent>
                <RadioGroupItem id="smtp" value={EMAIL_PROVIDERS.SMTP} />
              </Field>
            </FieldLabel>

            <FieldLabel
              className={cn(
                "rounded-xl border transition-all duration-200 inset-shadow",
                selectedProvider === EMAIL_PROVIDERS.RESEND
                  ? "border-primary bg-linear-to-t from-primary/20 to-card"
                  : "bg-linear-to-t from-card to-background dark:border-black border-[#c7c7c7]"
              )}
              htmlFor="resend"
            >
              <Field orientation="horizontal">
                <FieldContent>
                  <div className="flex items-center gap-4 h-14">
                    <img src={resendImg} className="h-full w-auto object-contain" />
                    <FieldTitle>Resend</FieldTitle>
                  </div>
                </FieldContent>
                <RadioGroupItem id="resend" value={EMAIL_PROVIDERS.RESEND} />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  );
}
