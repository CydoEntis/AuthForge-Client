import { Anvil } from "lucide-react";

type AuthForgeLogoProps = {
  size: number;
  className?: string;
};

export default function AuthForgeLogo({ size, className }: AuthForgeLogoProps) {
  return (
    <>
      <div className={`bg-secondary p-2 border rounded-lg ${className}`}>
        <Anvil className="text-primary" size={size} />
      </div>
      <h3 className="text-foreground text-base font-semibold">Auth Forge</h3>
    </>
  );
}
