export type Plan = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  href: string;
  featured?: boolean;
  includes: string[];
};

export const plans: Plan[] = [
  {
    name: "Single-Language",
    price: "€190",
    cadence: "/mo",
    blurb: "One language, everything you need to stream live and on-demand.",
    href: "/contact?intent=quote&plan=single-language",
    includes: [
      "1 language",
      "10 live processing hours",
      "10 VoD transcoding hours",
      "1 TB data traffic",
      "Optional AI captioning",
      "1 simultaneous stream",
    ],
  },
  {
    name: "Multilingual",
    price: "€390",
    cadence: "/mo",
    blurb: "Multiple audio languages and captions with human interpreters or subtitlers.",
    href: "/contact?intent=quote&plan=multilingual",
    includes: [
      "8 languages",
      "20 live processing hours",
      "20 VoD transcoding hours",
      "1 TB data traffic",
      "1 simultaneous stream",
    ],
  },
  {
    name: "AI Multilingual",
    price: "€690",
    cadence: "/mo",
    blurb: "Our flagship — AI captions and speech translations, online and on-site.",
    href: "/contact?intent=quote&plan=ai-multilingual",
    featured: true,
    includes: [
      "8 languages",
      "AI captioning & speech: 5 hours",
      "20 live & VoD processing hours",
      "1 TB data traffic",
      "1 simultaneous stream",
      "Online and on-site usage",
    ],
  },
  {
    name: "On-Site AI",
    price: "€490",
    cadence: "/mo",
    blurb: "Real-time transcription and translation for attendees in the room.",
    href: "/contact?intent=quote&plan=on-site-ai",
    includes: [
      "8 languages",
      "AI transcription & speech: 5 hours",
      "Auto-scrolling text display",
      "10 mobile links (scalable)",
      "Browser-based audio broadcast",
    ],
  },
  {
    name: "Single-Language Webinar",
    price: "€249",
    cadence: "/mo",
    blurb: "Hosted webinar pages with registration and interactive features.",
    href: "/contact?intent=quote&plan=sl-webinar",
    includes: [
      "Customisable registration (none, one-step, two-step)",
      "Interactive features (chat, survey, polls)",
      "Personalised analytics",
      "On-demand video publishing",
      "Custom CSS upload",
    ],
  },
  {
    name: "AI Multilingual Webinar",
    price: "€519",
    cadence: "/mo",
    blurb: "Multilingual hosted webinars with AI audio and captions.",
    href: "/contact?intent=quote&plan=ml-webinar",
    includes: [
      "8 languages (audio & captions)",
      "Customisable registration",
      "Interactive features",
      "Personalised analytics",
      "On-demand video publishing",
    ],
  },
];

export const annualPlan = {
  name: "Annual Plan",
  price: "Custom",
  blurb: "For organisations running events all year round.",
  includes: [
    "Top up resources any time",
    "Distribute resources across multiple events",
    "Overuse billed at prepaid rates",
    "Total plan discount",
    "Optional custom Slack channel",
  ],
};

export const pricingFaqs = [
  {
    q: "What happens if my resources run out?",
    a: "We charge the overuse cost when your plan ends. As a general rule we never stop your live stream, regardless of the amount of overuse.",
  },
  {
    q: "Do you refund unused data traffic?",
    a: "No. We recommend making a cautious estimate of your data traffic and paying overuse costs if necessary.",
  },
  {
    q: "Do resources expire?",
    a: "Yes, all resources expire at the end of your plan's period.",
  },
  {
    q: "Can I add resources during my plan?",
    a: "Only for an annual plan. Monthly plans settle overuse at the end of the period.",
  },
  {
    q: "How do I order?",
    a: "Contact us with your plan selection and resource needs and we'll send a quote. By default a monthly plan starts when we receive proof of payment, unless you ask for a specific start date.",
  },
  {
    q: "Is there a lock-in or automatic renewal?",
    a: "All plans have a start and end date. After the end date your account is automatically disabled unless you explicitly ask to renew.",
  },
  {
    q: "Are premium services available?",
    a: "Yes. Premium support and managed services can be added to any plan — contact us for details.",
  },
  {
    q: "Are there volume discounts?",
    a: "Yes. The more resources you add to your plan, the lower the price you receive.",
  },
];
