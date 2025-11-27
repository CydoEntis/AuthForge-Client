import { useZodForm } from "@/hooks/useZodForm";
import { useUpdateOriginsMutation } from "./useUpdateOriginsMutation";
import { z } from "zod";
import type { Application } from "../application.types";

const originsSchema = z.object({
  allowedOrigins: z.array(z.url("Invalid URL")).min(1, "At least one origin is required"),
});

type UpdateOriginsRequest = z.infer<typeof originsSchema>;

export function useUpdateOriginsForm(applicationId: string, application: Application) {
  const form = useZodForm<UpdateOriginsRequest>(originsSchema, {
    defaultValues: {
      allowedOrigins: application.allowedOrigins || [],
    },
  });

  const mutation = useUpdateOriginsMutation(applicationId, form.setError);

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
