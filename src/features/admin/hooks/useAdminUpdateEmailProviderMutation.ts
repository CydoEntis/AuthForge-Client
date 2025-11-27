import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminApi } from "../admin.api";
import type { EmailProviderConfig } from "@/features/email/email.types";

export function useUpdateAdminEmailProviderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: { emailProviderConfig: EmailProviderConfig }) => adminApi.updateEmailProvider(request),
    onSuccess: () => {
      toast.success("Email provider updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error?.message || "Failed to update email provider");
    },
  });
}
