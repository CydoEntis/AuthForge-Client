import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { EmailProviderConfig } from "@/features/email/email.types";
import { settingsApi } from "../settings.api";

export function useUpdateEmailProviderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: { emailProviderConfig: EmailProviderConfig }) => settingsApi.updateEmailProvider(request),
    onSuccess: () => {
      toast.success("Email provider updated successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error?.message || "Failed to update email provider");
    },
  });
}
