import { useAuthForm } from "@/hooks/useAuthForm";
import { loginAdminSchema } from "../schemas";
import type { LoginAdminValues } from "../types";
import { useForgotPasswordAdminMutation } from "./useForgotPasswordAdminMutation";

export function useForgotPasswordAdminForm() {
  const form = useAuthForm<LoginAdminValues>(loginAdminSchema, {
    email: "",
  });

  const mutation = useForgotPasswordAdminMutation();

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
