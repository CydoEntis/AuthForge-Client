import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AnimatePresence } from "framer-motion";
import FadeSlide from "./animations/FadeSlide";

interface FormInputProps {
  form: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  isLoading?: boolean;
  description?: string; // ✅ Add this
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
}: FormInputProps) {
  const error = form.formState.errors?.[name]?.message as string | undefined;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} type={type} placeholder={placeholder} disabled={isLoading} />
          </FormControl>

          {/* ✅ Add description if provided */}
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
