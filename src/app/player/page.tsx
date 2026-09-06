import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui";
import { PlayerMock } from "@/components/PlayerMock";
import { FeatureGrid, CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "SabioCast Player",
  description:
    "A customisable HTML5 video player with smooth playback, adaptive bitrate streaming, automatic failover and multilingual audio and caption menus.",
};

export default function PlayerPage() {
  return (
    <>
      <PageHero
        eyebrow="SabioCast Player"
        title="Elevate your viewing experience with a customisable HTML5 player"
        intro="Built with the latest technology for smooth playback and zero buffering. Highly customisable, cross-device compatible, and embeddable via code or the JavaScript API. Included in every plan."
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <PlayerMock />
          </div>
        </Container>
      </Section>

      <FeatureGrid
        eyebrow="Player features"
        title="One player, every scenario"
        tone="muted"
        features={[
          { title: "Customisation", body: "Exhaustive control over styling and behaviour — autoplay, loop, buffer size and sharing options." },
          { title: "Interactive elements", body: "Event-status switching, overlay messaging and countdown timers before the stream begins." },
          { title: "Adaptive bitrate streaming", body: "Real-time transcoding into multiple resolutions for the best quality on any connection." },
          { title: "Automatic failover", body: "Switches between main and backup servers across geographical locations, with no viewer action." },
          { title: "Access control", body: "Viewing profiles enable geo-blocking and IP or domain restrictions." },
          { title: "Ad integration", body: "Works with ad servers for both live and VoD streams." },
        ]}
      />

      <Section>
        <Container>
          <div className="rounded-2xl border border-ink-100 bg-ink-950 p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              Embed snippet
            </p>
            <pre className="mt-3 overflow-x-auto text-sm text-white/80">
              <code>{`<iframe
  src="https://play.sabiocast.com/embed/your-stream-id"
  allow="autoplay; fullscreen; picture-in-picture"
  allowfullscreen
  style="border:0;width:100%;aspect-ratio:16/9">
</iframe>`}</code>
            </pre>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
