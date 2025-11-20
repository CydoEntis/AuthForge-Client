import { useZodForm } from "@/hooks/useZodForm";
import { useAdminUpdateDomainMutation } from "./useAdminUpdateDomainMutation";
import { adminUpdateDomainSchema } from "../admin.schemas";
import { useEffect } from "react";

export function useAdminUpdateDomainForm(currentDomain?: string) {
  const form = useZodForm(adminUpdateDomainSchema, {
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
