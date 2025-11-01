import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import SetupWizardLayout from "@/features/setup/components/SetupWizardLayout";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "next-themes";

export const Route = createFileRoute("/playground/")({
  component: playground,
});

function playground() {
  const { theme } = useTheme();
  return (
    <>
      <StarsBackground
        starColor={theme === "dark" ? "#F59E0B" : "#F59E0B"}
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-xl",
          "dark:bg-[radial-gradient(ellipse_at_bottom,#262626_0%,#000_100%)] bg-[radial-gradient(ellipse_at_bottom,#f5f5f5_0%,#fff_100%)]"
        )}
      />
      <SetupWizardLayout />
    </>
  );
}
