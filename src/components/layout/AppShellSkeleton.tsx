import { Skeleton } from "@/components/ui/skeleton";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebarSkeleton } from "./AppSidebarSkeleton";

export function AppShellSkeleton() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebarSkeleton />

      <SidebarInset className="h-[98.75vh] overflow-hidden">
        <div className="flex flex-col gap-4  h-full overflow-hidden">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />

          <div className="flex-1 overflow-hidden">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
