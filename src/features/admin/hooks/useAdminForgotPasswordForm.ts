import { useZodForm } from "@/hooks/useZodForm";
import { useAdminForgotPasswordMutation } from "./useAdminForgotPasswordMutation";
import type { AdminForgotPasswordRequest } from "../admin.types";
import { adminForgotPasswordSchema } from "../admin.schemas";

export function useAdminForgotPasswordForm() {
  const form = useZodForm<AdminForgotPasswordRequest>(adminForgotPasswordSchema, {
    defaultValues: {
      email: "",
    },
  });

  const mutation = useAdminForgotPasswordMutation(form.setError);

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
  };
}
