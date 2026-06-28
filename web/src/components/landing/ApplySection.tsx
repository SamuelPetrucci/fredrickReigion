import type { SiteConfig } from "@/config/site-config-schema";
import { ApplyCtaButton } from "./ApplyCtaButton";
import { TextGradient } from "./TextGradient";

export function ApplySection({ config }: { config: SiteConfig }) {
  const { apply, cta } = config;

  return (
    <section
      className="landing-section-alt border-y border-white/10 px-4 py-14 sm:px-6 sm:py-16"
      id={config.nav.applySectionId}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
          {apply.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <TextGradient as="span" className="font-extrabold">
            {apply.title}
          </TextGradient>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
          {apply.subtitle}
        </p>

        <div className="mt-8 flex justify-center">
          <ApplyCtaButton size="large">{cta.label}</ApplyCtaButton>
        </div>
      </div>
    </section>
  );
}
