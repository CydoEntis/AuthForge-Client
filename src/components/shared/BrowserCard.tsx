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
    <div className={`relative card ${className}`} style={{ maxWidth }}>
      {/* Browser window inside cardimg */}
      <div className="cardimg relative">
        <div className="relative w-full h-full flex flex-col rounded-lg overflow-hidden shadow-lg">
          {/* Browser top bar */}
          <div className="flex items-center gap-2 px-3 py-2 bg-card">
            <div className="flex gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex-1 text-center text-xs sm:text-sm px-2 py-[2px] rounded-full truncate bg-input">
              {url}
            </div>
          </div>

          {/* Browser content */}
          <div
            className={`relative flex-1 overflow-hidden bg-linear-to-br
              ${isOnline ? "from-primary/20 to-background" : " from-input/70 to-background"}`}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Status badge */}
      <div className="tag">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <span className={`relative w-1.5 h-1.5 rounded-full ${isOnline ? "bg-emerald-500" : "bg-gray-400"}`}>
            {isOnline && <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-80 animate-ping" />}
          </span>
          {isOnline ? "Active" : "Inactive"}
        </p>

        <div className="curve_one"></div>
        <div className="curve_two"></div>
      </div>
    </div>
  );
}
