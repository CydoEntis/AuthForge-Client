import { useMutation } from "@tanstack/react-query";
import { setupApi } from "../api";
import type { CompleteSetupPayload, CompleteSetupResponse } from "../types";
import { toast } from "sonner";

export function useCompleteSetup() {
  return useMutation<CompleteSetupResponse, Error, CompleteSetupPayload>({
    mutationFn: setupApi.completeSetup,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message || "Setup failed. Please try again.");
    },
  });
}
