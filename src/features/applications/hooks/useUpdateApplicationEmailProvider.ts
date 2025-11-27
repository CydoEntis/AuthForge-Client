import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { applicationsApi } from "../application.api";
import type { UpdateApplicationEmailProviderRequest } from "../application.types";

export function useUpdateApplicationEmailProviderMutation(applicationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdateApplicationEmailProviderRequest) =>
      applicationsApi.updateEmailProvider(applicationId, request),
    onSuccess: () => {
      toast.success("Email provider updated successfully");
      queryClient.invalidateQueries({ queryKey: ["application", applicationId] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error?.message || "Failed to update email provider");
    },
  });
}
