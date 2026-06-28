import type { SiteConfig } from "@/config/site-config-schema";
import { ApplyCtaButton } from "./ApplyCtaButton";
import { TextGradient } from "./TextGradient";

export function FinalCtaSection({ config }: { config: SiteConfig }) {
  const { finalCta, cta } = config;

  return (
    <section className="bg-[#0c121e] px-4 py-16 text-center transition-colors duration-500 sm:px-6 sm:py-24">
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
          <ApplyCtaButton size="large">{cta.label}</ApplyCtaButton>
        </div>

        <p className="mt-8 text-sm text-slate-500">{finalCta.disclaimer}</p>
      </div>
    </section>
  );
}
