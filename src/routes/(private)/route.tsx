// routes/(private)/__layout.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import AppShell from "@/components/layout/AppShell";

export const Route = createFileRoute("/(private)")({
  // beforeLoad: ({ context }) => {
  //   const { auth } = context;
  //   if (!auth.isAuthenticated) {
  //     throw redirect({ to: "/login" });
  //   }
  // },
  component: AppShell,
});
