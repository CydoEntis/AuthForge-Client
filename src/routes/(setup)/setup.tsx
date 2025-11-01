import { createFileRoute } from "@tanstack/react-router";
import SetupWizardLayout from "@/features/setup/components/SetupWizardLayout";

export const Route = createFileRoute("/(setup)/setup")({
  component: SetupWizardLayout,
});
