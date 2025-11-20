import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../admin.api";

export function useAdminSettingsQuery() {
  return useQuery({
    queryKey: ["admin", "settings"],
    queryFn: () => adminApi.getSettings(),
    staleTime: 5 * 60 * 1000,
  });
}
