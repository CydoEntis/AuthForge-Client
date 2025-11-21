import { useZodForm } from "@/hooks/useZodForm";
import { useAdminLoginMutation } from "./useAdminLoginMutation";
import { useEffect } from "react";
import type { AdminLoginRequest } from "../admin.types";
import { loginSchema } from "@/schemas/shared.schemas";

export function useAdminLoginForm() {
  const form = useZodForm<AdminLoginRequest>(loginSchema, {
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useAdminLoginMutation(form.setError);

  useEffect(() => {
    const subscription = form.watch(() => {
      if (form.formState.errors.root) {
        form.clearErrors("root");
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleSubmit = form.handleSubmit((values) => mutation.mutate(values));

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
  };
}
