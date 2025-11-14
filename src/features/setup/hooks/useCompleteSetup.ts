import { useMutation } from "@tanstack/react-query";
import { setupApi } from "../setup.api";
import type { CompleteSetupRequest, CompleteSetupResponse } from "../setup.types";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";

export function useCompleteSetup() {
  const router = useRouter();

  return useMutation<CompleteSetupResponse, Error, CompleteSetupRequest>({
    mutationFn: setupApi.completeSetup,
    onSuccess: async (data) => {
      toast.success("Setup complete");
      await router.invalidate().catch(() => {});

      router.navigate({ to: "/login" });
    },
    onError: (error) => {
      toast.error(error.message || "Setup failed. Please try again.");
    },
  });
}
