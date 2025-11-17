import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../admin.api";
import { useAuthStore } from "@/store/useAuthStore";

export function useAdmin() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["admin-profile"],
    queryFn: () => adminApi.getAdmin(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
