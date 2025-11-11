import { Settings } from "lucide-react";
import { Button } from "./ui/button";

type AlertType = "success" | "warning" | "failure";

type AlertMessageProps = {
  message: string;
  type?: AlertType;
  onConfigure?: () => void;
  configureText?: string;
  className?: string;
};

const alertStyles: Record<AlertType, string> = {
  success:
    "inset-shadow-success bg-linear-to-t from-green-400/10 to-green-400/40 text-green-500 border border-green-500/30",
  warning:
    "inset-shadow-warn bg-linear-to-t from-amber-400/10 to-amber-400/40 text-amber-500 border border-amber-500/30",
  failure: "inset-shadow-failure bg-linear-to-t from-red-400/10 to-red-400/40 text-red-500 border border-red-500/30",
};

export function AlertMessage({
  message,
  type = "warning",
  onConfigure,
  configureText = "Configure",
  className,
}: AlertMessageProps) {
  const shouldShowConfigButton = onConfigure && (type === "warning" || type === "failure");

  return (
    <div className={`${className} flex justify-center`}>
      <div
        className={`flex items-center justify-between gap-4 text-sm px-6 py-3 rounded-lg transition-all duration-300 font-semibold ${alertStyles[type]}`}
      >
        <span>{message}</span>
        {shouldShowConfigButton && (
          <Button size="sm" onClick={onConfigure} className="ml-4 rounded-md text-foreground">
            <Settings size={16} />
            {configureText && <span className="ml-1">{configureText}</span>}
          </Button>
        )}
      </div>
    </div>
  );
}
