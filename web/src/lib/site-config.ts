import { defaultSiteConfig } from "@/config/default-site-config";
import type { SiteConfig } from "@/config/site-config-schema";

const DEFAULT_APPLY_URL =
  "https://docs.google.com/forms/d/1uuCSJOz9Yjxx6oYqxD8pEyQsh6BJVdaVDxWqnZEROUo/viewform";

function normalizeApplyUrl(url: string | undefined): string {
  const trimmed = url?.trim() ?? "";
  if (!trimmed || trimmed === "#" || trimmed === "#apply") {
    return DEFAULT_APPLY_URL;
  }
  return trimmed;
}

/** Keeps `nav.applyHref` in sync with `apply.url` for every CTA. */
export function getSiteConfig(): SiteConfig {
  const applyUrl = normalizeApplyUrl(defaultSiteConfig.apply.url);
  return {
    ...defaultSiteConfig,
    apply: {
      ...defaultSiteConfig.apply,
      url: applyUrl,
    },
    nav: {
      ...defaultSiteConfig.nav,
      applyHref: applyUrl,
    },
  };
}

/** Google Forms application URL */
export function getApplyUrl(config: SiteConfig): string {
  return normalizeApplyUrl(config.apply.url?.trim() || config.nav.applyHref);
}
