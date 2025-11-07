import { useAuthStore } from "@/store/useAuthStore";
import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
import { ApiError } from "./ApiError";
import type { ApiResponse } from "./types";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5255/api",
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: () => true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

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
      response.config.url?.includes("/refresh-token");

    if (response.status === 401 && !isAuthEndpoint && !(response.config as any)._retry) {
      const originalRequest = response.config as any;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => client(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken, updateAccessToken, logout } = useAuthStore.getState();

      if (!refreshToken) {
        logout();
        window.location.href = "/login";
        return Promise.reject(new Error("No refresh token"));
      }

      try {
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5255/api"}/admin/refresh-token`,
          { refreshToken }
        );

        console.log("Refresh response: ", refreshResponse);

        const { accessToken: newAccessToken } = refreshResponse.data.data;
        updateAccessToken(newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        processQueue();
        isRefreshing = false;

        return client(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        isRefreshing = false;
        logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
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
