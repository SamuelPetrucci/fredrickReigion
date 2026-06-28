import type { SiteConfig } from "@/config/site-config-schema";
import { ApplyCtaButton } from "./ApplyCtaButton";
import { BrandMark } from "./BrandMark";
import { PhotoCarousel } from "./PhotoCarousel";
import { TextGradient } from "./TextGradient";

export function HeroSection({ config }: { config: SiteConfig }) {
  const { hero, meta, cta, nav, gallery } = config;
  const headlineAfter = hero.headlineAfter
    .replaceAll("__BRAND__", meta.brand)
    .replaceAll("__COMPANY__", meta.company);

  return (
    <section
      className="landing-section relative overflow-hidden border-b border-white/10"
      id={nav.aboutAnchorId}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(212,175,55,0.18),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="mb-8">
          <BrandMark
            meta={meta}
            badgeRecruiting={hero.badgeRecruiting}
            badgeOffice={hero.badgeOffice}
          />
        </div>

        <h1 className="text-[1.65rem] font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl sm:leading-[1.12] lg:text-[2.75rem] lg:leading-[1.08]">
          {hero.headlineBefore}
          <TextGradient as="span" className="font-extrabold">
            {hero.headlineGradient}
          </TextGradient>
          {headlineAfter}
        </h1>

        <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg sm:leading-relaxed">
          {hero.subhead}
        </p>

        {gallery.images.length > 0 && (
          <div className="mt-8">
            <PhotoCarousel images={gallery.images} embedded />
          </div>
        )}

        <div className="mt-9">
          <ApplyCtaButton size="large" fullWidth>
            {cta.label}
          </ApplyCtaButton>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          <div className="flex -space-x-2">
            {hero.avatarInitials.map((initials, i) => (
              <span
                key={`${initials}-${i}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0b111d] bg-gradient-to-br from-zinc-700 to-zinc-800 text-xs font-semibold text-amber-100 shadow-sm transition-transform duration-300 hover:z-10 hover:scale-110"
              >
                {initials}
              </span>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {hero.socialTitle}
            </p>
            <p className="text-xs text-zinc-500">{hero.socialSubtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
