import AppShell from "@/components/layout/AppShell";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/private")({
  component: Layout,
});

function Layout() {
  return <AppShell />;
}
