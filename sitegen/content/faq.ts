export type FaqItem = { q: string; a: string };
export type FaqCategory = { title: string; items: FaqItem[] };

export const faqCategories: FaqCategory[] = [
  {
    title: "Platform & delivery",
    items: [
      {
        q: "Do all live streams work on mobile?",
        a: "Yes. The SabioCast player works on every modern device and browser, showing captions and audio languages via dropdown menus on iOS and Android. We transcode server-side into multiple resolutions and the player automatically chooses the best one for the viewer's device and bandwidth.",
      },
      {
        q: "Do you have worldwide coverage? How many viewers can watch a live stream?",
        a: "We deliver through a global CDN, so viewers everywhere receive the stream from a nearby edge server. Viewership is almost unlimited; we ask for advance notice for audiences over 100,000 simultaneous viewers.",
      },
      {
        q: "What about China?",
        a: "Global CDNs provide geographically close servers (such as Hong Kong) that enable HD streaming to mainland viewers. Reception is generally good based on customer testing, though the Great Firewall means it can never be fully guaranteed.",
      },
      {
        q: "Do I need a special encoder to broadcast to SabioCast?",
        a: "No. Any encoder that supports RTMP or SRT works — OBS, Wirecast, in-browser studios such as StreamYard and Restream, and platforms such as vMix, Zoom, MS Teams and WebEx.",
      },
      {
        q: "By default, what is the latency of a live stream?",
        a: "Using the HLS protocol, typical latency is 18–30 seconds, potentially reaching about two minutes on some iOS devices. Speech-to-text captions add roughly one minute for accuracy and readability.",
      },
      {
        q: "Can live streams be simulcast?",
        a: "Yes. RTMP simulcasting is supported for all stream types. Multilingual broadcasts can simulcast with a language of choice.",
      },
      {
        q: "Is SabioCast secure and GDPR compliant?",
        a: "Data resides in separate ISO 27001-compliant data centres within the EU. Systems have 24/7 monitoring with automated threat alerts, and encryption is used for data in transit and at rest. We do not share data with third parties and are fully GDPR compliant.",
      },
    ],
  },
  {
    title: "Languages & accuracy",
    items: [
      {
        q: "How many languages are possible per live stream?",
        a: "Closed caption languages are unlimited. Audio languages are also unlimited with Remote Simultaneous Interpretation; multilingual broadcasts are limited by your encoder's capacity.",
      },
      {
        q: "What accuracy can I expect from AI captions and translations?",
        a: "99+% for speech-to-text in commonly used languages, 99.9+% for AI translation given an accurate source, and up to 100% with real-time human correction.",
      },
      {
        q: "Can I use SabioCast with my own interpreters or captioners?",
        a: "Yes. The platform is designed as self-service and needs no specialised training for interpreters and captioners.",
      },
      {
        q: "Can you provide interpreters or captioners for my event?",
        a: "Yes. Customised managed services are available, including event management, sourcing vetted professionals and monitoring the stream.",
      },
      {
        q: "Is simultaneous interpretation available in real time for on-site participants?",
        a: "Yes. Event participants can listen to real-time translations with no latency via a video or audio-only player, offered as an optional feature.",
      },
    ],
  },
  {
    title: "Recording, VoD & analytics",
    items: [
      {
        q: "Does SabioCast record all live streams with audio languages and captions?",
        a: "Yes. Cloud recordings are made and downloadable. Multilingual streams include all audio tracks in the MP4 file, and closed captions are downloadable separately as WebVTT files.",
      },
      {
        q: "Can I create an on-demand video with extra audio languages and closed captions?",
        a: "Yes. Convert the server-side recording to Video on-Demand, or upload a single-language video and add languages and captions afterwards, then embed the player.",
      },
      {
        q: "What analytics do I get?",
        a: "Real-time viewer counts and geography during the stream, plus detailed post-event insight into viewer behaviour, watch time and re-watching.",
      },
    ],
  },
  {
    title: "Plans & pricing",
    items: [
      {
        q: "How do plans work?",
        a: "Each plan contains a set amount of resources — data traffic, live and VoD processing hours, and optionally AI hours. If these don't suffice, overuse is charged when your plan ends. You can add resources up front to avoid overuse.",
      },
      {
        q: "Do resources expire?",
        a: "Yes. All resources expire at the end of your plan's period. Unused data traffic is not refunded, so make a cautious estimate.",
      },
      {
        q: "Can I add resources mid-plan?",
        a: "Only on an annual plan. Monthly plans are topped up by paying overuse at the end.",
      },
      {
        q: "Will my stream be stopped if I go over?",
        a: "No. As a general rule we never stop your live stream, regardless of the amount of overuse.",
      },
      {
        q: "Are there volume discounts?",
        a: "Yes. The more resources you add to your plan, the lower the unit price.",
      },
      {
        q: "What are 'AI hours'?",
        a: "AI hours are consumed when captions or audio are generated by speech-to-text, text-to-text translation or text-to-speech. Usage is counted per set of 8 AI languages per broadcast hour, including preview and paused time.",
      },
    ],
  },
];
