import { useZodForm } from "@/hooks/useZodForm";
import { adminUpdateDomainSchema } from "../admin.schemas";
import type { AdminUpdateDomainRequest } from "../admin.types";
import { useAdminUpdateDomainMutation } from "./useAdminUpdateDomainMutation";

export function useAdminUpdateDomainForm() {
  const form = useZodForm<AdminUpdateDomainRequest>(adminUpdateDomainSchema, {
    defaultValues: {
      authForgeDomain: "",
    },
  });

  const mutation = useAdminUpdateDomainMutation(form.setError);

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
  };
}
