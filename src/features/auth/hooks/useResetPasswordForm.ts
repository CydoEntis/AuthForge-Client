import { useZodForm } from "@/hooks/useZodForm";
import { Route } from "@/routes/(public)/(auth)/reset-password";
import type { ResetPasswordRequest } from "../auth.types";
import { resetPasswordSchema } from "../auth.schemas";
import { useResetPasswordMutation } from "./useResetPasswordMutation";

export function useResetPasswordForm() {
  const { token } = Route.useSearch();

  if (!token) {
    throw new Error("Missing reset token — should have been caught by beforeLoad");
  }

  const form = useZodForm<ResetPasswordRequest>(resetPasswordSchema, {
    defaultValues: {
      token: token,
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const mutation = useResetPasswordMutation(form.setError);

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
  };
}
