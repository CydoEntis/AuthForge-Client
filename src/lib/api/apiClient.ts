import { useAuthStore } from "@/store/useAuthStore";
import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5255/api",
  headers: {
    "Content-Type": "application/json",
  },
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
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return client(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken, updateAccessToken, logout } = useAuthStore.getState();

      if (!refreshToken) {
        logout();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5255/api"}/admin/refresh-token`,
          { refreshToken }
        );

        const { accessToken: newAccessToken } = response.data.data;

        updateAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

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

    return Promise.reject(error);
  }
);

export const apiClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    const res = await client.get<T>(url, config);
    return res.data;
  },
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const res = await client.post<T>(url, data, config);
    return res.data;
  },
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const res = await client.put<T>(url, data, config);
    return res.data;
  },
  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const res = await client.patch<T>(url, data, config);
    return res.data;
  },
  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    const res = await client.delete<T>(url, config);
    return res.data;
  },
};
