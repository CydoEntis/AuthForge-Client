import { useQuery } from "@tanstack/react-query";
import { applicationsApi } from "../application.api";

export function useApplication(id: string | null) {
  return useQuery({
    queryKey: ["application", id],
    queryFn: () => applicationsApi.getById(id!),
    enabled: !!id,
  });
}
