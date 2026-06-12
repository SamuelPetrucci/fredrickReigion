import type { SiteConfig } from "./site-config-schema";

const SCHEDULE_URL = "https://calendar.app.google/2VmyRRuvzv5a1oM46";

export const defaultSiteConfig: SiteConfig = {
  version: 1,
  meta: {
    brand: "Fedrick Region",
    company: "MedaHealth",
    division: "Health and life insurance — Fort Lauderdale office",
  },
  nav: {
    interviewLabel: "Schedule",
    aboutLabel: "About",
    interviewHref: "#schedule",
    aboutAnchorId: "about",
    interviewSectionId: "schedule",
  },
  cta: {
    label: "SCHEDULE YOUR INTERVIEW",
  },
  schedule: {
    url: SCHEDULE_URL,
    eyebrow: "Pick a time",
    title: "Schedule your interview",
    subtitle:
      "Choose a slot that works for you. No pressure — just a conversation with the Fort Lauderdale team.",
  },
  hero: {
    badgeRecruiting: "Recruiting",
    badgeOffice: "Fort Lauderdale office",
    headlineBefore: "From stuck and capped to ",
    headlineGradient: "six-figure",
    headlineAfter: " income in health & life sales — with __BRAND__.",
    subhead:
      "Join MedaHealth at the Fort Lauderdale office. Real producers who came from restaurants, desk jobs, and part-time work — now building uncapped income and residual wealth.",
    teamCardsEyebrow: "Meet your future team",
    avatarInitials: ["JM", "CC", "DL", "AW", "TB"],
    socialTitle: "Real stories from real producers",
    socialSubtitle: "Fort Lauderdale · MedaHealth",
  },
  stats: {
    eyebrow: "Real results from real people",
    items: [
      { value: "$92,897.89", label: "Highest monthly earner", gradient: true },
      { value: "400+", label: "Active agents", gradient: false },
      { value: "$30,000", label: "Average top earner / mo", gradient: true },
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
        body: "Fort Lauderdale office culture includes live training and side-by-side work so skills compound faster.",
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
      "MedaHealth and the Fedrick Region team focus on clear expectations, licensing support, and a culture where producers help each other win. If you want a structured path in Fort Lauderdale — not hype — start by scheduling a conversation with the team.",
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
      "They came from restaurants, bartending, and desk jobs — and built careers with freedom, residual income, and uncapped earnings.",
    cardBadgeLabel: "Producer",
    members: [
      {
        name: "Jason Macaroni",
        tagline: "Former server & desk job · $20/hr",
        quote:
          "Before this I was serving tables, washing dishes, and working a desk job for $20/hr. We expect to get out of college and start making $100k/year but that is not the case — this job gives you the opportunity to make far more than that within your first 12 months, while also having the freedom to run your business the way you want.",
      },
      {
        name: "Cory Cintron",
        tagline: "$250k+ first year in insurance",
        quote:
          "I came from working two part-time jobs making $12–15 an hour, earning around $40k a year at best. Then I got into insurance and made over $250k+ my first year while being able to create my own schedule.",
      },
      {
        name: "Dylan Loos",
        tagline: "Restaurant · 3x previous income",
        quote:
          "I worked part time at a restaurant making minimum wage plus tips. Now I can create my own schedule and build residual income while making 3x the money I was making while serving.",
      },
      {
        name: "Austin Woodruff",
        tagline: "Former bartender · 70 hrs/week",
        quote:
          "I came from working open to close double shifts as a bartender (70 hours/week). The freedom and residual I have built within a year is unbeatable in any other industry. Last year, just the commissions and bonuses alone made me more than bartending all those hours weekly.",
      },
      {
        name: "Tom Buettner",
        tagline: "Part-time bartender → uncapped career",
        quote:
          "I started working as a part-time bartender making just enough to pay for college. I knew I wanted more for my future. Joining MedaHealth gave me the opportunity to build an uncapped career, develop valuable skills, and surround myself with ambitious people who inspire me to grow every day.",
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
          "We are recruiting for the Fort Lauderdale office with MedaHealth. Location, hybrid options, and field expectations are confirmed when you connect with the team.",
      },
    ],
  },
  finalCta: {
    headlineBefore: "Your future self will thank you for ",
    headlineGradient: "scheduling your interview.",
    subhead:
      "The worst-case scenario? You spend an hour and decide it is not a fit. The best-case scenario? You find a team and platform that match your goals.",
    disclaimer:
      "Free to attend. No obligation. Pick a time that works for you.",
  },
  footer: {
    logoInitials: "FR",
    tagline: "Fort Lauderdale recruiting",
    youtubeUrl: "#",
    instagramUrl: "#",
    copyright:
      "__BRAND__. All rights reserved. __COMPANY__ — update legal entity before launch.",
  },
};
