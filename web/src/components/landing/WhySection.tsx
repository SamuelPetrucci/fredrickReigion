import type { SiteConfig } from "@/config/site-config-schema";
import { getScheduleUrl } from "@/lib/site-config";
import { getLucideIcon } from "@/lib/lucide-map";
import { ScheduleCtaButton } from "./ScheduleCtaButton";
import { TextGradient } from "./TextGradient";

export function WhySection({ config }: { config: SiteConfig }) {
  const { why, cta } = config;
  const scheduleUrl = getScheduleUrl(config);

  return (
    <section className="landing-section px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {why.titleBefore}
          <TextGradient as="span" className="font-extrabold">
            {why.titleGradient}
          </TextGradient>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-zinc-400">
          {why.subtitle}
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {why.features.map(({ icon: iconName, title, body }) => {
            const Icon = getLucideIcon(iconName);
            return (
              <div
                key={title}
                className="landing-card rounded-2xl p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-900/10"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent ring-1 ring-amber-500/30">
                  <Icon
                    className="h-5 w-5 text-amber-400"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {body}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <ScheduleCtaButton href={scheduleUrl} size="large">
            {cta.label}
          </ScheduleCtaButton>
        </div>
      </div>
    </section>
  );
}
