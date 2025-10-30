import SetupWizardLayout from "@/features/setup/components/SetupWizardLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/playground/")({
  component: SetupWizardLayout,
});
