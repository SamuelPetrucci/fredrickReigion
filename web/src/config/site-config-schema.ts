export type FaqItemConfig = { question: string; answer: string };

export type StatItem = { value: string; label: string; gradient: boolean };

export type TrustItem = { icon: string; text: string };

export type WhyFeature = { icon: string; title: string; body: string };

export type TeamMember = { name: string; tagline: string; quote: string };

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
  schedule: {
    /** Google Calendar appointment booking URL */
    url: string;
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  hero: {
    badgeRecruiting: string;
    badgeOffice: string;
    headlineBefore: string;
    headlineGradient: string;
    headlineAfter: string;
    subhead: string;
    teamCardsEyebrow: string;
    avatarInitials: string[];
    socialTitle: string;
    socialSubtitle: string;
  };
  stats: {
    eyebrow: string;
    items: StatItem[];
  };
  trust: { items: [TrustItem, TrustItem, TrustItem, TrustItem] };
  why: {
    titleBefore: string;
    titleGradient: string;
    subtitle: string;
    features: [WhyFeature, WhyFeature, WhyFeature, WhyFeature, WhyFeature, WhyFeature];
  };
  story: {
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
