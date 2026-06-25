import type { SiteConfig } from "@/config/site-config-schema";
import { StatValue } from "./StatValue";

export function StatsSection({ config }: { config: SiteConfig }) {
  const { stats } = config;
  return (
    <section className="bg-surface-raised px-4 py-14 transition-colors duration-500 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/80 transition-opacity duration-500">
          {stats.eyebrow}
        </p>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-8">
          {stats.items.map((s) => (
            <div
              key={s.label}
              className="text-center transition-transform duration-500 ease-out hover:translate-y-[-2px]"
            >
              <div className="text-3xl font-extrabold tabular-nums sm:text-4xl">
                <StatValue value={s.value} gradient={s.gradient} />
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}