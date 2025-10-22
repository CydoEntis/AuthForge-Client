import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/")({
  component: App,
});

function App() {
  return <p>Home</p>;
}
