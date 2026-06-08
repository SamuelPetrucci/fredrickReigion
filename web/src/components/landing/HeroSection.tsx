import Link from "next/link";
import type { SiteConfig } from "@/config/site-config-schema";
import { getResolvedVideoEmbedSrc } from "@/lib/site-config";
import { BrandMark } from "./BrandMark";
import { TextGradient } from "./TextGradient";

export function HeroSection({ config }: { config: SiteConfig }) {
  const embedSrc = getResolvedVideoEmbedSrc(config);
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
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-20">
        <div>
          <div className="mb-8 max-w-xl">
            <BrandMark
              meta={meta}
              badgeRecruiting={hero.badgeRecruiting}
              badgeOffice={hero.badgeOffice}
            />
          </div>

          <h1 className="max-w-xl text-[1.65rem] font-extrabold leading-[1.15] tracking-tight text-[#0b111d] sm:text-4xl sm:leading-[1.12] lg:text-[2.75rem] lg:leading-[1.08]">
            {hero.headlineBefore}
            <TextGradient as="span" className="font-extrabold">
              {hero.headlineGradient}
            </TextGradient>
            {headlineAfter}
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-600 sm:text-lg sm:leading-relaxed">
            {hero.subhead}
          </p>

          <div className="mt-9">
            <Link
              href={nav.interviewHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b111d] px-6 py-4 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-all duration-300 ease-out hover:translate-y-[-1px] hover:bg-[#141c2e] hover:shadow-xl active:translate-y-0 sm:w-auto"
            >
              {cta.label}
              <span aria-hidden className="text-lg">
                →
              </span>
            </Link>
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

        <div>
          <div className="relative">
            <p className="mb-3 text-center text-xs font-medium uppercase tracking-widest text-zinc-400 lg:text-left">
              {hero.videoEyebrow}
            </p>
            <div className="overflow-hidden rounded-2xl bg-zinc-100 shadow-xl ring-1 ring-black/5 transition-all duration-500 ease-out hover:shadow-2xl">
              {embedSrc ? (
                <div className="aspect-video w-full">
                  <iframe
                    title="Overview video"
                    src={embedSrc}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#0f172a] via-[#0b111d] to-sky-950 px-6 text-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.15),transparent_50%)]" />
                  <div className="relative rounded-full bg-white/10 p-5 ring-1 ring-white/10">
                    <svg
                      className="h-12 w-12 text-cyan-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7L8 5z" />
                    </svg>
                  </div>
                  <div className="relative max-w-xs space-y-1">
                    <p className="text-sm font-medium text-white">
                      {hero.emptyVideoTitle}
                    </p>
                    <p className="text-xs leading-relaxed text-zinc-400">
                      {hero.emptyVideoHint}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
