import { useCallback, useEffect, useState } from "react";
import { ThemeToggleButton, useThemeTransition } from "@/components/ui/shadcn-io/theme-toggle-button";
import { useTheme } from "./hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleThemeToggle = useCallback(() => {
    const newMode = theme === "dark" ? "light" : "dark";

    startTransition(() => {
      setTheme(newMode);
    });
  }, [theme, setTheme, startTransition]);

  if (!mounted) return null;

  return (
    <ThemeToggleButton
      theme={theme}
      onClick={handleThemeToggle}
      variant="circle-blur"
      start="top-right"
      className="cursor-pointer"
    />
  );
};
