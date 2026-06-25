import type { SiteConfig } from "@/config/site-config-schema";
import { TextGradient } from "./TextGradient";

export function StorySection({ config }: { config: SiteConfig }) {
  const { story } = config;

  return (
    <section className="landing-section-alt px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
          {story.headlineBefore}
          <TextGradient as="span" className="font-extrabold">
            {story.headlineGradient}
          </TextGradient>
        </h2>
        <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
          {story.paragraph1}
        </p>
        <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
          {story.paragraph2}
        </p>
        <blockquote className="landing-card mt-8 rounded-2xl p-6 text-left shadow-sm transition-shadow duration-300 hover:border-amber-500/20 hover:shadow-md sm:p-8">
          <p className="text-base font-semibold italic leading-relaxed text-zinc-200 sm:text-lg">
            &ldquo;{story.quote}&rdquo;
          </p>
          <footer className="mt-4 text-sm font-semibold">
            <TextGradient as="span">{story.quoteAttribution}</TextGradient>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
