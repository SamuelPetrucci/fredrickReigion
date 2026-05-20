import type { SiteConfig } from "@/config/site-config-schema";
import { getLucideIcon } from "@/lib/lucide-map";

export function TrustBar({ config }: { config: SiteConfig }) {
  return (
    <div className="border-y border-zinc-200 bg-white px-4 py-5 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col flex-wrap items-center justify-between gap-4 sm:flex-row sm:gap-6">
        {config.trust.items.map((item) => {
          const Icon = getLucideIcon(item.icon);
          return (
            <div
              key={item.text}
              className="group flex items-center gap-2 text-sm font-medium text-zinc-700 transition-colors duration-300 hover:text-sky-800"
            >
              <Icon
                className="h-5 w-5 shrink-0 text-sky-600 transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.75}
                aria-hidden
              />
              {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
