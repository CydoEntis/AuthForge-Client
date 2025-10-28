// hooks/useLoginAdminForm.ts
import { useAuthForm } from "@/hooks/useAuthForm";
import { loginAdminSchema } from "../schemas";
import type { LoginAdminValues } from "../types";
import { authApi } from "../api";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormMutation } from "@/hooks/useFormMutation";

export function useLoginAdminForm() {
  const form = useAuthForm<LoginAdminValues>(loginAdminSchema, {
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setTokens, setAdmin } = useAuthStore();

  const mutation = useFormMutation({
    mutationFn: authApi.loginAdmin,
    setError: form.setError,
    successMessage: "Login successful!",
    onSuccess: (data) => {
      const { tokens, admin } = data;
      setTokens(tokens.accessToken, tokens.refreshToken);
      setAdmin(admin);
      navigate({ to: "/dashboard" });
    },
  });

  const handleSubmit = form.handleSubmit((values) => mutation.mutate(values));

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
    error: mutation.isError ? mutation.error : null,
  };
}
