import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { accountApi } from "../account.api";

export function useGetAccountQuery() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["account"],
    queryFn: () => accountApi.getAccount(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
