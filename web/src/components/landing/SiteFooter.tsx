import Link from "next/link";
import type { SiteConfig } from "@/config/site-config-schema";

/** Slim closing strip — keeps legal/social without a full footer layout. */
export function SiteFooter({ config }: { config: SiteConfig }) {
  const year = new Date().getFullYear();
  const { footer, meta } = config;
  const rights = footer.copyright
    .replace("__BRAND__", meta.brand)
    .replace("__COMPANY__", meta.company);

  const hasSocial =
    footer.youtubeUrl.trim() !== "#" || footer.instagramUrl.trim() !== "#";

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50/80 px-4 py-5 text-center sm:px-6">
      <p className="text-[11px] leading-relaxed text-zinc-500 sm:text-xs">
        <span className="text-zinc-600">
          {meta.brand} · {meta.company}
        </span>
        <span className="text-zinc-300"> · </span>
        <span>© {year} {rights}</span>
        {hasSocial && (
          <>
            <span className="text-zinc-300"> · </span>
            {footer.youtubeUrl.trim() !== "#" && (
              <Link
                href={footer.youtubeUrl}
                className="text-zinc-500 underline-offset-2 hover:text-zinc-800 hover:underline"
                rel="noopener noreferrer"
              >
                YouTube
              </Link>
            )}
            {footer.youtubeUrl.trim() !== "#" &&
              footer.instagramUrl.trim() !== "#" && (
                <span className="text-zinc-300"> · </span>
              )}
            {footer.instagramUrl.trim() !== "#" && (
              <Link
                href={footer.instagramUrl}
                className="text-zinc-500 underline-offset-2 hover:text-zinc-800 hover:underline"
                rel="noopener noreferrer"
              >
                Instagram
              </Link>
            )}
          </>
        )}
      </p>
    </footer>
  );
}
