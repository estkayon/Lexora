"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BrainCircuit,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { navigationItems } from "@/config/navigation";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`hidden shrink-0 flex-col border-r border-border bg-surface transition-[width] duration-200 lg:flex ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex h-18 items-center justify-between border-b border-border px-5">
        {!collapsed && (
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Lexora home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white dark:text-background">
              <BrainCircuit size={20} />
            </div>

            <span className="text-xl font-semibold tracking-tight">
              Lexora
            </span>
          </Link>
        )}

        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-surface-secondary focus-visible:outline-2 focus-visible:outline-primary"
        >
          {collapsed ? (
            <PanelLeftOpen size={19} />
          ) : (
            <PanelLeftClose size={19} />
          )}
        </button>
      </div>

      <nav aria-label="Main navigation" className="flex-1 space-y-1 p-3">
        {navigationItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-surface-secondary hover:text-foreground"
              }`}
            >
              <Icon size={19} className="shrink-0" />

              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <p
          className={`text-xs text-muted-foreground ${
            collapsed ? "text-center" : "px-3"
          }`}
        >
          {collapsed ? "v0.1" : "Lexora · v0.1"}
        </p>
      </div>
    </aside>
  );
}