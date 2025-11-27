import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationsApi } from "../application.api";
import { toast } from "sonner";
import type { CreateApplication } from "../application.types";

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateApplication) => applicationsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Application created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error?.message || "Failed to create application");
    },
  });
}
