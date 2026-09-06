import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeading, Button, ArrowIcon } from "@/components/ui";
import { CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Documentation Center",
  description:
    "Guides, tutorials and API references for streaming, captioning, translation and the SabioCast player.",
};

const guides = [
  { h: "Getting started", p: "Create your first live event, choose an ingest protocol, and go live in minutes." },
  { h: "Multilingual live captions", p: "Configure AI caption languages, vocabularies and the real-time correction room." },
  { h: "AI speech translations", p: "Add AI voice languages, pick gender and dialect, and manage synchronisation." },
  { h: "Remote simultaneous interpretation", p: "Set up Translate@Home, distribute interpreter links, and run relay and handover." },
  { h: "Simulive streaming", p: "Upload, process and schedule pre-recorded video as a real live stream." },
  { h: "Recording & VoD", p: "Download multilingual recordings and publish Video on-Demand with captions." },
];

export default function DocsPage() {
  return (
    <>
      <PageHero
        eyebrow="Documentation"
        title="Documentation Center"
        intro="Everything you need to build with SabioCast — step-by-step guides, tutorials and API references. Sign in to your account for the full, versioned documentation."
      >
        <Button href="/free-trial" size="lg">Get an account <ArrowIcon /></Button>
      </PageHero>

      <Section>
        <Container>
          <SectionHeading eyebrow="Guides" title="Start here" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((g, i) => (
              <div
                key={g.h}
                className="reveal rounded-2xl border border-ink-100 bg-white p-6"
                data-delay={(i % 3) * 60}
              >
                <h3 className="text-base font-bold text-ink-900">{g.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{g.p}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="player-api" tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Player API"
            title="Control the player from JavaScript"
            intro="The SabioCast player exposes a JavaScript API for playback control, language selection, event hooks and analytics. Load the script, grab the instance, and listen for events."
          />
          <div className="mt-8 rounded-2xl border border-ink-100 bg-ink-950 p-6 text-white">
            <pre className="overflow-x-auto text-sm text-white/80">
              <code>{`<script src="https://play.sabiocast.com/player.js"></script>
<script>
  const player = SabioCast.create("#player", { streamId: "your-stream-id" });
  player.on("ready", () => player.setAudioLanguage("es"));
  player.on("languagechange", (lang) => console.log("now playing", lang));
</script>`}</code>
            </pre>
          </div>
        </Container>
      </Section>

      <Section id="integrations">
        <Container>
          <SectionHeading
            eyebrow="Integrations"
            title="Works with your existing stack"
            intro="Broadcast from OBS, Wirecast, vMix, StreamYard, Restream and Lightstream. Ingest via RTMP or SRT. Simulcast to YouTube, Facebook, Twitch and X. Pull analytics and manage events through the REST API."
          />
          <div className="mt-8 flex flex-wrap gap-2.5">
            {["OBS Studio", "Wirecast", "vMix", "StreamYard", "Restream", "Lightstream", "Haivision Makito", "Intinor", "Zoom", "MS Teams", "WebEx", "YouTube", "Facebook", "Twitch", "X"].map((t) => (
              <span key={t} className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-700">
                {t}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
