import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-white">{label}</FormLabel>
          <FormControl>
            <Input {...field} type={type} placeholder={placeholder} disabled={isLoading} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
