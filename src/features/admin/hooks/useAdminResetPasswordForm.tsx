import { useZodForm } from "@/hooks/useZodForm";
import { adminResetPasswordSchema } from "../admin.schemas";
import type { AdminResetPasswordRequest } from "../admin.types";
import { useAdminResetPasswordMutation } from "./useAdminResetPasswordMutation";

export function useAdminResetPasswordForm() {
  const form = useZodForm<AdminResetPasswordRequest>(adminResetPasswordSchema, {
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const mutation = useAdminResetPasswordMutation();

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
