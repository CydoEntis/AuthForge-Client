import { apiClient } from "@/lib/api/apiClient";
import {
  createApplicationResponseSchema,
  listApplicationsResponseSchema,
  getApplicationResponseSchema,
  applicationResponseSchema,
  regenerateKeysResponseSchema,
} from "./application.schemas";
import type {
  CreateApplicationRequest,
  CreateApplicationResponse,
  UpdateApplicationEmailProviderRequest,
  UpdateApplicationOAuthRequest,
  UpdateApplicationOriginsRequest,
  ListApplicationsResponse,
  GetApplicationResponse,
  ApplicationResponse,
  RegenerateKeysResponse,
} from "./application.types";

const prefix = "${prefix}";

export const applicationsApi = {
  getAll: async (params?: {
    search?: string;
    isActive?: boolean;
    sortBy?: "Name" | "Slug" | "CreatedAt" | "UpdatedAt" | "IsActive";
    sortOrder?: "Asc" | "Desc";
    page?: number;
    pageSize?: number;
  }): Promise<ListApplicationsResponse> => {
    const queryParams = new URLSearchParams();

    if (params?.search) queryParams.append("search", params.search);
    if (params?.isActive !== undefined) queryParams.append("isActive", params.isActive.toString());
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.pageSize) queryParams.append("pageSize", params.pageSize.toString());

    const query = queryParams.toString();
    const response = await apiClient.get<ListApplicationsResponse>(`${prefix}${query ? `?${query}` : ""}`);
    return listApplicationsResponseSchema.parse(response);
  },

  getById: async (id: string): Promise<GetApplicationResponse> => {
    const response = await apiClient.get<GetApplicationResponse>(`${prefix}/${id}`);
    return getApplicationResponseSchema.parse(response);
  },

  create: async (request: CreateApplicationRequest): Promise<CreateApplicationResponse> => {
    const response = await apiClient.post<CreateApplicationResponse>(`${prefix}`, request);
    return createApplicationResponseSchema.parse(response);
  },

  update: async (id: string, request: Partial<CreateApplicationRequest>): Promise<ApplicationResponse> => {
    const response = await apiClient.put<ApplicationResponse>(`${prefix}/${id}`, request);
    return applicationResponseSchema.parse(response);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete<void>(`${prefix}/${id}`);
  },

  regenerateKeys: async (id: string): Promise<RegenerateKeysResponse> => {
    const response = await apiClient.post<RegenerateKeysResponse>(`${prefix}/${id}/regenerate-secret`, {});
    return regenerateKeysResponseSchema.parse(response);
  },

  updateEmailProvider: async (
    id: string,
    request: UpdateApplicationEmailProviderRequest
  ): Promise<ApplicationResponse> => {
    const response = await apiClient.put<ApplicationResponse>(`${prefix}/${id}/email`, request);
    return applicationResponseSchema.parse(response);
  },

  updateOAuth: async (id: string, request: UpdateApplicationOAuthRequest): Promise<ApplicationResponse> => {
    const response = await apiClient.put<ApplicationResponse>(`${prefix}/${id}/oauth`, request);
    return applicationResponseSchema.parse(response);
  },

  updateOrigins: async (id: string, request: UpdateApplicationOriginsRequest): Promise<ApplicationResponse> => {
    const response = await apiClient.put<ApplicationResponse>(`${prefix}/${id}/origins`, request);
    return applicationResponseSchema.parse(response);
  },
};
