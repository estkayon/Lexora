"use client";

import {
  BrainCircuit,
  History,
  House,
  PanelLeftClose,
  ScanText,
  Settings2,
  WandSparkles,
} from "lucide-react";
import { useState } from "react";

type NavigationItem = {
  label: string;
  icon: typeof House;
};

const navigationItems: NavigationItem[] = [
  { label: "Workspace", icon: House },
  { label: "Humanizer", icon: WandSparkles },
  { label: "AI Detector", icon: ScanText },
  { label: "History", icon: History },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden shrink-0 flex-col border-r border-border bg-surface transition-[width] duration-200 lg:flex ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex h-18 items-center justify-between border-b border-border px-5">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
              <BrainCircuit size={20} />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Lexora
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="rounded-lg p-2 text-muted-foreground hover:bg-surface-secondary"
        >
          <PanelLeftClose size={19} />
        </button>
      </div>

      <nav aria-label="Main navigation" className="flex-1 space-y-1 p-3">
        {navigationItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            title={collapsed ? label : undefined}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-secondary hover:text-foreground"
          >
            <Icon size={19} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted-foreground">
          <Settings2 size={19} />
          {!collapsed && <span>Settings (Coming soon)</span>}
        </div>
      </div>
    </aside>
  );
}