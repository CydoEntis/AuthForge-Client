import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "@/features/theme/hooks/useTheme";
import ResendBlack from "@/assets/resend-icon-black.svg";
import ResendWhite from "@/assets/resend-icon-white.svg";
import { Mail } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { EMAIL_PROVIDERS } from "@/features/setup/types";

type SelectAppEmailProviderProps = {
  form: UseFormReturn<any>;
};

export default function SelectAppEmailProvider({ form }: SelectAppEmailProviderProps) {
  const { theme } = useTheme();
  const resendImg = theme === "dark" ? ResendWhite : ResendBlack;

  const selectedProvider = form.watch("emailProvider") || EMAIL_PROVIDERS.SMTP;

  return (
    <div className="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <RadioGroup
            value={selectedProvider}
            onValueChange={(val) => form.setValue("emailProvider", val)}
            className="flex gap-4"
          >
            <FieldLabel className="bg-background" htmlFor="smtp">
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

            <FieldLabel className="bg-background" htmlFor="resend">
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
