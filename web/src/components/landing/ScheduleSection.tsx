import type { SiteConfig } from "@/config/site-config-schema";
import { getScheduleUrl } from "@/lib/site-config";
import { ScheduleCtaButton } from "./ScheduleCtaButton";
import { TextGradient } from "./TextGradient";

export function ScheduleSection({ config }: { config: SiteConfig }) {
  const { schedule, cta } = config;
  const scheduleUrl = getScheduleUrl(config);

  return (
    <section
      className="landing-section-alt border-y border-white/10 px-4 py-16 sm:px-6 sm:py-20"
      id={config.nav.interviewSectionId}
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-amber-400">
          {schedule.eyebrow}
        </p>
        <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <TextGradient as="span" className="font-extrabold">
            {schedule.title}
          </TextGradient>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-zinc-400">
          {schedule.subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <ScheduleCtaButton href={scheduleUrl} size="large">
            {cta.label}
          </ScheduleCtaButton>
          <a
            href={scheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 underline-offset-2 transition-colors hover:text-amber-300 hover:underline"
          >
            Open Google Calendar appointment page
          </a>
        </div>
      </div>
    </section>
  );
}
