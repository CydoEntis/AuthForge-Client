import { useForm, type UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export function useZodForm<T extends FieldValues = any>(
  schema: ZodType<any, any, any>,
  options?: Omit<UseFormProps<T>, "resolver">
): UseFormReturn<T> {
  return useForm<T>({
    ...options, // ← Spread options
    resolver: zodResolver(schema) as any,
  });
}
