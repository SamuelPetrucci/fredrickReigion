import type { SiteConfig } from "@/config/site-config-schema";
import { ApplyCtaButton } from "./ApplyCtaButton";
import { TeamCarousel } from "./TeamCarousel";
import { TextGradient } from "./TextGradient";

export function TeamSection({ config }: { config: SiteConfig }) {
  const { team, cta } = config;

  return (
    <section id="team" className="landing-section-alt px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {team.titleBefore}
          <TextGradient as="span" className="font-extrabold">
            {team.titleGradient}
          </TextGradient>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-zinc-400">
          {team.subtitle}
        </p>

        <div className="mt-14">
          <TeamCarousel
            members={team.members}
            badgeLabel={team.cardBadgeLabel}
          />
        </div>

        <div className="mt-10 flex justify-center">
          <ApplyCtaButton size="large">
            {cta.label}
          </ApplyCtaButton>
        </div>
      </div>
    </section>
  );
}
