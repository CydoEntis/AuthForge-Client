import { useZodForm } from "@/hooks/useZodForm";
import { useAdminLoginMutation } from "./useAdminLoginMutation";
import { useEffect } from "react";
import { adminLoginSchema } from "../admin.schemas";
import type { AdminLoginRequest } from "../admin.types";

export function useAdminLoginForm() {
  const form = useZodForm<AdminLoginRequest>(adminLoginSchema, {
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
