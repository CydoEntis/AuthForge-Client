import { useQuery } from "@tanstack/react-query";
import { applicationsApi } from "../application.api";
import type { ListApplicationsParams } from "../application.types";

export function useApplicationsQuery(params?: ListApplicationsParams) {
  return useQuery({
    queryKey: ["applications", params],
    queryFn: () => applicationsApi.getAll(params),
    staleTime: 30_000,
    placeholderData: (previousData) => previousData,
  });
}
