import type { ReactNode } from "react";

interface AppCardProps {
  description?: string;
  url?: string;
  emailEnabled?: boolean;
  googleEnabled?: boolean;
  githubEnabled?: boolean;
  isOnline?: boolean;
  maxWidth?: number | string;
  children?: ReactNode;
  className?: string;
}

export function BrowserCard({
  description,
  url = "app.example.com",
  emailEnabled,
  googleEnabled,
  githubEnabled,
  isOnline = false,
  maxWidth = 600,
  children,
  className = "",
}: AppCardProps) {
  return (
    <div className={`relative card group cursor-pointer ${isOnline ? "active" : ""} ${className}`} style={{ maxWidth }}>
      <div className="card-content relative">
        <div className="relative w-full h-full flex flex-col rounded-lg overflow-hidden shadow-lg">
          <div className="flex items-center gap-2 px-3 py-2 bg-sidebar">
            <div className="flex gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/80" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            </div>
            <div className="flex-1 text-center text-xs sm:text-sm px-2 py-[2px] rounded-full truncate bg-input">
              {url}
            </div>
          </div>

          <div
            className="relative flex-1 overflow-hidden
  bg-linear-to-br from-card to-background
  group-hover:from-primary/20
  transition-all duration-300 ease-in-out"
          >
            {children}
          </div>
        </div>
      </div>

      <div className="tag">
        <p className="flex items-center gap-2 text-sm font-semibold border">
          <span className={`relative w-1.5 h-1.5 rounded-full ${isOnline ? "bg-primary" : "bg-gray-400"}`}>
            {isOnline && <span className="absolute inset-0 rounded-full bg-primary/70 opacity-80 animate-ping" />}
          </span>
          {isOnline ? "Active" : "Inactive"}
        </p>

        <div className="curve_one"></div>
        <div className="curve_two"></div>
      </div>
    </div>
  );
}
