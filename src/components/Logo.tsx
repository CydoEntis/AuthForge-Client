import { Anvil } from "lucide-react";

type LogoProps = {
  size: number;
};

export function Logo({ size = 24 }: LogoProps) {
  return (
    <div className="inset-shadow-sm rounded-lg bg-card p-2 border dark:border-black border-[#c7c7c7]">
      <Anvil className="text-primary" size={size} />
    </div>
  );
}
