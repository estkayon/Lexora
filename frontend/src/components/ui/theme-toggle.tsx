"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-colors hover:bg-surface-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {isDark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}