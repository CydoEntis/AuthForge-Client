import { useEffect } from "react";
import { useZodForm } from "@/hooks/useZodForm";
import { useUpdateDomainMutation } from "./useUpdateDomainMutation";
import { updateDomainSchema } from "../settings.schema";
import type { UpdateDomainRequest } from "../settings.types";

export function useUpdateDomainForm(currentDomain?: string) {
  const form = useZodForm<UpdateDomainRequest>(updateDomainSchema, {
    defaultValues: {
      authForgeDomain: currentDomain || "",
    },
  });

  const mutation = useUpdateDomainMutation(form.setError);

  useEffect(() => {
    if (currentDomain && currentDomain !== form.getValues("authForgeDomain")) {
      form.setValue("authForgeDomain", currentDomain);
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
