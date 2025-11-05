import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { Anvil } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export const Route = createFileRoute("/(public)/dashboard")({
  beforeLoad: () => {
    const { refreshToken } = useAuthStore.getState();
    if (refreshToken) {
      throw redirect({ to: "/applications" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="relative mx-auto max-w-3/5 h-screen py-4">
      <nav className="flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
          <div className="bg-card  flex aspect-square size-8 items-center justify-center rounded-lg">
            <Anvil className="text-orange-400" size={20} />
          </div>
          Auth Forge
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link to="/dashboard">
              <Button className="rounded-full">Login</Button>
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <Button className="rounded-full" variant="outline">
                Sign Up
              </Button>
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
      <Outlet />
    </section>
  );
}
