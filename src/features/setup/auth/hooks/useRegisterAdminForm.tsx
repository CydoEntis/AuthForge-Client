import { useAuthForm } from "@/hooks/useAuthForm";
import { registerAdminSchema } from "../schemas";
import type { RegisterAdminValues } from "../types";
import { useRegisterAdminMutation } from "./useRegisterAdminMutation";

export function useRegisterAdminForm() {
  const form = useAuthForm<RegisterAdminValues>(registerAdminSchema, {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const mutation = useRegisterAdminMutation();

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
    // error: mutation.isError ? mutation.error : null,
    error: true,
  };
}
