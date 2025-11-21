import { useZodForm } from "@/hooks/useZodForm";
import type { AdminResetPasswordRequest } from "../admin.types";
import { useAdminResetPasswordMutation } from "./useAdminResetPasswordMutation";
import { Route } from "@/routes/(public)/(auth)/reset-password";
import { resetPasswordSchema } from "@/schemas/shared.schemas";

export function useAdminResetPasswordForm() {
  const { token } = Route.useSearch();

  if (!token) {
    throw new Error("Missing reset token — should have been caught by beforeLoad");
  }

  const form = useZodForm<AdminResetPasswordRequest>(resetPasswordSchema, {
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
