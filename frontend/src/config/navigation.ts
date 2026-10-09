import {
  History,
  House,
  ScanText,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navigationItems: NavigationItem[] = [
  {
    label: "Workspace",
    href: "/",
    icon: House,
  },
  {
    label: "Humanizer",
    href: "/humanizer",
    icon: WandSparkles,
  },
  {
    label: "AI Detector",
    href: "/detector",
    icon: ScanText,
  },
  {
    label: "History",
    href: "/history",
    icon: History,
  },
];