import Link from "next/link";
import type { SiteConfig } from "@/config/site-config-schema";
import { TextGradient } from "./TextGradient";
import { GradientStars } from "./GradientStars";

export function TeamSection({ config }: { config: SiteConfig }) {
  const { team, nav } = config;
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#0b111d] sm:text-4xl">
          {team.titleBefore}
          <TextGradient as="span" className="font-extrabold">
            {team.titleGradient}
          </TextGradient>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-zinc-600">
          {team.subtitle}
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((m) => (
            <article
              key={m.name}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-sky-200/80 hover:shadow-lg"
            >
              <GradientStars className="mb-4" />
              <p className="flex-1 text-sm leading-relaxed text-zinc-600">
                &ldquo;{m.invite}&rdquo;
              </p>
              <div className="mt-6 flex flex-wrap items-end justify-between gap-3 border-t border-zinc-100 pt-5">
                <div>
                  <p className="font-bold text-[#0b111d]">{m.name}</p>
                  <p className="text-xs text-zinc-500">{m.tagline}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                  {team.cardBadgeLabel}
                </span>
              </div>
              <Link
                href={nav.interviewHref}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 text-sm font-medium text-zinc-700 transition-all duration-300 hover:border-sky-300/60 hover:bg-sky-50/80"
              >
                <span aria-hidden className="text-zinc-500">
                  ▶
                </span>
                {team.cardButtonLabel}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
