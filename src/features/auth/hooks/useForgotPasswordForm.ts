import { useZodForm } from "@/hooks/useZodForm";
import type { ForgotPasswordRequest } from "../auth.types";
import { forgotPasswordSchema } from "../auth.schemas";
import { useForgotPasswordMutation } from "./useForgotPasswordMutation";

export function useForgotPasswordForm() {
  const form = useZodForm<ForgotPasswordRequest>(forgotPasswordSchema, {
    defaultValues: {
      email: "",
    },
  });

  const mutation = useForgotPasswordMutation(form.setError);

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
  };
}
