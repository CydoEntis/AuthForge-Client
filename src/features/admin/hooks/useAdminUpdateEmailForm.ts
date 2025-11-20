import { useZodForm } from "@/hooks/useZodForm";
import { useAdminUpdateEmailMutation } from "./useAdminUpdateEmailMutation";
import { adminUpdateEmailSchema } from "../admin.schemas";
import { useEffect } from "react";

export function useAdminUpdateEmailForm(currentEmail?: string) {
  const form = useZodForm(adminUpdateEmailSchema, {
    defaultValues: {
      email: "",
    },
  });

  const mutation = useAdminUpdateEmailMutation(form.setError);

  useEffect(() => {
    if (currentEmail) {
      form.reset({ email: currentEmail });
    }
  }, [currentEmail, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
  };
}
