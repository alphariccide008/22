import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui";
import { FeatureGrid, CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Adaptive Bitrate Streaming",
  description:
    "Say goodbye to buffering. SabioCast transcodes every broadcast into multiple resolutions and delivers them over a global CDN with automatic quality switching.",
};

export default function AbrPage() {
  return (
    <>
      <PageHero
        eyebrow="Adaptive bitrate streaming"
        title="Say goodbye to buffering, hello to seamless streaming"
        intro="SabioCast automatically adjusts video quality in real time to ensure a seamless viewing experience for your audience, even on fluctuating network conditions."
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="How does it work?"
              title="The power of adaptive bitrate streaming"
              intro="Real-time transcoding converts your live broadcast into multiple resolutions — 1080p, 720p, 480p, 360p and 240p. The player analyses screen size, available bandwidth, memory, CPU and GPU, then switches dynamically between quality levels over the HLS protocol."
            />
            <div className="reveal space-y-3" data-delay={100}>
              {[
                ["1080p", 100],
                ["720p", 82],
                ["480p", 64],
                ["360p", 46],
                ["240p", 30],
              ].map(([res, w]) => (
                <div key={res as string} className="flex items-center gap-4">
                  <span className="w-14 text-sm font-semibold text-ink-500">{res}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-600 to-accent-500"
                      style={{ width: `${w}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <FeatureGrid
        eyebrow="Global CDN delivery"
        title="Delivered as close to viewers as possible"
        tone="muted"
        features={[
          { title: "Edge servers worldwide", body: "Streams are served from the region nearest each viewer, for low latency and high throughput." },
          { title: "Automatic transcoding", body: "Every broadcast is transcoded server-side into an adaptive ladder — you send one feed." },
          { title: "Redundancy built in", body: "Main and backup origins with automatic player failover keep the stream alive through encoder or network issues." },
          { title: "Any device", body: "The player adapts to the viewer's hardware and connection, from a phone on 3G to a 4K TV." },
        ]}
        columns={2}
      />

      <CtaSection />
    </>
  );
}
