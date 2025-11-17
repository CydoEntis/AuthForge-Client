import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminApi } from "../admin.api";
import type { AdminUpdateDomainRequest } from "../admin.types";

export function useAdminUpdateDomainMutation() {
  return useMutation({
    mutationFn: (values: AdminUpdateDomainRequest) => adminApi.updateDomain(values),
    onSuccess: () => {
      toast.success("Domain updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update domain");
    },
  });
}
