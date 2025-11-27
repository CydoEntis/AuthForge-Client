import { useZodForm } from "@/hooks/useZodForm";
import { useUpdateOAuthMutation } from "./useUpdateOAuthMutation";
import { z } from "zod";
import type { Application } from "../application.types";

const oauthSchema = z
  .object({
    googleEnabled: z.boolean(),
    googleClientId: z.string().optional(),
    googleClientSecret: z.string().optional(),
    githubEnabled: z.boolean(),
    githubClientId: z.string().optional(),
    githubClientSecret: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.googleEnabled) {
        return !!data.googleClientId && !!data.googleClientSecret;
      }
      return true;
    },
    { message: "Client ID and Secret required", path: ["googleClientId"] }
  )
  .refine(
    (data) => {
      if (data.githubEnabled) {
        return !!data.githubClientId && !!data.githubClientSecret;
      }
      return true;
    },
    { message: "Client ID and Secret required", path: ["githubClientId"] }
  );

type UpdateOAuthRequest = z.infer<typeof oauthSchema>;

export function useUpdateOAuthForm(applicationId: string, application: Application) {
  const form = useZodForm<UpdateOAuthRequest>(oauthSchema, {
    defaultValues: {
      googleEnabled: application.oauthSettings?.googleEnabled || false,
      googleClientId: application.oauthSettings?.googleClientId || "",
      googleClientSecret: "",
      githubEnabled: application.oauthSettings?.githubEnabled || false,
      githubClientId: application.oauthSettings?.githubClientId || "",
      githubClientSecret: "",
    },
  });

  const mutation = useUpdateOAuthMutation(applicationId, form.setError);

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
