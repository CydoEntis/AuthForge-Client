import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "@tanstack/react-router";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useAdmin } from "@/features/admin/hooks/useAdminProfile";

export default function AppShell() {
  const { data: admin, isLoading, isError } = useAdmin();
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
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
