import { useZodForm } from "@/hooks/useZodForm";
import { useEffect } from "react";
import { domainSchema } from "@/features/admin/admin.schemas";
import { useUpdateDomainMutation } from "./useUpdateDomainMutation";

export function useUpdateDomainForm(currentDomain?: string) {
  const form = useZodForm(domainSchema, {
    defaultValues: {
      authForgeDomain: "",
    },
  });

  const mutation = useUpdateDomainMutation(form.setError);

  useEffect(() => {
    if (currentDomain) {
      form.reset({ authForgeDomain: currentDomain });
    }
  }, [currentDomain, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    console.log;
    await mutation.mutateAsync(values);
  });

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
  };
}
