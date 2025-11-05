import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationsApi } from "../api";
import { toast } from "sonner";
import type { CreateApplication } from "../types";

export function useUpdateApplication(applicationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateApplication) => applicationsApi.update(applicationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["application", applicationId] });
      toast.success("Application updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error?.message || "Failed to update application");
    },
  });
}
