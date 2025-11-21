import { useAuthStore } from "@/store/useAuthStore";
import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
import { ApiError } from "./ApiError";
import type { ApiResponse } from "./types";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5046/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: () => true,
});

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  async (response) => {
    const isAuthEndpoint =
      response.config.url?.includes("/login") ||
      response.config.url?.includes("/setup") ||
      response.config.url?.includes("/forgot-password") ||
      response.config.url?.includes("/refresh");

    if (response.status === 401 && !isAuthEndpoint && !(response.config as any)._retry) {
      const originalRequest = response.config as any;
      originalRequest._retry = true;

      if (isRefreshing && refreshPromise) {
        try {
          const newAccessToken = await refreshPromise;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return client(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }

      isRefreshing = true;
      const { refreshToken, logout } = useAuthStore.getState();

      if (!refreshToken) {
        isRefreshing = false;
        logout();
        window.location.href = "/login";
        return Promise.reject(new Error("No refresh token"));
      }

      refreshPromise = (async () => {
        try {
          const refreshResponse = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5046/api/v1"}/admin/refresh`,
            { refreshToken }
          );

          const { tokens } = refreshResponse.data.data;
          const newAccessToken = tokens.accessToken;
          const newRefreshToken = tokens.refreshToken;

          const { setTokens } = useAuthStore.getState();
          setTokens(newAccessToken, newRefreshToken);

          console.log("Refresh successful");

          return newAccessToken;
        } catch (error) {
          console.error("Refresh failed:", error);
          logout();
          window.location.href = "/login";
          throw error;
        } finally {
          isRefreshing = false;
          refreshPromise = null;
        }
      })();

      try {
        const newAccessToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return client(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return response;
  },
  (error) => Promise.reject(error)
);

export const apiClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = (await client.get<ApiResponse<T>>(url, config)).data;
    if (!res.success) throw new ApiError(res.error!);
    return res.data;
  },

  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const res = (await client.post<ApiResponse<T>>(url, data, config)).data;
    if (!res.success) throw new ApiError(res.error!);
    return res.data;
  },

  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const res = (await client.put<ApiResponse<T>>(url, data, config)).data;
    if (!res.success) throw new ApiError(res.error!);
    return res.data;
  },

  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const res = (await client.patch<ApiResponse<T>>(url, data, config)).data;
    if (!res.success) throw new ApiError(res.error!);
    return res.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = (await client.delete<ApiResponse<T>>(url, config)).data;
    if (!res.success) throw new ApiError(res.error!);
    return res.data;
  },
};
