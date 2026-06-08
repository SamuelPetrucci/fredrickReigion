import type { SiteConfig } from "./site-config-schema";

export const defaultSiteConfig: SiteConfig = {
  version: 1,
  meta: {
    brand: "Fedrick Region",
    company: "MedaHealth",
    division: "Health and life insurance — Fort Laureate office",
  },
  nav: {
    interviewLabel: "Schedule",
    aboutLabel: "About",
    interviewHref: "#interview",
    aboutAnchorId: "about",
    interviewSectionId: "interview",
  },
  cta: {
    label: "SCHEDULE YOUR INTERVIEW",
  },
  countdown: {
    overviewLabel: "LIVE Overview — schedule a time that works for you",
    targetIso: "",
  },
  videoEmbedSrc: "",
  hero: {
    badgeRecruiting: "Recruiting",
    badgeOffice: "Fort Laureate office",
    headlineBefore: "From stuck and capped to ",
    headlineGradient: "six-figure",
    headlineAfter: " income in health & life sales — with __BRAND__.",
    subhead:
      "Join MedaHealth at the Fort Laureate office. See the system, hands-on training, and warm-lead support built to remove the barrier between you and the income you are working for — then schedule your interview to learn what is next.",
    videoEyebrow: "Watch the overview",
    avatarInitials: ["CR", "TB", "AW", "JM", "SP", "JH"],
    socialTitle: "Meet your future teammates",
    socialSubtitle: "Fort Laureate producers · growing roster",
    emptyVideoTitle: "Video embed ready when you are",
    emptyVideoHint:
      "Add a video embed URL in default-site-config.ts or set NEXT_PUBLIC_VIDEO_EMBED_SRC on Vercel.",
  },
  stats: {
    eyebrow: "Real results from real people",
    items: [
      { value: "$180,000", label: "Highest monthly earner", gradient: true },
      { value: "$2,000,000+", label: "Top 4-year earner", gradient: true },
      { value: "15,000+", label: "Active agents", gradient: false },
      { value: "$90,000", label: "Avg top earner / mo", gradient: true },
    ],
  },
  trust: {
    items: [
      { icon: "Shield", text: "Compliance-minded onboarding" },
      { icon: "BadgeCheck", text: "Carrier-backed products" },
      { icon: "BookOpen", text: "Structured training path" },
      { icon: "Users", text: "Team-led coaching" },
    ],
  },
  why: {
    titleBefore: "Why sales with ",
    titleGradient: "Fedrick Region?",
    subtitle:
      "We have built a system that removes the barrier between you and a six-figure income. Here is what you get on day one.",
    features: [
      {
        icon: "Phone",
        title: "Unlimited free warm leads",
        body: "We emphasize warm conversations over cold lists. Lead flow and eligibility are explained upfront with leadership.",
      },
      {
        icon: "ScrollText",
        title: "Proven talk track & process",
        body: "You get a clear framework to run appointments and follow up — with mentorship so you are not guessing alone.",
      },
      {
        icon: "MapPin",
        title: "In-person, hands-on training",
        body: "Fort Laureate office culture includes live training and side-by-side work so skills compound faster.",
      },
      {
        icon: "DollarSign",
        title: "Uncapped earning potential",
        body: "Your results follow effort and consistency. Compensation ties to production; we walk through realistic expectations on the call.",
      },
      {
        icon: "Users",
        title: "Team in the trenches with you",
        body: "Coaches who are actively in the field — not theory-only — so feedback maps to what actually works today.",
      },
      {
        icon: "Clock",
        title: "Residual income path",
        body: "Learn how renewals and long-term compensation work with your contracts and carriers — vesting rules apply.",
      },
    ],
  },
  story: {
    imageLargeUrl: "",
    imageSmallLeftUrl: "",
    imageSmallRightUrl: "",
    headlineBefore: "This is not just a job. ",
    headlineGradient: "It is a vehicle for your goals.",
    paragraph1:
      "MedaHealth and the Fedrick Region team focus on clear expectations, licensing support, and a culture where producers help each other win. If you want a structured path in Fort Laureate — not hype — start by scheduling a conversation with the team.",
    paragraph2:
      "Bring your work ethic. We bring training, leadership, and a roadmap so you can evaluate fit with full transparency.",
    quote:
      "We do not just hand you a script and disappear. We build skill in the room and in the field — together.",
    quoteAttribution: "Fedrick Region leadership",
  },
  team: {
    titleBefore: "Don't take our word for it — ",
    titleGradient: "meet your future team",
    subtitle:
      "Real people building in Fort Laureate. Replace invite lines with approved testimonials when you have them.",
    cardBadgeLabel: "Schedule",
    cardButtonLabel: "Watch their story",
    members: [
      {
        name: "Cory Cintron",
        tagline: "Producer",
        invite:
          "Meet Cory when you schedule — hear how he runs appointments day to day.",
      },
      {
        name: "Tom Buettner",
        tagline: "Producer",
        invite:
          "Learn how Tom balances training new partners with personal production once you are on the calendar.",
      },
      {
        name: "Austin Woodruff",
        tagline: "Producer",
        invite:
          "Austin focuses on systems and follow-up so nothing falls through the cracks.",
      },
      {
        name: "Jason Macaroni",
        tagline: "Producer",
        invite:
          "Jason brings energy and accountability to the Fort Laureate floor.",
      },
      {
        name: "Stephen Piazzola",
        tagline: "Producer",
        invite:
          "Stephen helps newer agents shorten the learning curve with clear feedback.",
      },
      {
        name: "Jack Hanzal",
        tagline: "Producer",
        invite:
          "Jack is big on culture — teamwork on tough days and celebrating wins.",
      },
    ],
  },
  faq: {
    titleBefore: "Frequently asked ",
    titleGradient: "questions",
    subtitle:
      "Straight answers you can verify with leadership when you schedule your interview.",
    items: [
      {
        question: "Do I need sales experience?",
        answer:
          "Not necessarily. We look for coachability and work ethic. If you are new to sales, expect structured training and hands-on practice so you can learn the process step by step.",
      },
      {
        question: "Is this commission only?",
        answer:
          "Compensation is tied to production in line with industry practice. Exact structure varies by role and licensing; we cover how pay works transparently when you interview.",
      },
      {
        question: "What are residuals?",
        answer:
          "Residuals (or renewals) refer to ongoing compensation tied to business you write and service over time, subject to carrier rules and vesting. Details depend on product and tenure — we explain this clearly during onboarding.",
      },
      {
        question: "How do I get leads?",
        answer:
          "Our recruiting message highlights warm lead support for producers. Specific lead programs, availability, and eligibility are covered with leadership so you know what to expect before you start.",
      },
      {
        question: "Where are we located?",
        answer:
          "We are recruiting for the Fort Laureate office with MedaHealth. Location, hybrid options, and field expectations are confirmed when you connect with the team.",
      },
    ],
  },
  finalCta: {
    headlineBefore: "Your future self will thank you for ",
    headlineGradient: "scheduling your interview.",
    subhead:
      "The worst-case scenario? You spend an hour and decide it is not a fit. The best-case scenario? You find a team and platform that match your goals.",
    disclaimer:
      "Free to attend. No obligation. Pick a time that works for you and confirm details with the Fort Laureate office.",
  },
  footer: {
    logoInitials: "FR",
    tagline: "Fort Laureate recruiting",
    youtubeUrl: "#",
    instagramUrl: "#",
    copyright:
      "__BRAND__. All rights reserved. __COMPANY__ — update legal entity before launch.",
  },
};
