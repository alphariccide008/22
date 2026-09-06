export type Feature = { title: string; body: string; stat?: string };
export type Step = { title: string; body: string };
export type Faq = { q: string; a: string };

export type Solution = {
  slug: string;
  eyebrow: string;
  navLabel: string;
  heroHeading: string;
  heroBody: string;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  intro: { heading: string; body: string };
  features: Feature[];
  steps?: { heading: string; subheading?: string; body?: string; items: Step[] };
  faqs: Faq[];
  cta?: { heading: string; body: string };
};

export const solutions: Solution[] = [
  {
    slug: "ai-multilingual-subtitles",
    eyebrow: "Live AI Multilingual Subtitles",
    navLabel: "Live AI Multilingual Subtitles",
    heroHeading: "Live Multilingual AI Subtitles",
    heroBody:
      "Add highly accurate multilingual subtitles to any live broadcast through the latest AI technology. Results are available on every device and platform, and viewers pick their language in the SabioCast player.",
    heroImage: "/images/ai-subtitles.jpg",
    metaTitle: "Live AI Multilingual Subtitles",
    metaDescription:
      "99+% accurate AI closed captions for live streams, auto-translated into any number of languages, with optional real-time human correction.",
    intro: {
      heading: "Revolutionising live multilingual subtitles with AI",
      body:
        "SabioCast dramatically improves the accuracy of live captions compared with other captioning solutions. For the first time you can simply rely on AI to add 99+% accurate multilingual captions to your live stream. 100% accurate captions are achievable with minimal effort, using our real-time correction interface in the cloud.",
    },
    features: [
      {
        title: "AI converts the live stream audio to lines of text",
        stat: "99+% accurate",
        body:
          "Our leading Automatic Speech Recognition (ASR) technology generates 99+% accurate captions. It supports any language, including streams where multiple languages are spoken.",
      },
      {
        title: "Enhance captions with real-time editing and vocabularies",
        stat: "100% accurate",
        body:
          "Users can optionally edit the AI-generated captions in real time, before they are translated and streamed. Custom vocabularies improve recognition and accuracy of specific terms.",
      },
      {
        title: "AI translates the captions into any number of languages",
        stat: "99.9+% accurate",
        body:
          "Top-tier AI language models let you add closed captions in multiple languages cost-effectively. With an accurate source, expect top-notch translation quality.",
      },
      {
        title: "Perfect synchronisation of captions and video",
        body:
          "Captions are aligned again with the spoken words so they appear at the right time and stay on screen long enough for viewers to follow the narrative.",
      },
      {
        title: "Contextual AI technology",
        body:
          "By slightly increasing HLS latency, SabioCast sends more context to the ASR and translation engines. This results in significantly greater accuracy for automatically generated and translated captions.",
      },
      {
        title: "Best-in-class language models",
        body:
          "We benchmark different AI solutions so SabioCast can automatically select the best engine on the market when a live stream is configured.",
      },
    ],
    steps: {
      heading: "How to do real-time editing",
      subheading: "Web interface to edit incoming captions and update AI vocabularies",
      body:
        "SabioCast provides an intuitive web interface that lets you read and modify the AI-generated captions in real time. It is designed for both first-time users and experienced editors, using a normal keyboard and mouse. Users can make corrections without any training, move text to other lines, or temporarily stop captions from appearing. Due to the high quality of our language models, only a limited number of corrections is needed.",
      items: [
        {
          title: "Superior accuracy through real-time correction",
          body:
            "It is significantly easier for a person to correct minor errors in high-quality subtitles than to create them from scratch.",
        },
        {
          title: "Cost-effective, no matter how many languages",
          body:
            "Enhanced AI requires only one or two correctors regardless of the number of languages, because the corrected captions are the source for every translated language.",
        },
        {
          title: "Smart AI vocabularies",
          body:
            "Vocabularies guarantee a correct rendition of names, brands, abbreviations and technical jargon, and relieve the workload of the real-time corrector.",
        },
      ],
    },
    faqs: [
      {
        q: "What is the accuracy of AI closed captions?",
        a: "Speech-to-text is 99+% accurate for commonly used languages like English, Spanish, French, German, Italian, Portuguese, Dutch and Japanese. For less common languages accuracy is somewhat lower. Speaking speed and dialect only reduce accuracy in extreme cases, and accuracy improves further with human correction.",
      },
      {
        q: "How many closed caption languages are possible?",
        a: "Unlimited. Our default AI multilingual plan includes 8 languages, but you can expand it to any number you want.",
      },
      {
        q: "Can SabioCast generate subtitles for a stream in which multiple languages are spoken?",
        a: "Yes. The ASR engine detects language changes and captions each segment in the language spoken, then translates everything into the caption languages you configured.",
      },
      {
        q: "Do live streams with closed captions have a delay?",
        a: "AI-powered captions add a delay of about one minute, slightly higher than normal HLS latency. This is necessary to improve accuracy and readability and to allow near real-time correction. Captions are always in sync with the video and audio.",
      },
      {
        q: "Are the live captions recorded? Can they be downloaded afterwards?",
        a: "Yes. All live captions are recorded in the cloud and can be downloaded as WebVTT files, or published as a Video on-Demand with captions hosted by SabioCast.",
      },
      {
        q: "What are 'AI hours' and how are they calculated?",
        a: "AI hours are used when captions or audio translations are generated by speech-to-text, text-to-text translation, or text-to-speech. Usage is counted per set of 8 AI languages per hour of broadcast, including time in 'preview' or 'paused' status.",
      },
    ],
  },
  {
    slug: "ai-speech-translations",
    eyebrow: "Live AI Speech Translations",
    navLabel: "Live AI Speech Translations",
    heroHeading: "Live AI Speech Translations",
    heroBody:
      "SabioCast uses advanced AI to add real-time speech translations to worldwide live broadcasts. Our multilingual player lets audiences pick their language and hear natural-sounding AI voices instantly.",
    heroImage: "/images/ai-speech.jpg",
    metaTitle: "Live AI Speech Translations",
    metaDescription:
      "Add any number of AI audio translations to a live stream using natural AI voices, with real-time correction for near-perfect accuracy.",
    intro: {
      heading: "Unlock the power of live AI speech translations",
      body:
        "Also known as live audio dubbing. SabioCast recognises the words spoken in your live stream and provides real-time translations using natural-sounding AI voices — 99+% accurate, in 50+ languages. A real-time correction interface is available for near-perfect accuracy, letting you replace human interpreters for all or certain languages and radically reduce costs.",
    },
    features: [
      {
        title: "Automatic speech recognition & translation",
        body:
          "Audio is converted to your target languages instantaneously and stays synchronised with the original broadcast.",
      },
      {
        title: "Voice customisation",
        body:
          "Select speaker gender, and for many languages choose a regional accent — British, American, Australian or Indian English, for example.",
      },
      {
        title: "User-friendly setup",
        body:
          "Choose your audio languages, embed our player on your site or platform, and start broadcasting.",
      },
      {
        title: "Advanced language models",
        body:
          "SabioCast benchmarks competing AI engines and automatically selects the optimal technology for each stream.",
      },
      {
        title: "Market-leading accuracy",
        body:
          "We leverage HTTP Live Streaming latency to provide additional context to the speech-recognition engines, sharply improving results.",
      },
      {
        title: "Human-enhanced AI",
        body:
          "Smart vocabularies and a live editing interface let a single corrector fix terms and handle specialised language across every output language.",
      },
    ],
    faqs: [
      {
        q: "What is the accuracy of the speech-to-text?",
        a: "99+% accurate for commonly used languages. Factors like speech pace and dialect only minimally impact results in typical scenarios.",
      },
      {
        q: "How many languages are possible?",
        a: "Unlimited in theory; practical limits depend on your plan. The default AI multilingual plan covers 8 languages and can be expanded.",
      },
      {
        q: "How good are the AI voices?",
        a: "Voices are clear and sound natural, almost human. Sentence flow and intonation are generally excellent.",
      },
      {
        q: "Can I combine audio translations and captions?",
        a: "Yes. Audio translations and closed captions can be delivered in the same live stream, and viewers choose both in the player.",
      },
      {
        q: "Is there a delay on the stream?",
        a: "Approximately 120 seconds. Translations remain perfectly synchronised with the video.",
      },
      {
        q: "Are translations recorded?",
        a: "Yes. All translations are recorded and downloadable as a single MP4 or as separate AAC files per language.",
      },
      {
        q: "What does it cost?",
        a: "AI speech translation is billed at an hourly rate covering up to 8 languages (floor audio + 7 AI translations + 8 caption languages). See the pricing page for current plans.",
      },
    ],
  },
  {
    slug: "remote-simultaneous-interpretation",
    eyebrow: "Remote Simultaneous Interpretation",
    navLabel: "Remote Simultaneous Interpretation",
    heroHeading: "Remote Simultaneous Interpretation",
    heroBody:
      "Add any number of audio translations to a live stream. Interpreters can be anywhere in the world — they watch the live stream and translate it in real time via their browser. The result is a multilingual live stream available globally on every device and platform.",
    heroImage: "/images/remote-interpretation.jpg",
    metaTitle: "Remote Simultaneous Interpretation",
    metaDescription:
      "Award-winning Translate@Home RSI. Interpreters work from anywhere, with relay, handover and language-switching tools built in.",
    intro: {
      heading: "Why organisations love Translate@Home",
      body:
        "Translate@Home is our award-winning RSI solution, designed together with interpreters for ease of use. The only requirement for an interpreter is a solid internet connection, a computer and a headset. Interpreter relay, handover and other collaboration tools are available.",
    },
    features: [
      {
        title: "Fast deployment",
        body:
          "Set up in minutes through the SabioCast platform: copy your broadcast link, select the languages, and distribute secure interpreter links.",
      },
      {
        title: "Low cost",
        body:
          "No interpreter travel and no expensive on-site equipment such as booths — only an internet connection and a headset are needed.",
      },
      {
        title: "Unlimited languages",
        body:
          "Support simultaneous translation into any number of languages, with relay functionality so interpreters can pivot from a colleague.",
      },
      {
        title: "Ease of use",
        body:
          "SabioCast doesn't require any advanced knowledge or previous experience with the platform. A short pre-event test confirms connection and audio.",
      },
      {
        title: "Multilingual player",
        body:
          "Embed the multilingual player anywhere with a single snippet. Viewers pick their audio and caption language.",
      },
      {
        title: "Broadcast from anywhere",
        body:
          "Compatible with OBS Studio, Wirecast, vMix, StreamYard and meeting platforms such as Zoom, Teams and WebEx.",
      },
    ],
    steps: {
      heading: "See how it works",
      subheading: "Easy to use for any interpreter",
      body:
        "The interface is intuitive and requires no training. A brief pre-event test is recommended to verify connection and audio. Advanced features include handover procedures, dynamic relay and language switching.",
      items: [
        { title: "Watch the floor", body: "Interpreters watch the live stream in their browser in real time, with no perceptible latency." },
        { title: "Add the translation", body: "They speak the translation into their headset; SabioCast adds it as an extra audio language on the stream." },
        { title: "Relay & handover", body: "Colleagues can relay from another booth or hand over mid-session without interrupting the audience." },
      ],
    },
    faqs: [
      {
        q: "What do interpreters need?",
        a: "A stable internet connection, a computer with a modern browser, and a quality headset. No installation is required.",
      },
      {
        q: "How many languages can I add?",
        a: "Unlimited. Each language is delivered as a separate selectable audio track in the player.",
      },
      {
        q: "Can participants hear the interpretation in real time?",
        a: "Yes. Event participants can listen to real-time simultaneous translation without latency via a video or audio-only player, offered as an optional feature.",
      },
      {
        q: "Can I use my own interpreters?",
        a: "Yes. SabioCast is a self-service SaaS platform. You can also source vetted interpreters from us as a managed service.",
      },
    ],
  },
  {
    slug: "live-human-subtitling",
    eyebrow: "Live Human Subtitling",
    navLabel: "Live Human Subtitling",
    heroHeading: "Live Human Subtitling",
    heroBody:
      "Deliver closed captions in multiple languages through live human subtitling — remote human transcription combined with real-time correction for precise, timely captions on every device and platform.",
    heroImage: "/images/human-subtitling.jpg",
    metaTitle: "Live Human Subtitling",
    metaDescription:
      "The leading solution for remote subtitling — re-speaking software, stenotype keyboards and scripted events, with optional real-time correction.",
    intro: {
      heading: "Make your stream more accessible with live human subtitles",
      body:
        "SabioCast is the leading solution for remote subtitling, with support for re-speaking software, stenotype keyboards and scripted events. Optional real-time correction enhances quality. Human subtitles can be supplemented with automatic conversion to AI speech translations and multilingual AI captions.",
    },
    features: [
      {
        title: "Stenotyping & re-speaking",
        body:
          "Integrates with re-speaking software and stenotype keyboards. Professional subtitlers can begin immediately, or you can hire subtitlers and correctors through SabioCast.",
      },
      {
        title: "Scripted events",
        body:
          "Operators pre-write captions for largely predetermined content, with real-time flexibility for speaker improvisation.",
      },
      {
        title: "Real-time correction",
        body:
          "A two-person workflow lets one subtitler correct another's work instantly, before it is displayed. Single-operator correction is also available.",
      },
      {
        title: "Full language control",
        body:
          "Human subtitlers control each language's text per caption — useful where AI translations cannot be edited line by line.",
      },
      {
        title: "Low-latency friendly",
        body:
          "Human subtitling keeps the standard 18-second HLS delay; enabling correction extends it to about one minute.",
      },
      {
        title: "Formatting compliance",
        body:
          "Human operators handle specific accessibility and regulatory formatting rules that strict event specifications may require.",
      },
    ],
    faqs: [
      {
        q: "How accurate is live human subtitling?",
        a: "100% accurate via re-speaking or shorthand with a corrector reviewing the output.",
      },
      {
        q: "How many languages are possible?",
        a: "Unlimited, budget permitting. Human captions can also seed affordable AI translations for additional languages.",
      },
      {
        q: "Can SabioCast provide captioners?",
        a: "Yes. We partner with leading language service providers to source professional real-time correctors and captioners for most languages and subjects.",
      },
      {
        q: "What is the delay?",
        a: "The standard HLS delay is about 18 seconds. With real-time correction enabled it is about one minute. Captions are always synchronised with the stream.",
      },
      {
        q: "Are captions recorded?",
        a: "Yes. Captions are recorded and downloadable as WebVTT files after the event.",
      },
    ],
  },
  {
    slug: "multilingual-broadcasts",
    eyebrow: "Multilingual Broadcasts",
    navLabel: "Multilingual Broadcasts",
    heroHeading: "Multilingual Broadcasts",
    heroBody:
      "SabioCast accepts RTMP or SRT broadcasts with multiple audio tracks and channels and turns them into multilingual live streams — ideal for on-site interpreters working from interpreting booths.",
    heroImage: "/images/multilingual-broadcasts.jpg",
    metaTitle: "Multilingual Broadcasts",
    metaDescription:
      "Turn RTMP/SRT broadcasts with multiple audio tracks into multilingual live streams with on-site interpreters in booths.",
    intro: {
      heading: "Turn local interpretation into a multilingual livestream",
      body:
        "Interpreter audio streams are integrated with the video; language capacity depends on the encoder type. SabioCast delivers the result through a global CDN with adaptive streaming, and the multilingual player lets viewers switch languages.",
    },
    features: [
      {
        title: "Controlled setup with interpreters on site",
        body: "Complete production control when interpreters are physically present.",
      },
      {
        title: "Live stream reliability",
        body: "No dependency on interpreters' remote connections or equipment.",
      },
      {
        title: "Perfect audio quality",
        body:
          "Interpreting booths with dynamic audio mixing and background-volume control produce broadcast-grade sound.",
      },
      {
        title: "Translated languages in stereo",
        body:
          "SabioCast can broadcast interpreter languages in stereo or mono; with the right equipment you get multi-language stereo output.",
      },
      {
        title: "SRT and RTMP support",
        body:
          "Secure Reliable Transport is an open protocol with built-in authentication and encryption, and lets you attach multiple audio tracks to a single video broadcast.",
      },
      {
        title: "Closed captions integration",
        body:
          "Add multilingual AI or human captions on top of the broadcast so viewers select both an audio and a caption language.",
      },
    ],
    steps: {
      heading: "Encoders for multilingual broadcasts",
      subheading: "Language capacity by encoder",
      items: [
        { title: "OBS Studio (SRT)", body: "12 mono / 6 stereo languages." },
        { title: "OBS Studio (RTMP)", body: "7 languages." },
        { title: "vMix", body: "6 languages." },
        { title: "Haivision Makito X4", body: "16 mono / 8 stereo, up to 32 with firmware." },
        { title: "Intinor Direct Link", body: "16 mono / 8 stereo, 32 with a dual-encoder setup." },
        { title: "Any encoder (stereo)", body: "2 languages minimum." },
      ],
    },
    faqs: [
      {
        q: "Which protocol should I use?",
        a: "SRT is recommended for multilingual broadcasts because it carries multiple audio tracks reliably and securely. RTMP is supported with OBS for up to 7 languages.",
      },
      {
        q: "Can I combine on-site and remote interpreters?",
        a: "Yes. You can mix a multilingual broadcast with remote interpreters via Translate@Home for additional languages.",
      },
      {
        q: "Is the multilingual stream recorded?",
        a: "Yes. The cloud recording is a single MP4 containing every audio language; single-language exports are available.",
      },
    ],
  },
  {
    slug: "multilingual-simulive-streaming",
    eyebrow: "Multilingual Simulive Streaming",
    navLabel: "Multilingual Simulive Streaming",
    heroHeading: "Multilingual Simulive Streaming",
    heroBody:
      "Turn pre-recorded videos into live streams with any number of audio languages and closed captions. The stream is delivered like any other live stream — your viewers have no way of telling the difference.",
    heroImage: "/images/simulive.jpg",
    metaTitle: "Multilingual Simulive Streaming",
    metaDescription:
      "Stream pre-recorded video as a real live event with multiple audio languages and captions, prepared in advance for the highest quality.",
    intro: {
      heading: "A real live stream, prepared in advance",
      body:
        "Simulive streaming broadcasts a pre-recorded video as a scheduled live event. Because everything is prepared ahead of time, translation and caption quality is guaranteed and video quality is the best possible.",
    },
    features: [
      {
        title: "Best video quality",
        body:
          "No bandwidth constraints or real-time transcoding limits — advanced pre-processing produces pristine video.",
      },
      {
        title: "Ease of use",
        body:
          "Upload the file and configure a schedule. No complex production workflow on the day.",
      },
      {
        title: "Cost efficiency",
        body:
          "Superior compression cuts data traffic by roughly 50%, and you don't need broadcasting staff.",
      },
      {
        title: "Reliability",
        body:
          "Redundant broadcast infrastructure with automatic player failover prevents technical failures.",
      },
      {
        title: "Translation excellence",
        body:
          "Audio translations and subtitles are prepared in advance, guaranteeing superior quality.",
      },
      {
        title: "Flexible complexity",
        body:
          "Run unlimited simultaneous or overlapping simulive streams without operational stress.",
      },
    ],
    faqs: [
      {
        q: "How far in advance do I need to upload?",
        a: "Transcoding takes roughly the duration of the source video — a one-hour video needs about one hour of processing time before it goes live.",
      },
      {
        q: "Can viewers tell it isn't live?",
        a: "No. The stream is delivered exactly like a live stream, with the same player, DVR and language selection.",
      },
      {
        q: "Can I add AI captions and voices to a simulive stream?",
        a: "Yes. After upload and processing you can generate AI closed captions and lifelike synthetic voice dubbing in any number of languages.",
      },
    ],
  },
  {
    slug: "live-vod-streaming",
    eyebrow: "Live & VoD Streaming",
    navLabel: "Live & VoD Streaming",
    heroHeading: "Live & VoD Streaming",
    heroBody:
      "An all-in-one platform for live and on-demand video streaming, management, distribution, monetisation and analytics — with a customisable HTML5 player you can embed anywhere.",
    heroImage: "/images/live-vod.jpg",
    metaTitle: "Live & VoD Streaming",
    metaDescription:
      "All-in-one live and on-demand video streaming with adaptive bitrate delivery over a global CDN and an embeddable multilingual player.",
    intro: {
      heading: "Fast, reliable and scalable video streaming",
      body:
        "SabioCast delivers live streams through a global CDN using adaptive bitrate streaming, so speed, reliability and scalability are guaranteed. The customisable HTML5 player can be embedded in any site or platform and provides an optimal experience on every device.",
    },
    features: [
      { title: "Embed anywhere", body: "Drop the multilingual live player into any site or platform with one snippet." },
      { title: "Simulcast", body: "Send your stream to YouTube, Facebook and other third-party platforms simultaneously." },
      { title: "Access control", body: "Limit stream accessibility based on IP address, domain and country." },
      { title: "Analytics", body: "Get detailed real-time and post-event analytics for live and Video on-Demand." },
      { title: "Cloud recording", body: "Download multilingual cloud recordings and publish them as VoD." },
      { title: "APIs", body: "Use our REST APIs and player JS API to customise or integrate SabioCast into your stack." },
    ],
    faqs: [
      {
        q: "How many viewers can watch a live stream?",
        a: "Viewership is almost unlimited. We ask for advance notice for audiences over 100,000 simultaneous viewers.",
      },
      {
        q: "What is the default latency?",
        a: "With the HLS protocol, typical latency is 18–30 seconds, and can reach about two minutes on some iOS devices.",
      },
      {
        q: "Can I convert a live stream to Video on-Demand?",
        a: "Yes. The cloud recording converts to VoD in a click, and you copy the embed code for the VoD player with captions.",
      },
    ],
  },
];

export const solutionBySlug = (slug: string) =>
  solutions.find((s) => s.slug === slug);
