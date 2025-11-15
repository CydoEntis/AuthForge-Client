import { useZodForm } from "@/hooks/useZodForm";

import { adminApi } from "../admin.api";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormMutation } from "@/hooks/useFormMutation";
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

  const navigate = useNavigate();
  const { setTokens } = useAuthStore();

  const mutation = useFormMutation({
    mutationFn: adminApi.login,
    setError: form.setError,
    successMessage: "Login successful!",
    onSuccess: (data) => {
      const { tokens } = data;
      setTokens(tokens.accessToken, tokens.refreshToken);
      navigate({ to: "/applications", viewTransition: { types: ["slide-right"] } });
    },
  });

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
    error: mutation.isError ? mutation.error : null,
  };
}
