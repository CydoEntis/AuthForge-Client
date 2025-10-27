import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api";

export function useSetupStatus() {
  return useQuery({
    queryKey: ["setup-status"],
    queryFn: authApi.getSetupStatus,
    staleTime: Infinity,
    retry: 1,
  });
}
