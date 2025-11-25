import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/applications/$id/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(private)/applications/$id/settings"!</div>;
}
