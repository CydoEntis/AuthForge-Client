import { useQuery } from "@tanstack/react-query";
import { settingsApi } from "../settings.api";

export function useAdminSettingsQuery() {
  return useQuery({
    queryKey: ["admin", "settings"],
    queryFn: () => settingsApi.getSettings(),
    staleTime: 5 * 60 * 1000,
  });
}
