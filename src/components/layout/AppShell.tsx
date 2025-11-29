import { Outlet } from "@tanstack/react-router";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppShellSkeleton } from "./AppShellSkeleton";
import { useAdminQuery } from "@/features/account/hooks/useGetAccountQuery";

export default function AppShell() {
  const { data: admin, isLoading, isError } = useAdminQuery();
  const { setAdmin, logout } = useAuthStore();

  useEffect(() => {
    if (admin) {
      setAdmin(admin);
    }
  }, [admin, setAdmin]);

  useEffect(() => {
    if (isError) {
      logout();
    }
  }, [isError, logout]);

  if (isLoading) {
    return <AppShellSkeleton />;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
