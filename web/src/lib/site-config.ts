import { defaultSiteConfig } from "@/config/default-site-config";
import type { SiteConfig } from "@/config/site-config-schema";

/** Anchor id for in-page Apply CTAs */
export function getApplyAnchor(config: SiteConfig): string {
  return `#${config.nav.applySectionId}`;
}

/** Keeps nav.applyHref in sync with the apply section anchor. */
export function getSiteConfig(): SiteConfig {
  const applyAnchor = getApplyAnchor(defaultSiteConfig);
  return {
    ...defaultSiteConfig,
    nav: {
      ...defaultSiteConfig.nav,
      applyHref: applyAnchor,
    },
    apply: {
      ...defaultSiteConfig.apply,
      url: applyAnchor,
    },
  };
}

/** @deprecated Use getApplyAnchor — applications are submitted on-site. */
export function getApplyUrl(config: SiteConfig): string {
  return getApplyAnchor(config);
}
