import { Card } from "@/components/ui/card";
import type { ReactNode } from "react";

type OptionCardSize = "xs" | "sm" | "md" | "lg" | "xl" | "custom";

type CustomSize = {
  width?: string;
  height?: string;
  padding?: string;
  iconSize?: string;
  titleSize?: string;
  gap?: string;
};

type OptionCardProps = {
  title: string;
  iconClass?: string;
  imageSrc?: string;
  icon?: ReactNode;
  selected: boolean;
  onSelect: () => void;

  size?: OptionCardSize;
  customSize?: CustomSize;
  orientation?: "vertical" | "horizontal";
};

const sizeMap: Record<OptionCardSize, CustomSize> = {
  xs: {
    width: "w-[140px]",
    height: "h-[140px]",
    padding: "p-3",
    iconSize: "h-10 w-10",
    titleSize: "text-base",
    gap: "gap-2",
  },
  sm: {
    width: "w-[180px]",
    height: "h-[180px]",
    padding: "p-4",
    iconSize: "h-16 w-16",
    titleSize: "text-lg",
    gap: "gap-2",
  },
  md: {
    width: "w-[220px]",
    height: "h-[220px]",
    padding: "p-5",
    iconSize: "h-20 w-20",
    titleSize: "text-xl",
    gap: "gap-3",
  },
  lg: {
    width: "w-[250px]",
    height: "h-[250px]",
    padding: "p-6",
    iconSize: "h-24 w-24",
    titleSize: "text-2xl",
    gap: "gap-4",
  },
  xl: {
    width: "w-[300px]",
    height: "h-[300px]",
    padding: "p-8",
    iconSize: "h-28 w-28",
    titleSize: "text-3xl",
    gap: "gap-5",
  },
  custom: {},
};

const defaultSize = sizeMap.lg;

export default function OptionCard({
  title,
  iconClass,
  imageSrc,
  icon,
  selected,
  onSelect,
  size = "lg",
  customSize = {},
  orientation = "vertical",
}: OptionCardProps) {
  const applied = size === "custom" ? { ...defaultSize, ...customSize } : { ...defaultSize, ...sizeMap[size] };

  const {
    width = "w-[250px]",
    height = "h-[250px]",
    padding = "p-6",
    iconSize = "h-24 w-24",
    titleSize = "text-2xl",
    gap = "gap-4",
  } = applied;

  const layout =
    orientation === "vertical"
      ? "flex-col justify-center items-center text-center"
      : "flex-row justify-start items-center text-left";

  const dynamicHeight = orientation === "horizontal" ? "h-auto" : height;

  return (
    <Card
      onClick={onSelect}
      className={`
        group flex ${layout} ${gap}
        transition-all duration-300 cursor-pointer
        ${width} ${dynamicHeight} ${padding}
        ${selected ? "border-primary/60 from-primary/10 to-background" : "border-transparent hover:border-primary"}
        hover:scale-[1.02]
      `}
    >
      <div className={`${iconSize} flex items-center justify-center shrink-0`}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className={`
              object-contain transition-all duration-300
              ${iconSize}
              ${selected ? "opacity-100 scale-105" : "opacity-70"}
            `}
          />
        ) : icon ? (
          <div
            className={`
              flex items-center justify-center transition-all duration-300
              ${iconSize}
              ${selected ? "opacity-100 scale-105 text-primary" : "opacity-70 text-foreground"}
            `}
          >
            <div className="[&>svg]:w-full [&>svg]:h-full">{icon}</div>
          </div>
        ) : iconClass ? (
          <i
            className={`${iconClass} text-7xl leading-none transition-all duration-300 ${
              selected ? "text-primary opacity-100" : "opacity-70"
            }`}
          />
        ) : null}
      </div>

      <h3
        className={`${titleSize} font-bold ${orientation === "vertical" ? "text-center" : "text-left"} ${selected ? "text-primary" : "text-foreground"}`}
      >
        {title}
      </h3>
    </Card>
  );
}
