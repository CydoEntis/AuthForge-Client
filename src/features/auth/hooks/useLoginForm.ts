import { useZodForm } from "@/hooks/useZodForm";
import { useEffect } from "react";
import { loginSchema } from "../auth.schemas";
import type { LoginRequest } from "../auth.types";
import { useLoginMutation } from "./useLoginMutation";

export function useLoginForm() {
  const form = useZodForm<LoginRequest>(loginSchema, {
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useLoginMutation(form.setError);

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
