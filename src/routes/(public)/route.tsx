import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PublicNavbar } from "@/components/PublicNavbar";

export const Route = createFileRoute("/(public)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="relative  max-w-5/6 mx-auto py-4 px-8">
      <PublicNavbar />
      <main className="min-h-[70vh] flex justify-center items-center w-full [view-transition-name:main-content]">
        <Outlet />
      </main>
    </main>
  );
}
