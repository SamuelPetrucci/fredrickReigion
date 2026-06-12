import type { SiteConfig } from "@/config/site-config-schema";
import { ScheduleCtaButton } from "./ScheduleCtaButton";
import { TextGradient } from "./TextGradient";

export function ScheduleSection({ config }: { config: SiteConfig }) {
  const { schedule, cta } = config;

  return (
    <section
      className="border-y border-zinc-100 bg-zinc-50 px-4 py-16 sm:px-6 sm:py-20"
      id={config.nav.interviewSectionId}
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-sky-700">
          {schedule.eyebrow}
        </p>
        <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-[#0b111d] sm:text-4xl">
          <TextGradient as="span" className="font-extrabold">
            {schedule.title}
          </TextGradient>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-zinc-600">
          {schedule.subtitle}
        </p>

        <div className="mt-10 flex justify-center">
          <ScheduleCtaButton href={schedule.url} external size="large">
            {cta.label}
          </ScheduleCtaButton>
        </div>
      </div>
    </section>
  );
}
