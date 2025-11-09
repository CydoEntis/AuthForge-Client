import { useQuery } from "@tanstack/react-query";
import { setupApi } from "../setup.api";

export function useSetupStatus() {
  return useQuery({
    queryKey: ["setup-status"],
    queryFn: setupApi.getSetupStatus,
    staleTime: Infinity,
    retry: 1,
  });
}
