import { useZodForm } from "@/hooks/useZodForm";
import { useAdminUpdateEmailMutation } from "./useAdminUpdateEmailMutation";
import { adminUpdateEmailSchema } from "../admin.schemas";
import type { AdminUpdateEmailRequest } from "../admin.types";

export function useAdminUpdateEmailForm() {
  const form = useZodForm<AdminUpdateEmailRequest>(adminUpdateEmailSchema, {
    defaultValues: {
      email: "",
    },
  });

  const mutation = useAdminUpdateEmailMutation();

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
  };
}
