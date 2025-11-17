import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminApi } from "../admin.api";
import type { AdminUpdateEmailRequest } from "../admin.types";

export function useAdminUpdateEmailMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: AdminUpdateEmailRequest) => adminApi.updateEmail(values),
    onSuccess: () => {
      toast.success("Email updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-profile"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update email");
    },
  });
}
