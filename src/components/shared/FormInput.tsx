import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface FormInputProps {
  form: any;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  isLoading?: boolean;
  description?: string;
  autoComplete?: string;
  hideLabel?: boolean;
  showPasswordToggle?: boolean;
}

export function FormInput({
  form,
  name,
  label,
  placeholder,
  type = "text",
  className,
  isLoading = false,
  description,
  autoComplete,
  hideLabel = false,
  showPasswordToggle = false,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const error = form.formState.errors?.[name]?.message as string | undefined;

  const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {!hideLabel && label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={inputType}
                placeholder={placeholder}
                disabled={isLoading}
                autoComplete={autoComplete}
                className={showPasswordToggle ? "pr-10" : ""}
              />
              {showPasswordToggle && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              )}
            </div>
          </FormControl>

          {description && !error && (
            <FormDescription className="text-xs text-muted-foreground">{description}</FormDescription>
          )}

          <div className="">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
