import { useZodForm } from "@/hooks/useZodForm";
import type { AdminChangePasswordRequest } from "../admin.types";
import { useAdminChangePasswordMutation } from "./useAdminChangePasswordMutation";
import { changePasswordSchema } from "@/schemas/shared.schemas";

export function useAdminChangePasswordForm() {
  const form = useZodForm<AdminChangePasswordRequest>(changePasswordSchema, {
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const mutation = useAdminChangePasswordMutation(form.setError);

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
