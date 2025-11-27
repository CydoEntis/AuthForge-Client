import { useZodForm } from "@/hooks/useZodForm";
import { useAdminUpdateDomainMutation } from "./useAdminUpdateDomainMutation";
import { useEffect } from "react";
import { domainSchema } from "@/schemas/shared.schemas";

export function useAdminUpdateDomainForm(currentDomain?: string) {
  const form = useZodForm(domainSchema, {
    defaultValues: {
      domain: "",
    },
  });

  const mutation = useAdminUpdateDomainMutation(form.setError);

  useEffect(() => {
    if (currentDomain) {
      form.reset({ domain: currentDomain });
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
