import type { ReactNode } from "react";
import type { SiteConfig } from "@/config/site-config-schema";
import { TextGradient } from "./TextGradient";

function StoryMedia({
  url,
  className,
  children,
}: {
  url: string;
  className: string;
  children: ReactNode;
}) {
  const trimmed = url?.trim();
  if (trimmed) {
    return (
      <div className={`overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- configurable image URLs */}
        <img
          src={trimmed}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
        />
      </div>
    );
  }
  return (
    <div
      className={`overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 transition-transform duration-500 ease-out hover:scale-[1.01] ${className}`}
    >
      {children}
    </div>
  );
}

export function StorySection({ config }: { config: SiteConfig }) {
  const { story } = config;

  return (
    <section className="bg-zinc-50 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <StoryMedia
            url={story.imageLargeUrl}
            className="col-span-2 aspect-[16/10]"
          >
            <div className="flex h-full min-h-[12rem] w-full flex-col justify-end bg-gradient-to-br from-sky-200 via-blue-400 to-indigo-700 p-6 text-white">
              <p className="text-sm font-semibold opacity-90">
                Add team photos in default-site-config.ts
              </p>
              <p className="text-xs opacity-75">
                Set story.imageLargeUrl (and related fields) to a public image URL.
              </p>
            </div>
          </StoryMedia>
          <StoryMedia url={story.imageSmallLeftUrl} className="aspect-[4/3]">
            <div className="h-full min-h-[8rem] w-full bg-gradient-to-br from-zinc-700 to-[#0b111d]" />
          </StoryMedia>
          <StoryMedia url={story.imageSmallRightUrl} className="aspect-[4/3]">
            <div className="h-full min-h-[8rem] w-full bg-gradient-to-br from-cyan-700 to-blue-900" />
          </StoryMedia>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#0b111d] sm:text-4xl">
            {story.headlineBefore}
            <TextGradient as="span" className="font-extrabold">
              {story.headlineGradient}
            </TextGradient>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-zinc-700">
            {story.paragraph1}
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-700">
            {story.paragraph2}
          </p>
          <blockquote className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
            <p className="text-base font-semibold italic leading-relaxed text-zinc-800">
              &ldquo;{story.quote}&rdquo;
            </p>
            <footer className="mt-4 text-sm font-semibold">
              <TextGradient as="span">{story.quoteAttribution}</TextGradient>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
