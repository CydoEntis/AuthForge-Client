import { useZodForm } from "@/hooks/useZodForm";
import { adminResetPasswordSchema } from "../admin.schemas";
import type { AdminResetPasswordRequest } from "../admin.types";
import { useAdminResetPasswordMutation } from "./useAdminResetPasswordMutation";
import { Route } from "@/routes/(public)/(auth)/reset-password";

export function useAdminResetPasswordForm() {
  const { token } = Route.useSearch();

  if (!token) {
    throw new Error("Missing reset token — should have been caught by beforeLoad");
  }

  const form = useZodForm<AdminResetPasswordRequest>(adminResetPasswordSchema, {
    defaultValues: {
      token: token,
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const mutation = useAdminResetPasswordMutation(form.setError);

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
  };
}
