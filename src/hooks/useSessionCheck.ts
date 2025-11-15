import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { authApi } from "@/features/admin/admin.api";

export function useSessionCheck() {
  const { accessToken, refreshToken, updateAccessToken, logout } = useAuthStore();

  useEffect(() => {
    async function checkSession() {
      if (accessToken && refreshToken) {
        try {
          const response = await authApi.refreshToken(refreshToken);
          updateAccessToken(response.accessToken);
        } catch (error) {
          console.error("Session invalid, logging out", error);
          logout();
        }
      }
    }

    checkSession();
  }, []);
}
