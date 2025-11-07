import type { ReactNode } from "react";

export function BrowserCardGlow({ children }: { children: ReactNode }) {
  return (
    <div className="group relative w-fit transition-all duration-300">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-from)_0%,transparent_70%)] from-primary/30 blur-3xl" />
      </div>

      {/* The actual card */}
      <div className="transition-all duration-300 border border-transparent group-hover:border-primary/80 group-hover:shadow-[0_0_25px_--theme(--color-primary/40)] rounded-xl">
        {children}
      </div>
    </div>
  );
}
