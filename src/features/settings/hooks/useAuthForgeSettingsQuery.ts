import { useQuery } from "@tanstack/react-query";
import { settingsApi } from "../settings.api";

export function useAuthForgeSettingsQuery() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: () => settingsApi.getSettings(),
    staleTime: 5 * 60 * 1000,
  });
}
