import { z } from "zod";

export const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const statItemSchema = z.object({
  value: z.string(),
  label: z.string(),
  gradient: z.boolean(),
});

export const trustItemSchema = z.object({
  icon: z.string().min(1),
  text: z.string(),
});

export const whyFeatureSchema = z.object({
  icon: z.string().min(1),
  title: z.string(),
  body: z.string(),
});

export const teamMemberSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  invite: z.string(),
});

export const siteConfigSchema = z.object({
  version: z.literal(1),
  meta: z.object({
    brand: z.string(),
    company: z.string(),
    division: z.string(),
  }),
  nav: z.object({
    interviewLabel: z.string(),
    aboutLabel: z.string(),
    interviewHref: z.string(),
    aboutAnchorId: z.string(),
    /** DOM id for the final CTA / interview anchor section */
    interviewSectionId: z.string(),
  }),
  cta: z.object({
    label: z.string(),
  }),
  countdown: z.object({
    overviewLabel: z.string(),
    /** ISO 8601 for the next interview/overview slot, or empty to use env then a 7-day placeholder */
    targetIso: z.string(),
  }),
  /** Vimeo/YouTube iframe src, or empty */
  videoEmbedSrc: z.string(),
  hero: z.object({
    badgeRecruiting: z.string(),
    badgeOffice: z.string(),
    headlineBefore: z.string(),
    headlineGradient: z.string(),
    headlineAfter: z.string(),
    subhead: z.string(),
    videoEyebrow: z.string(),
    avatarInitials: z.array(z.string()).length(6),
    socialTitle: z.string(),
    socialSubtitle: z.string(),
    emptyVideoTitle: z.string(),
    emptyVideoHint: z.string(),
  }),
  stats: z.object({
    eyebrow: z.string(),
    items: z.array(statItemSchema).length(4),
  }),
  trust: z.object({
    items: z.array(trustItemSchema).length(4),
  }),
  why: z.object({
    titleBefore: z.string(),
    titleGradient: z.string(),
    subtitle: z.string(),
    features: z.array(whyFeatureSchema).length(6),
  }),
  story: z.object({
    imageLargeUrl: z.string(),
    imageSmallLeftUrl: z.string(),
    imageSmallRightUrl: z.string(),
    headlineBefore: z.string(),
    headlineGradient: z.string(),
    paragraph1: z.string(),
    paragraph2: z.string(),
    quote: z.string(),
    quoteAttribution: z.string(),
  }),
  team: z.object({
    titleBefore: z.string(),
    titleGradient: z.string(),
    subtitle: z.string(),
    cardBadgeLabel: z.string(),
    cardButtonLabel: z.string(),
    members: z.array(teamMemberSchema).min(1).max(12),
  }),
  faq: z.object({
    titleBefore: z.string(),
    titleGradient: z.string(),
    subtitle: z.string(),
    items: z.array(faqItemSchema).min(1).max(20),
  }),
  finalCta: z.object({
    headlineBefore: z.string(),
    headlineGradient: z.string(),
    subhead: z.string(),
    disclaimer: z.string(),
  }),
  footer: z.object({
    logoInitials: z.string(),
    tagline: z.string(),
    youtubeUrl: z.string(),
    instagramUrl: z.string(),
    copyright: z.string(),
  }),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type FaqItemConfig = z.infer<typeof faqItemSchema>;
