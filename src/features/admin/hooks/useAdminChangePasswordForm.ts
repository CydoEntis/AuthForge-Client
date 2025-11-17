import { useZodForm } from "@/hooks/useZodForm";
import { adminChangePasswordSchema } from "../admin.schemas";
import type { AdminChangePasswordRequest } from "../admin.types";
import { useAdminChangePasswordMutation } from "./useAdminChangePasswordMutation";

export function useAdminChangePasswordForm() {
  const form = useZodForm<AdminChangePasswordRequest>(adminChangePasswordSchema, {
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const mutation = useAdminChangePasswordMutation();

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
