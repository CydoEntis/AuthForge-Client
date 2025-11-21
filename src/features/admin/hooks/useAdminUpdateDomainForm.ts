import { useZodForm } from "@/hooks/useZodForm";
import { useAdminUpdateDomainMutation } from "./useAdminUpdateDomainMutation";
import { useEffect } from "react";
import { domainSchema } from "@/schemas/shared.schemas";

export function useAdminUpdateDomainForm(currentDomain?: string) {
  const form = useZodForm(domainSchema, {
    defaultValues: {
      authForgeDomain: "",
    },
  });

  const mutation = useAdminUpdateDomainMutation(form.setError);

  useEffect(() => {
    if (currentDomain) {
      form.reset({ authForgeDomain: currentDomain });
    }
  }, [currentDomain, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
  };
}
