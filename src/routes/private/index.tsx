import { BackgroundPaths } from "@/components/ui/shadcn-io/background-paths";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/private/")({
  component: App,
});

function App() {
  return (
    <section className="min-h-screen  flex justify-center items-center bg-background">
      <BackgroundPaths title="Background Paths" />
    </section>
  );
}
