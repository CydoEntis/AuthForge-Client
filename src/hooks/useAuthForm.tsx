import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export function useAuthForm<T extends FieldValues = any>(
  schema: ZodType<any, any, any>,
  defaultValues?: Partial<T>
): UseFormReturn<T> {
  return useForm<T>({
    resolver: zodResolver(schema) as any,
    defaultValues: defaultValues as any,
  });
}
