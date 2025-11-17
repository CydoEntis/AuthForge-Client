import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminApi } from "../admin.api";
import type { AdminUpdateEmailProviderRequest } from "../admin.types";

export function useAdminUpdateEmailProviderMutation() {
  return useMutation({
    mutationFn: (values: AdminUpdateEmailProviderRequest) => adminApi.updateEmailProvider(values),
    onSuccess: () => {
      toast.success("Email provider updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update email provider");
    },
  });
}
