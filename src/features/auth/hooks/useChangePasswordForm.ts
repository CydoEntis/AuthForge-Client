import { changePasswordSchema } from "@/features/auth/auth.schemas";
import type { ChangePasswordRequest } from "@/features/auth/auth.types";
import { useZodForm } from "@/hooks/useZodForm";
import { useChangePasswordMutation } from "./useChangePasswordMutation";

export function useChangePasswordForm() {
  const form = useZodForm<ChangePasswordRequest>(changePasswordSchema, {
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const mutation = useChangePasswordMutation(form.setError);

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
    error: mutation.isError ? mutation.error : null,
  };
}
