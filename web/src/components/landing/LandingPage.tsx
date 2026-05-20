import type { SiteConfig } from "@/config/site-config-schema";
import { getResolvedCountdownTargetIso } from "@/lib/site-config-store";
import { CountdownBar } from "./CountdownBar";
import { FaqSection } from "./FaqSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { HeroSection } from "./HeroSection";
import { Reveal } from "./Reveal";
import { SiteFooter } from "./SiteFooter";
import { StatsSection } from "./StatsSection";
import { StorySection } from "./StorySection";
import { TeamSection } from "./TeamSection";
import { TrustBar } from "./TrustBar";
import { WhySection } from "./WhySection";

export function LandingPage({ config }: { config: SiteConfig }) {
  const targetIso = getResolvedCountdownTargetIso(config);

  return (
    <>
      <main>
        <Reveal>
          <HeroSection config={config} />
        </Reveal>
        <Reveal delayMs={40}>
          <CountdownBar
            overviewLabel={config.countdown.overviewLabel}
            targetIso={targetIso}
          />
        </Reveal>
        <Reveal delayMs={80}>
          <StatsSection config={config} />
        </Reveal>
        <Reveal delayMs={100}>
          <TrustBar config={config} />
        </Reveal>
        <Reveal delayMs={120}>
          <WhySection config={config} />
        </Reveal>
        <Reveal delayMs={140}>
          <StorySection config={config} />
        </Reveal>
        <Reveal delayMs={160}>
          <TeamSection config={config} />
        </Reveal>
        <Reveal delayMs={180}>
          <FaqSection config={config} />
        </Reveal>
        <Reveal delayMs={200}>
          <FinalCtaSection config={config} targetIso={targetIso} />
        </Reveal>
        <SiteFooter config={config} />
      </main>
    </>
  );
}
