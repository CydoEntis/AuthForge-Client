import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminApi } from "../admin.api";
import type { TestEmailConfigRequest } from "@/features/setup/setup.types";

export function useAdminTestEmailProviderMutation() {
  return useMutation({
    mutationFn: (values: TestEmailConfigRequest) => adminApi.testEmailProvider(values),
    onSuccess: () => {
      toast.success("Email connection test successful!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Email connection test failed");
    },
  });
}
