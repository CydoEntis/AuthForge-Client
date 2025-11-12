import { Card } from "@/components/ui/card";
import type { ReactNode } from "react";

type OptionCardProps = {
  title: string;
  iconClass?: string;
  imageSrc?: string;
  icon?: ReactNode;
  selected: boolean;
  onSelect: () => void;
};

export default function OptionCard({ title, iconClass, imageSrc, icon, selected, onSelect }: OptionCardProps) {
  return (
    <Card
      onClick={onSelect}
      className={`group  p-6  flex flex-col justify-center items-center 
         transition-all duration-300 cursor-pointer
        w-[250px] h-[250px]
        ${selected ? "border-primary/60 from-primary/10 to-background" : "border-transparent hover:border-primary"}
        hover:scale-[1.02]`}
    >
      <div className="h-24 w-24 flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className={`w-24 h-24 object-contain transition-all duration-300 ${
              selected ? "opacity-100 scale-105" : "opacity-70"
            }`}
          />
        ) : icon ? (
          <div
            className={`w-24 h-24 flex items-center justify-center transition-all duration-300 ${
              selected ? "opacity-100 scale-105 text-primary" : "opacity-70 text-foreground"
            }`}
          >
            <div className="[&>svg]:w-18 [&>svg]:h-18">{icon}</div>
          </div>
        ) : iconClass ? (
          <i
            className={`${iconClass} text-7xl leading-none transition-all duration-300 ${
              selected ? "text-primary opacity-100 " : "opacity-70"
            }`}
          />
        ) : null}
      </div>

      <h3 className={`text-2xl font-bold text-center ${selected ? "text-primary" : "text-foreground"}`}>{title}</h3>
    </Card>
  );
}
