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

        <div className="mt-10 overflow-hidden rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5 sm:p-12">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 text-sky-700">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
            </div>
            <p className="mt-6 text-sm font-medium uppercase tracking-wide text-zinc-500">
              Google Calendar
            </p>
            <p className="mt-2 text-base text-zinc-600">
              Pick an open slot on the team calendar. The booking page opens in a
              new tab.
            </p>
            <div className="mt-8 w-full sm:w-auto">
              <ScheduleCtaButton
                href={schedule.url}
                external
                size="large"
                fullWidth
              >
                {cta.label}
              </ScheduleCtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
