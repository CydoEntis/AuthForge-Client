import { Power, X } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../ui/button";

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
  maxWidth = 350,
  children,
  className = "",
}: AppCardProps) {
  return (
    <div className={`relative group cursor-pointer min-h-[280px] ${className}`} style={{ maxWidth }}>
      {/* Outer Card */}
      <div className="relative w-full h-full flex flex-col rounded-xl overflow-hidden border border-input/70  transition-all duration-300 group-hover:border-input">
        {/* Top bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-sidebar">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary/80" />
            <span className="w-2 h-2 rounded-full bg-primary/60" />
            <span className="w-2 h-2 rounded-full bg-primary/40" />
          </div>
          <div className="flex-1 text-center text-xs sm:text-sm px-2 py-[2px] rounded-full truncate bg-input">
            {url}
          </div>
          <div className="bg-card hover:bg-red-500/10 w-5 h-5 rounded flex justify-center items-center">
            <X size={16} className="text-muted-foreground hover:text-red-900" />
          </div>
        </div>

        {/* Main content */}
        <div className="relative flex-1 overflow-hidden bg-linear-to-br from-card to-background  transition-all duration-300 ease-in-out group-hover:to-primary/10">
          {children}
        </div>
      </div>

      {/* Tag */}
      <div className="absolute right-0 bottom-0 bg-background border-t border-l border-input rounded-tl-xl flex items-center justify-center w-42 pt-2 pl-2 transition-colors duration-300 group-hover:border-input">
        <p className="flex items-center gap-2 text-sm font-semibold w-full justify-center p-2 rounded-tl-xl rounded-br-xl border border-input bg-linear-to-br from-card to-background transition-all duration-300  group-hover:border-input group-hover:to-primary/10">
          <div className="flex justify-between items-center w-full">
            <div className="relative w-full flex items-center gap-2">
              <span className="relative w-2 h-2 rounded-full block">
                <span className={`absolute inset-0 rounded-full ${isOnline ? "bg-primary" : "bg-muted-foreground"}`} />
                {isOnline && <span className="absolute inset-0 rounded-full bg-primary/60 animate-ping" />}
              </span>
              {isOnline ? "Active" : "Inactive"}
            </div>
            <Button variant="outline" size="sm" className="p-1! px-2!">
              <Power className="text-muted-foreground" />
            </Button>
          </div>
        </p>
      </div>
    </div>
  );
}
