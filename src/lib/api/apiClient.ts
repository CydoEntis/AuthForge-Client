import axios, { type AxiosRequestConfig } from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Todo: Add request interceptor for auth token, refresh tokens etc.
client.interceptors.response.use(
  (response) => response,
  (error) => {
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
