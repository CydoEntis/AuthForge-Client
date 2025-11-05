// src/features/applications/api/index.ts
import { apiClient } from "@/lib/api/apiClient";
import type { PagedResponse } from "@/lib/api/types";
import type {
  Application,
  ApplicationFilterParameters,
  ApplicationSummary,
  CreateApplication,
  PrivateAndPublicKeys,
} from "./types";

export const applicationsApi = {
  getAll: async (params: ApplicationFilterParameters): Promise<PagedResponse<ApplicationSummary>> => {
    const queryParams = new URLSearchParams();

    if (params.pageNumber) queryParams.append("pageNumber", params.pageNumber.toString());
    if (params.pageSize) queryParams.append("pageSize", params.pageSize.toString());
    if (params.searchTerm) queryParams.append("searchTerm", params.searchTerm);
    if (params.isActive !== undefined) queryParams.append("isActive", params.isActive.toString());
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const query = queryParams.toString();
    return await apiClient.get<PagedResponse<ApplicationSummary>>(`/applications${query ? `?${query}` : ""}`);
  },

  // ✅ Single item (not paginated)
  getById: async (id: string): Promise<Application> => {
    return await apiClient.get<Application>(`/applications/${id}`);
  },

  create: async (data: CreateApplication): Promise<Application> => {
    return await apiClient.post<Application>("/applications", data);
  },

  update: async (id: string, data: Partial<CreateApplication>): Promise<Application> => {
    return await apiClient.put<Application>(`/applications/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return await apiClient.delete<void>(`/applications/${id}`);
  },

  regenerateKeys: async (id: string): Promise<PrivateAndPublicKeys> => {
    return await apiClient.post<PrivateAndPublicKeys>(`/applications/${id}/regenerate-keys`, {});
  },
};
