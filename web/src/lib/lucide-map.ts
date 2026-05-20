import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

export function getLucideIcon(name: string): LucideIcon {
  const Icon = (Icons as unknown as Record<string, LucideIcon | undefined>)[
    name
  ];
  return Icon ?? Icons.CircleHelp;
}
