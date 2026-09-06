import Link from "next/link";
import { Container, Section, SectionHeading, Button, ArrowIcon, CheckIcon } from "@/components/ui";
import { PlayerMock } from "@/components/PlayerMock";
import {
  LogoMarquee,
  FeatureGrid,
  StatBand,
  CtaSection,
  ServiceModels,
  SplitFeature,
} from "@/components/sections";
import {
  solutionCards,
  accuracySteps,
  trustReasons,
  platformBullets,
} from "@/content/home";

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-ink-950 pb-24 pt-14 text-white md:pb-32 md:pt-20">
        <div className="bg-grid absolute inset-0 opacity-[0.15]" />
        <div className="absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-brand-600/30 blur-[120px]" />
        <div className="absolute -right-40 top-40 h-[28rem] w-[28rem] rounded-full bg-accent-500/20 blur-[120px]" />
        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
            <div className="reveal in-view">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.7rem] font-semibold leading-tight text-white/80 backdrop-blur sm:text-xs">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                <span className="min-w-0">AI captions · AI speech translation · Remote interpretation</span>
              </span>
              <h1 className="mt-6 font-display text-[2rem] font-bold leading-[1.08] sm:text-5xl sm:leading-[1.05] md:text-6xl">
                Multilingual live streaming{" "}
                <span className="text-gradient">made effortless</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                SabioCast lets you deliver live streams with multiple audio
                languages and very accurate closed captions, using the latest AI
                technologies. Viewers anywhere in the world watch the stream and
                select their preferred language in our multilingual video player.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/free-trial" size="lg">
                  Try now <ArrowIcon />
                </Button>
                <Button href="/demos" size="lg" variant="light">
                  View more
                </Button>
              </div>
              <dl className="mt-12 grid max-w-[20rem] grid-cols-3 gap-4 sm:max-w-md sm:gap-6">
                {[
                  ["99+%", "caption accuracy"],
                  ["50+", "languages"],
                  ["2005", "streaming since"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="font-display text-2xl font-bold text-white">{v}</dt>
                    <dd className="text-xs text-white/50">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="reveal in-view animate-float lg:pl-6">
              <PlayerMock />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------- Solutions overview ---------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Solutions"
            title="Get a solution for any multilingual live stream"
            intro="Our platform and embeddable player are an all-in solution for multilingual live streaming to an unlimited number of worldwide viewers. Streams are delivered through a global CDN using adaptive bitrate streaming, so speed, reliability and scalability are guaranteed."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutionCards.map((s, i) => (
              <Link
                key={s.title}
                href={s.href}
                className="reveal group flex flex-col rounded-2xl border border-ink-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_50px_-24px_rgba(90,63,228,0.28)]"
                data-delay={i * 60}
              >
                <h3 className="text-lg font-bold text-ink-900 group-hover:text-brand-700">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                  {s.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Learn more <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <LogoMarquee />

      {/* ---------------- Value prop + player ---------------- */}
      <SplitFeature
        eyebrow="Effortless and affordable"
        title="Multilingual live streaming, tailored to your needs"
        body="SabioCast offers a solution for any kind of multilingual live stream, no matter the specifications. Leading AI innovations let you cut costs, while human intervention keeps you at the highest quality standards. Our embeddable, customisable player ensures viewers everywhere can watch in their own language."
        bullets={[
          "Use the headphone menu to select audio languages",
          "Use the CC menu for closed captions",
          "One embed snippet for any site or platform",
        ]}
        image={<PlayerMock />}
        cta={{ label: "Talk to us", href: "/contact" }}
        reverse
      />

      {/* ---------------- AI accuracy 4 steps ---------------- */}
      <Section tone="ink">
        <Container>
          <SectionHeading
            eyebrow="AI-powered accuracy"
            title="Experience the difference: superior AI interpretation & captions"
            intro="SabioCast's unique AI solution vastly improves the accuracy and quality of speech translations and closed captions during a live stream, compared with every other solution on the market. You can even attain 100% accuracy using our real-time correction interface in the cloud."
            tone="light"
          />
          <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {accuracySteps.map((s, i) => (
              <li
                key={s.title}
                className="reveal relative rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                data-delay={i * 70}
              >
                <span className="font-display text-sm font-bold text-white/30">
                  Step {i + 1}
                </span>
                <span className="mt-3 block rounded-full bg-accent-500/15 px-2.5 py-1 text-xs font-bold text-accent-400 w-fit">
                  {s.stat}
                </span>
                <h3 className="mt-4 text-base font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ---------------- Enhanced AI ---------------- */}
      <FeatureGrid
        eyebrow="Enhanced AI"
        title="Perfect subtitles & audio translations with a little human help"
        intro="Hiring human subtitlers and interpreters is expensive and makes live stream management complex. Enhanced AI keeps the quality while cutting cost and complexity — our AI provides captions and translations on par with human services."
        columns={2}
        features={[
          {
            title: "AI vocabularies ensure correct names and jargon",
            body:
              "SabioCast auto-generates AI vocabularies from texts you provide, guaranteeing correct rendition of names, brands, abbreviations and technical terms, with pre- and post-processing to use them optimally.",
          },
          {
            title: "AI vocabularies improve recognition and translation",
            body:
              "Vocabularies ensure correct spelling and capitalisation, help the AI recognise the sound of terms during speech-to-text, and help it interpret terms correctly when forming and translating sentences.",
          },
          {
            title: "Improve accuracy through human real-time correction",
            body:
              "An intuitive web interface lets users edit the result of AI speech-to-text in real time. Since it is the source for captions and audio translations, corrections improve every output. Anyone with an internet connection can do it.",
          },
          {
            title: "Multiple languages, single corrector",
            body:
              "Enhanced AI needs only one or two correctors regardless of the number of languages. A good correction of the transcription assures the quality of every caption and audio language.",
          },
        ]}
      />

      {/* ---------------- Spotlight ---------------- */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="In the spotlight"
            title="Subtitled simulcasts & on-site transcripts"
            intro="Beyond audio translations and closed captions, SabioCast offers simulcasting with AI-generated subtitles and on-site delivery of the translated transcription for event attendees, with no delay."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {[
              {
                sub: "Simulcast to YouTube with AI subtitles",
                title: "Send live streams with subtitles to social media",
                body:
                  "SabioCast supports simulcasting live streams with burned-in AI subtitles via RTMP and SRT. Send an accurate stream to any social channel or third-party platform, with audio and subtitles perfectly in sync. Stream to multiple endpoints at once, each in a different language.",
              },
              {
                sub: "Live AI transcription for event attendees",
                title: "Auto-scrolling transcripts on large screens and mobiles",
                body:
                  "Real-time AI transcription ensures attendees with hearing impairments or non-native speakers can follow along. SabioCast delivers AI text as an auto-scrolling transcript and AI speech translations, in real time, via an intuitive web app for end-users.",
              },
            ].map((c, i) => (
              <div
                key={c.title}
                className="reveal rounded-2xl border border-ink-100 bg-white p-8"
                data-delay={i * 80}
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
                  {c.sub}
                </p>
                <h3 className="mt-3 text-xl font-bold text-ink-900">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{c.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <ServiceModels />

      {/* ---------------- All-in-one platform ---------------- */}
      <SplitFeature
        eyebrow="Enterprise platform"
        title="All-in-one streaming platform"
        body="SabioCast provides an all-in-one enterprise platform for live and on-demand video streaming, management, distribution, monetisation and analytics. Fast, reliable and scalable, with a customisable HTML5 player that can be embedded in any site or platform."
        bullets={platformBullets}
        image={
          <div className="rounded-2xl border border-ink-100 bg-white p-2 shadow-[0_40px_100px_-40px_rgba(11,11,18,0.4)]">
            <div className="rounded-xl bg-ink-950 p-5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {["Viewers", "Countries", "Languages", "Bitrate", "Uptime", "Recordings"].map(
                  (k, i) => (
                    <div key={k} className="rounded-lg bg-white/5 p-3">
                      <p className="text-[0.65rem] uppercase tracking-wide text-white/40">
                        {k}
                      </p>
                      <p className="mt-1 font-display text-lg font-bold text-white">
                        {["18,204", "63", "8", "6.2M", "100%", "24"][i]}
                      </p>
                    </div>
                  ),
                )}
              </div>
              <div className="mt-3 h-24 rounded-lg bg-gradient-to-t from-brand-600/40 to-transparent" />
            </div>
          </div>
        }
      />

      {/* ---------------- Adaptive bitrate ---------------- */}
      <Section tone="ink">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Adaptive bitrate streaming"
              title="Flawless HD streaming to global audiences"
              intro="SabioCast starts where other remote interpreting solutions stop. Rather than a limited number of participants in a controlled environment, our live streams are open to an unlimited number of global viewers, delivered through a CDN with edge servers all over the world. We automatically transcode your broadcast to multiple resolutions for adaptive bitrate streaming, and support redundant setups with automatic player failover."
              tone="light"
            />
            <div className="reveal space-y-3" data-delay={100}>
              {["1080p", "720p", "480p", "360p", "240p"].map((res, i) => (
                <div key={res} className="flex items-center gap-4">
                  <span className="w-14 text-sm font-semibold text-white/60">{res}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                      style={{ width: `${100 - i * 16}%` }}
                    />
                  </div>
                </div>
              ))}
              <Button href="/adaptive-bitrate-streaming" variant="light" className="mt-4">
                Learn more <ArrowIcon />
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Why trust ---------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Why SabioCast"
            title="Why global organisations trust us for all types of events"
            intro="Don't hesitate to break down the language barriers and expand your reach. We have supported tens of thousands of events and are trusted by clients all over the world."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {trustReasons.map((r, i) => (
              <div
                key={r.title}
                className="reveal rounded-2xl border border-ink-100 bg-white p-6"
                data-delay={(i % 3) * 60}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <CheckIcon />
                </div>
                <h3 className="mt-4 text-base font-bold text-ink-900">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{r.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <StatBand
        stats={[
          { value: "99+%", label: "AI caption accuracy without human help" },
          { value: "Unlimited", label: "worldwide viewers per live stream" },
          { value: "50+", label: "audio and caption languages" },
          { value: "10,000s", label: "of events delivered since 2005" },
        ]}
      />

      <CtaSection />
    </>
  );
}
