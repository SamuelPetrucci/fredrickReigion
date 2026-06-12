import type { SiteConfig } from "@/config/site-config-schema";
import { BrandMark } from "./BrandMark";
import { ScheduleCtaButton } from "./ScheduleCtaButton";
import { TextGradient } from "./TextGradient";

export function HeroSection({ config }: { config: SiteConfig }) {
  const { hero, meta, cta, nav } = config;
  const headlineAfter = hero.headlineAfter
    .replaceAll("__BRAND__", meta.brand)
    .replaceAll("__COMPANY__", meta.company);

  return (
    <section
      className="relative overflow-hidden border-b border-zinc-100 bg-white"
      id={nav.aboutAnchorId}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.12),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="mb-8">
          <BrandMark
            meta={meta}
            badgeRecruiting={hero.badgeRecruiting}
            badgeOffice={hero.badgeOffice}
          />
        </div>

        <h1 className="text-[1.65rem] font-extrabold leading-[1.15] tracking-tight text-[#0b111d] sm:text-4xl sm:leading-[1.12] lg:text-[2.75rem] lg:leading-[1.08]">
          {hero.headlineBefore}
          <TextGradient as="span" className="font-extrabold">
            {hero.headlineGradient}
          </TextGradient>
          {headlineAfter}
        </h1>

        <p className="mt-6 text-base leading-relaxed text-zinc-600 sm:text-lg sm:leading-relaxed">
          {hero.subhead}
        </p>

        <div className="mt-9">
          <ScheduleCtaButton href={nav.interviewHref} size="large" fullWidth>
            {cta.label}
          </ScheduleCtaButton>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-zinc-100 pt-8">
          <div className="flex -space-x-2">
            {hero.avatarInitials.map((initials, i) => (
              <span
                key={`${initials}-${i}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-zinc-100 to-zinc-200 text-xs font-semibold text-zinc-700 shadow-sm transition-transform duration-300 hover:z-10 hover:scale-110"
              >
                {initials}
              </span>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0b111d]">
              {hero.socialTitle}
            </p>
            <p className="text-xs text-zinc-500">{hero.socialSubtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
