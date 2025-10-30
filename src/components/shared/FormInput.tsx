import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import FadeSlide from "./animations/FadeSlide";

interface FormInputProps {
  form: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  isLoading?: boolean;
}

export function FormInput({
  form,
  name,
  label,
  placeholder,
  type = "text",
  className,
  isLoading = false,
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

          <div className="relative min-h-[.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              <FadeSlide visible={!!error} className="absolute text-sm text-destructive">
                <FormMessage />
              </FadeSlide>
            </AnimatePresence>
          </div>
        </FormItem>
      )}
    />
  );
}
