import Link from "next/link";
import type { SiteConfig } from "@/config/site-config-schema";
import { Countdown } from "./Countdown";
import { TextGradient } from "./TextGradient";

export function FinalCtaSection({
  config,
  targetIso,
}: {
  config: SiteConfig;
  targetIso: string | null;
}) {
  const { finalCta, cta, nav } = config;
  return (
    <section
      className="bg-[#0c121e] px-4 py-16 text-center transition-colors duration-500 sm:px-6 sm:py-24"
      id={nav.interviewSectionId}
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          {finalCta.headlineBefore}
          <TextGradient as="span" className="font-extrabold">
            {finalCta.headlineGradient}
          </TextGradient>
        </h2>
        <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
          {finalCta.subhead}
        </p>

        <div className="mt-10 flex justify-center">
          <Countdown targetIso={targetIso} />
        </div>

        <div className="mt-10">
          <Link
            href={nav.interviewHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(120deg,#22d3ee,#2563eb,#1d4ed8)] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#0b111d] shadow-lg shadow-blue-900/30 transition-all duration-300 ease-out hover:brightness-110 hover:shadow-xl hover:shadow-blue-800/40 active:scale-[0.99]"
          >
            {cta.label}
            <span aria-hidden>→</span>
          </Link>
        </div>

        <p className="mt-8 text-sm text-slate-500">{finalCta.disclaimer}</p>
      </div>
    </section>
  );
}
