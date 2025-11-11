import { useMutation } from "@tanstack/react-query";
import { setupApi } from "../setup.api";
import type { CompleteSetupRequest, CompleteSetupResponse } from "../setup.types";
import { toast } from "sonner";

export function useCompleteSetup() {
  return useMutation<CompleteSetupResponse, Error, CompleteSetupRequest>({
    mutationFn: setupApi.completeSetup,
    onSuccess: () => {
      toast.success("Setup complete");
    },
    onError: (error) => {
      toast.error(error.message || "Setup failed. Please try again.");
    },
  });
}
