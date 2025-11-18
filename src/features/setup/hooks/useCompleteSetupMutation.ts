import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { setupApi } from "../setup.api";

export function useCompleteSetupMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: setupApi.completeSetup,
    onSuccess: async () => {
      toast.success("Setup complete");
      await router.invalidate().catch(() => {});
      router.navigate({ to: "/login" });
    },
    onError: (error: any) => {
      toast.error(error.message || "Setup failed. Please try again.");
    },
  });
}
