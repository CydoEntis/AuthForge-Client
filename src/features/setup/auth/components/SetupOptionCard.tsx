import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

type SetupOptionCardProps = {
  title: string;
  description: string;
  iconClass?: string;
  imageSrc?: string;
  icon?: ReactNode;
  selected: boolean;
  onSelect: () => void;
  requiresConfig?: boolean;
  isConfigured?: boolean;
  onConfigure?: () => void;
};

export default function SetupOptionCard({
  title,
  description,
  iconClass,
  imageSrc,
  icon,
  selected,
  onSelect,
  requiresConfig = false,
  isConfigured = false,
  onConfigure,
}: SetupOptionCardProps) {
  const getCardStatus = () => {
    if (!selected) return requiresConfig ? "Requires configuration" : "No config required";
    return "";
  };

  return (
    <Card
      className={`max-w-xs aspect-3/4 w-full rounded-xl p-6 relative flex flex-col justify-evenly items-center
        transition-all duration-300 cursor-pointer border-4
        ${
          selected
            ? "bg-linear-to-b from-primary/30 via-background to-bg-background border-primary/70 shadow-[0_0_20px_rgba(var(--primary-rgb),0.6)]"
            : "bg-linear-to-b from-muted/20 via-background to-bg-background border-border/30"
        }
        hover:scale-[1.02]`}
      onClick={onSelect}
    >
      {/* Selected pill */}
      {selected && (
        <p className="absolute top-3 right-3 bg-card/85 px-3 py-1 rounded-full text-xs text-primary font-semibold tracking-wide z-10">
          Selected
        </p>
      )}

      {/* Icon/Image */}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={title}
          className={`w-28 h-28 object-contain transition-all duration-300 ${selected ? "opacity-100 scale-105" : "opacity-70"}`}
        />
      ) : icon ? (
        <div
          className={`transition-all duration-300 text-foreground ${selected ? "opacity-100 scale-105" : "opacity-70"}`}
        >
          {icon}
        </div>
      ) : iconClass ? (
        <div
          className={`${iconClass} text-8xl text-foreground transition-all duration-300 ${selected ? "opacity-100 scale-105" : "opacity-70"}`}
        />
      ) : null}

      {/* Title & Description */}
      <div className="text-center space-y-1 mt-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm font-medium text-muted-foreground">{description}</p>
      </div>

      {/* Status / Config Section */}
      <div className="mt-4 flex flex-col items-center h-16 relative w-full">
        <AnimatePresence>
          {!selected && (
            <motion.span
              key="status-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute text-sm text-muted-foreground"
            >
              {getCardStatus()}
            </motion.span>
          )}

          {selected && requiresConfig && onConfigure && (
            <motion.div
              key="config-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute flex flex-col items-center gap-1"
            >
              <Button
                size="icon"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onConfigure();
                }}
                title="Configure"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <span className={`text-sm font-medium ${isConfigured ? "text-green-500" : "text-muted-foreground"}`}>
                {isConfigured ? "Configured" : "Please configure"}
              </span>
            </motion.div>
          )}

          {selected && !requiresConfig && (
            <motion.span
              key="no-config"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute text-sm text-muted-foreground"
            >
              No config required
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
