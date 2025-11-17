import type { ReactNode } from "react";

type SettingsSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="flex gap-2 py-4 mt-8 w-full border-b-2 border-black shadow-bottom-sm">
      <div className="w-1/4">
        <h3 className="text-xl font-semibold pb-1.5">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="w-1/4">{children}</div>
    </div>
  );
}
