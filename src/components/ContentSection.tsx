import type { ReactNode } from "react";

type BorderPosition = "top" | "bottom" | "both" | "none";

type ContentSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
  border?: BorderPosition;
  className?: string;
};

export function ContentSection({
  title,
  description,
  children,
  border = "bottom",
  className = "",
}: ContentSectionProps) {
  const borderClasses = {
    top: "border-t-2",
    bottom: "border-b-2",
    both: "border-y-2",
    none: "",
  };

  return (
    <div className={`flex gap-2 py-4 mt-8 w-full ${borderClasses[border]} border-black shadow-bottom-sm ${className}`}>
      <div className="w-1/4">
        <h3 className="text-xl font-semibold pb-1.5">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="w-1/4">{children}</div>
    </div>
  );
}
