import { useAuthForm } from "@/hooks/useAuthForm";
import { loginAdminSchema } from "../schemas";
import type { LoginAdminValues } from "../types";
import { useLoginAdminMutation } from "./useLoginAdminMutation";

export function useLoginAdminForm() {
  const form = useAuthForm<LoginAdminValues>(loginAdminSchema, {
    email: "",
    password: "",
  });

  const mutation = useLoginAdminMutation();

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
