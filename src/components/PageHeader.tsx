import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type PageHeaderProps = {
  title: string;
  description?: string;
  onBack?: () => void;
  border?: "top" | "bottom" | "both" | "none";
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  onBack,
  border = "bottom",
  actions,
  className = "",
}: PageHeaderProps) {
  const borderClasses = {
    top: "border-t-2",
    bottom: "border-b-2",
    both: "border-y-2",
    none: "",
  };

  return (
    <div
      className={`flex flex-col gap-2 py-4 w-full ${borderClasses[border]} border-black shadow-bottom-sm ${className}`}
    >
      <div className="flex gap-4">
        <div className="flex-1 flex gap-2">
          {onBack && (
            <Button variant="outline" onClick={onBack} className="mt-2 shrink-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold py-1.25">{title}</h1>
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
