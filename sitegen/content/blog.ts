export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "vote-sabiocast-streaming-media-innovation-awards",
    title: "Vote for SabioCast in the 2026 Streaming Media Innovation Awards!",
    excerpt:
      "It's award season once again, and Streaming Media Magazine — the go-to trade journal for the online video industry — has unveiled the nominees for their prestigious European Innovation Awards for 2026.",
    date: "2026-07-28",
    readingTime: "3 min",
    category: "Company",
    body: [
      "It's award season once again, and Streaming Media Magazine — the go-to trade journal for the online video industry — has unveiled the nominees for their prestigious Streaming Media European Innovation Awards for 2026.",
      "These awards let readers recognise the products and services that are pushing the industry forward. We're honoured that SabioCast has been nominated for its work on live AI subtitling and speech translation.",
      "If SabioCast has helped you break down language barriers at your events, we'd be grateful for your vote. Voting is open to everyone and takes less than a minute.",
    ],
  },
  {
    slug: "secure-reliable-transport-key-advantages",
    title: "Secure Reliable Transport (SRT): key advantages",
    excerpt:
      "The SRT protocol has gained significant traction in live streaming and real-time video delivery. Originally designed by Haivision, it addresses many challenges of streaming over unpredictable networks.",
    date: "2024-12-27",
    readingTime: "5 min",
    category: "Technology",
    body: [
      "The Secure Reliable Transport (SRT) protocol has gained significant traction in the world of live streaming and real-time video delivery. Originally designed by Haivision and now maintained as an open-source project, SRT addresses many challenges of video streaming, particularly over public networks.",
      "For multilingual streaming, SRT's headline advantage is the ability to carry multiple audio tracks on a single video broadcast — perfect for on-site interpreters working from booths. It also brings built-in encryption and authentication, and recovers gracefully from packet loss and jitter.",
      "SabioCast is a member of the SRT Alliance and accepts SRT ingest from OBS Studio, Haivision Makito, Intinor Direct Link and other professional encoders.",
    ],
  },
  {
    slug: "live-ai-transcription-for-event-attendees",
    title: "Live AI transcription and translation for event attendees",
    excerpt:
      "Real-time scrolling transcripts on large screens and mobile devices — a highly anticipated feature that brings live speech-to-text and translation to people in the room.",
    date: "2024-08-30",
    readingTime: "4 min",
    category: "Product",
    body: [
      "We're excited to introduce a highly anticipated feature: live AI transcription and translation for event attendees. This involves live AI speech-to-text conversion and translation delivered directly to the people in the room.",
      "SabioCast delivers AI-generated text as an auto-scrolling transcript on large screens and on attendees' phones, alongside AI speech translations — all in real time, with no perceptible delay.",
      "It's built for accessibility: attendees with hearing impairments and non-native speakers can follow every word, in their own language.",
    ],
  },
  {
    slug: "youtube-live-streaming-with-ai-subtitles",
    title: "YouTube live streaming with accurate AI subtitles",
    excerpt:
      "SabioCast supports simulcasting of live streams with AI-generated subtitles burned into the video, so you can send an accessible stream to YouTube and other platforms.",
    date: "2024-08-22",
    readingTime: "4 min",
    category: "How-to",
    body: [
      "How do you add accurate AI subtitles to a YouTube live stream? SabioCast supports simulcasting of live streams with AI-generated subtitles burned into the video stream.",
      "By using this feature you can send a live stream to YouTube — or any other social platform — with subtitles that stay perfectly in sync with the audio. You can also stream to multiple endpoints at once, each with subtitles in a different language.",
      "Setup takes a few minutes: add your RTMP or SRT destination, choose the subtitle language, and start broadcasting.",
    ],
  },
  {
    slug: "getting-started-with-ai-for-simultaneous-interpretation",
    title: "Getting started with AI for simultaneous interpretation",
    excerpt:
      "SabioCast lets you deliver live streams with multiple audio languages and closed captions using AI, human interpreters, or a combination of both.",
    date: "2024-06-20",
    readingTime: "6 min",
    category: "How-to",
    body: [
      "SabioCast lets you deliver live streams with multiple audio languages and closed captions. You can use AI, human interpreters and subtitlers, or a combination of both.",
      "Live AI speech translation recognises the words spoken in your stream and generates natural-sounding AI voices in real time. With optional real-time correction you can reach near-perfect accuracy while keeping costs and logistics far below a full interpreter team.",
      "This post walks through configuring your first AI-translated event, from choosing languages to embedding the multilingual player.",
    ],
  },
  {
    slug: "never-miss-a-word-perfect-ai-subtitles",
    title: "Never miss a word: perfect AI subtitles for high-profile live streams",
    excerpt:
      "Traditional subtitles offer a lifeline at major events, but what if they could be near-perfect and available in every language, automatically?",
    date: "2024-03-04",
    readingTime: "5 min",
    category: "Product",
    body: [
      "Imagine attending a groundbreaking keynote, a live panel or a documentary premiere at a major summit — but the language barrier stands in your way.",
      "SabioCast's contextual AI raises live caption accuracy to 99+% without human intervention, and 100% with real-time correction. Captions are auto-translated into any number of languages and stay in sync with the video.",
      "For high-profile events, that means every viewer — in every language — can follow along with confidence.",
    ],
  },
  {
    slug: "future-of-webinars-customise-and-captivate",
    title: "The future of webinars is here: customise and captivate with ease",
    excerpt:
      "The latest version of our webinar platform is designed to elevate your virtual events — sales presentations, training, town halls and more.",
    date: "2023-12-13",
    readingTime: "4 min",
    category: "Product",
    body: [
      "We're thrilled to unveil the latest version of our webinar platform, designed to revolutionise your online gatherings.",
      "Whether you're hosting a sales presentation, an educational session or a company town hall, you can fully brand the registration and viewing pages, add Q&A, chat, polls and surveys, and choose the registration flow that fits your goals.",
      "And of course every webinar can be multilingual, with AI or human audio translations and captions.",
    ],
  },
  {
    slug: "simplified-pricing-plans-enhanced-value",
    title: "Simplified pricing plans with enhanced value",
    excerpt:
      "We've listened to our partners and revamped our pricing plans — clearer tiers, no hidden costs, and better value across the board.",
    date: "2023-11-18",
    readingTime: "3 min",
    category: "Company",
    body: [
      "We've listened to you, our valued partners, and we're excited to unveil our revamped pricing plans designed with your needs in mind.",
      "Each plan now contains a clear allocation of data traffic, processing hours and — where relevant — AI hours. If you need more, you can add resources up front or simply pay overuse at the end of the plan.",
      "No confusing tiers, no hidden costs. Just the resources you need to run great multilingual events.",
    ],
  },
  {
    slug: "ai-captioning-live-streams-multilingual-speakers",
    title: "AI captioning of live streams with multilingual speakers",
    excerpt:
      "Accurate closed captions are possible even when speakers switch languages mid-sentence — here's how SabioCast handles it.",
    date: "2023-10-30",
    readingTime: "5 min",
    category: "Technology",
    body: [
      "SabioCast has won multiple streaming innovation awards for live AI subtitling, achieving 99+% accuracy without human intervention and 100% with real-time correction.",
      "But accurate captions are also possible when multiple languages are spoken in the same stream. Our ASR detects the language of each segment, captions it natively, and then translates everything into the caption languages you configured.",
      "This is invaluable for international panels, multilingual boards and cross-border town halls.",
    ],
  },
  {
    slug: "broadcast-up-to-32-languages-makito-x4",
    title: "Broadcast up to 32 languages using the Makito X4 series (SRT)",
    excerpt:
      "The Haivision Makito X4 is a powerful encoder that can carry many audio tracks — pair it with SabioCast for large multilingual broadcasts.",
    date: "2023-05-30",
    readingTime: "4 min",
    category: "How-to",
    body: [
      "The Makito X4 is a powerful video encoder developed by Haivision, built for high-quality streaming at live events.",
      "One of its notable features is the ability to broadcast multiple audio tracks — 16 mono or 8 stereo languages out of the box, and up to 32 with the right firmware.",
      "Feed that SRT stream into SabioCast and every language becomes a selectable audio track in the multilingual player.",
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
