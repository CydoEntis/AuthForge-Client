import { useZodForm } from "@/hooks/useZodForm";
import { useUpdateGeneralMutation } from "./useUpdateGeneralMutation";
import { z } from "zod";
import type { Application } from "../application.types";

const generalSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
});

type UpdateGeneralRequest = z.infer<typeof generalSchema>;

export function useUpdateGeneralForm(applicationId: string, application: Application) {
  const form = useZodForm<UpdateGeneralRequest>(generalSchema, {
    defaultValues: {
      name: application.name,
      description: application.description || "",
    },
  });

  const mutation = useUpdateGeneralMutation(applicationId, form.setError);

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
