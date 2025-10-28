import { useAuthForm } from "@/hooks/useAuthForm";
import { useFormMutation } from "@/hooks/useFormMutation";
import { setupAdminSchema } from "../schemas";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/useAuthStore";
import { authApi } from "../api";
import type { SetupAdminValues } from "../types";

export function useSetupAdminForm() {
  const form = useAuthForm<SetupAdminValues>(setupAdminSchema, {
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { setTokens, setAdmin } = useAuthStore();

  const mutation = useFormMutation({
    mutationFn: authApi.setupAdmin,
    setError: form.setError,
    successMessage: "Admin account created successfully!",
    onSuccess: (data) => {
      const { tokens, admin } = data;
      console.log(data);
      setTokens(tokens.accessToken, tokens.refreshToken);
      setAdmin({
        id: admin.id,
        email: admin.email,
        createdAtUtc: admin.createdAtUtc,
      });

      navigate({ to: "/dashboard" });
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    console.log(values);
    mutation.mutate(values);
  });

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
  };
}
