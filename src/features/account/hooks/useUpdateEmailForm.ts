import { useZodForm } from "@/hooks/useZodForm";
import { useEffect } from "react";
import { updateEmailSchema } from "../account.schemas";
import { useUpdateEmailMutation } from "./useUpdateEmailMutation";

export function useUpdateEmailForm(currentEmail?: string) {
  const form = useZodForm(updateEmailSchema, {
    defaultValues: {
      email: "",
    },
  });

  const mutation = useUpdateEmailMutation(form.setError);

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
