import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <header className="flex h-18 shrink-0 items-center justify-between border-b border-border bg-surface px-5 md:px-8">
      <div>
        <h1 className="text-base font-semibold tracking-tight">
          Writing Workspace
        </h1>

        <p className="text-xs text-muted-foreground">
          Create, refine and analyze your writing
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground sm:flex">
          <Sparkles size={14} className="text-primary" />
          Personal Workspace
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}