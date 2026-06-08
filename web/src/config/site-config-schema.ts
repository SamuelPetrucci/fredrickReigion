export type FaqItemConfig = { question: string; answer: string };

export type StatItem = { value: string; label: string; gradient: boolean };

export type TrustItem = { icon: string; text: string };

export type WhyFeature = { icon: string; title: string; body: string };

export type TeamMember = { name: string; tagline: string; invite: string };

export type SiteConfig = {
  version: 1;
  meta: {
    brand: string;
    company: string;
    division: string;
  };
  nav: {
    interviewLabel: string;
    aboutLabel: string;
    interviewHref: string;
    aboutAnchorId: string;
    interviewSectionId: string;
  };
  cta: { label: string };
  countdown: {
    overviewLabel: string;
    /** ISO 8601 or empty — client uses env then 7-day placeholder */
    targetIso: string;
  };
  videoEmbedSrc: string;
  hero: {
    badgeRecruiting: string;
    badgeOffice: string;
    headlineBefore: string;
    headlineGradient: string;
    headlineAfter: string;
    subhead: string;
    videoEyebrow: string;
    avatarInitials: [string, string, string, string, string, string];
    socialTitle: string;
    socialSubtitle: string;
    emptyVideoTitle: string;
    emptyVideoHint: string;
  };
  stats: {
    eyebrow: string;
    items: [StatItem, StatItem, StatItem, StatItem];
  };
  trust: { items: [TrustItem, TrustItem, TrustItem, TrustItem] };
  why: {
    titleBefore: string;
    titleGradient: string;
    subtitle: string;
    features: [WhyFeature, WhyFeature, WhyFeature, WhyFeature, WhyFeature, WhyFeature];
  };
  story: {
    imageLargeUrl: string;
    imageSmallLeftUrl: string;
    imageSmallRightUrl: string;
    headlineBefore: string;
    headlineGradient: string;
    paragraph1: string;
    paragraph2: string;
    quote: string;
    quoteAttribution: string;
  };
  team: {
    titleBefore: string;
    titleGradient: string;
    subtitle: string;
    cardBadgeLabel: string;
    cardButtonLabel: string;
    members: TeamMember[];
  };
  faq: {
    titleBefore: string;
    titleGradient: string;
    subtitle: string;
    items: FaqItemConfig[];
  };
  finalCta: {
    headlineBefore: string;
    headlineGradient: string;
    subhead: string;
    disclaimer: string;
  };
  footer: {
    logoInitials: string;
    tagline: string;
    youtubeUrl: string;
    instagramUrl: string;
    copyright: string;
  };
};
