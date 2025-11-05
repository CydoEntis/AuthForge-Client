// src/features/applications/hooks/useApplications.ts
import { useQuery } from "@tanstack/react-query";
import { applicationsApi } from "../api";
import type { ApplicationFilterParameters } from "../types";

export function useApplications(params: ApplicationFilterParameters) {
  return useQuery({
    queryKey: ["applications", params],
    queryFn: () => applicationsApi.getAll(params),
    staleTime: 30_000,
    placeholderData: (previousData) => previousData,
  });
}
