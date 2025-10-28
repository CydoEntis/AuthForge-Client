import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type SetupOptionCardProps = {
  title: string;
  description: string;
  iconClass?: string;
  imageSrc?: string;
  icon?: ReactNode;
  selected: boolean;
  onSelect: () => void;
};

export default function SetupOptionCard({
  title,
  description,
  iconClass,
  imageSrc,
  icon,
  selected,
  onSelect,
}: SetupOptionCardProps) {
  return (
    <Card
      onClick={onSelect}
      className={`max-w-xs aspect-3/4 w-full rounded-xl p-6 relative flex flex-col justify-evenly items-center
      transition-all duration-300 cursor-pointer border-4
      ${
        selected
          ? "bg-linear-to-b from-primary/30 via-background to-bg-background border-primary/70 shadow-[0_0_20px_rgba(var(--primary-rgb),0.6)]"
          : "bg-linear-to-b from-muted/20 via-background to-bg-background border-border/30"
      }
      hover:scale-[1.02]`}
    >
      {selected && (
        <p className="bg-card/85 px-2 py-1 rounded-full absolute top-3 right-4 text-xs text-primary font-semibold tracking-wide">
          Selected
        </p>
      )}

      {imageSrc ? (
        <img
          src={imageSrc}
          alt={title}
          className={`w-28 h-28 object-contain transition-all duration-300 ${
            selected ? "opacity-100 scale-105" : "opacity-70"
          }`}
        />
      ) : icon ? (
        <div
          className={`transition-all duration-300 text-foreground ${selected ? "opacity-100 scale-105" : "opacity-70"}`}
        >
          {icon}
        </div>
      ) : iconClass ? (
        <div
          className={`${iconClass} text-8xl text-foreground transition-all duration-300 ${
            selected ? "opacity-100 scale-105" : "opacity-70"
          }`}
        />
      ) : null}

      <div className="text-center space-y-1">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm font-medium text-muted-foreground">{description}</p>
      </div>

      <Button
        className={`rounded-full w-[50px] h-[50px] transition-all duration-300 ${
          selected
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/40"
            : "border border-primary/10 bg-primary/20 text-primary hover:bg-primary/30"
        }`}
      >
        {selected ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
      </Button>
    </Card>
  );
}
