export const site = {
  name: "SabioCast",
  domain: "sabiocast.com",
  tagline: "Multilingual live streaming made effortless",
  address: {
    line1: "Jules Bilmeyerstraat 32",
    line2: "2600 Berchem",
    country: "Belgium",
  },
  email: "hello@sabiocast.com",
  social: {
    linkedin: "https://www.linkedin.com/company/sabiocast",
    facebook: "https://www.facebook.com/sabiocast",
    x: "https://x.com/sabiocast",
  },
  languages: ["English", "Nederlands", "Français", "Español", "Deutsch", "Italiano"],
  /**
   * YouTube / Vimeo id for the public demo reel. Leave empty to keep demos
   * gated behind a trial account (as the reference site does). Set it once a
   * real SabioCast demo video is available.
   */
  demoVideoId: "",
};

export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = {
  label: string;
  href?: string;
  columns?: { title?: string; links: NavLink[] }[];
};

export const primaryNav: NavGroup[] = [
  {
    label: "Solutions",
    columns: [
      {
        title: "Streaming",
        links: [
          {
            label: "Live & VoD Streaming",
            href: "/solutions/live-vod-streaming",
            description: "All-in-one platform for live and on-demand video.",
          },
          {
            label: "Multilingual Simulive Streaming",
            href: "/solutions/multilingual-simulive-streaming",
            description: "Pre-recorded video streamed as a real live event.",
          },
        ],
      },
      {
        title: "Languages",
        links: [
          {
            label: "Live AI Multilingual Subtitles",
            href: "/solutions/ai-multilingual-subtitles",
            description: "99+% accurate AI closed captions, auto-translated.",
          },
          {
            label: "Live AI Speech Translations",
            href: "/solutions/ai-speech-translations",
            description: "Natural AI voices in any number of languages.",
          },
          {
            label: "Remote Simultaneous Interpretation",
            href: "/solutions/remote-simultaneous-interpretation",
            description: "Award-winning Translate@Home for interpreters anywhere.",
          },
          {
            label: "Live Human Subtitling",
            href: "/solutions/live-human-subtitling",
            description: "Re-speaking, stenotype and scripted-event subtitling.",
          },
          {
            label: "Multilingual Broadcasts",
            href: "/solutions/multilingual-broadcasts",
            description: "RTMP / SRT broadcasts with multiple audio tracks.",
          },
        ],
      },
    ],
  },
  {
    label: "Platforms",
    columns: [
      {
        links: [
          {
            label: "Enterprise Platform",
            href: "/platforms/enterprise",
            description: "Embed our multilingual player in any site or platform.",
          },
          {
            label: "Webinar Platform",
            href: "/platforms/webinar",
            description: "Hosted pages, registration and interactive features.",
          },
          {
            label: "Learning Platform",
            href: "/platforms/learning",
            description: "Multilingual courses and on-demand training.",
          },
        ],
      },
    ],
  },
  {
    label: "Demos",
    columns: [
      {
        links: [
          { label: "Multilingual Live Streaming", href: "/demos#multilingual" },
          { label: "Live AI Speech Translations & Subtitles", href: "/demos#ai-speech" },
          { label: "Live AI Captions Accuracy Comparison", href: "/demos#accuracy" },
          { label: "Live AI for Multilingual Floor", href: "/demos#floor" },
        ],
      },
    ],
  },
  { label: "News", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "More",
    columns: [
      {
        links: [
          { label: "Documentation", href: "/docs" },
          { label: "FAQ", href: "/faq" },
          { label: "Jobs", href: "/jobs" },
          { label: "Contact", href: "/contact" },
          { label: "About", href: "/about" },
        ],
      },
    ],
  },
];

export const footerNav = [
  {
    title: "Resources",
    links: [
      { label: "Multilingual Live Demo", href: "/demos" },
      { label: "Documentation Center", href: "/docs" },
      { label: "SabioCast Player", href: "/player" },
      { label: "Player API", href: "/docs#player-api" },
      { label: "Integrations", href: "/docs#integrations" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "News", href: "/blog" },
      { label: "Premium Support", href: "/premium-support" },
      { label: "Managed Service", href: "/managed-service" },
      { label: "GDPR Compliance", href: "/legal/gdpr" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Request a trial account", href: "/free-trial" },
      { label: "Get a quote", href: "/contact?intent=quote" },
      { label: "Estimate data traffic", href: "/pricing#calculator" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Data Processing Agreement", href: "/legal/dpa" },
    ],
  },
];
