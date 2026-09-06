import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeading, Button, ArrowIcon } from "@/components/ui";
import { FeatureGrid, LogoMarquee, CtaSection, StatBand } from "@/components/sections";

export const metadata: Metadata = {
  title: "Enterprise Platform",
  description:
    "All-in-one platform for live and on-demand video streaming with an embeddable multilingual player, adaptive bitrate delivery and full redundancy.",
};

const sections = [
  {
    h: "Best way to manage live streams",
    p: "SabioCast Enterprise is an all-in-one SaaS solution with a customisable HTML5 player and fast, reliable, scalable infrastructure. Embed the player in any site, stream in via RTMP or SRT, simulcast to third parties, control access by IP, domain and country, and get real-time analytics.",
  },
  {
    h: "Flawless live streaming in HD to global audiences",
    p: "We partner with a tier-one CDN for global delivery and automatically transcode your broadcast for adaptive bitrate streaming, so every viewer gets the best quality their connection allows.",
  },
  {
    h: "Support for SRT and RTMP broadcasts",
    p: "SRT is an open protocol with built-in authentication and encryption, promoted by the SRT Alliance — of which we are a member — and ideal for multilingual live streaming with multiple audio tracks.",
  },
  {
    h: "Fully redundant live streams",
    p: "Main and backup servers in different geographical locations, with automatic player failover. If an encoder or local network issue takes out the main feed, the player switches seamlessly to the backup.",
  },
  {
    h: "Simulive streaming without stress",
    p: "Schedule pre-recorded video as a live broadcast, with caption and audio language options, and guarantee video streams of the highest quality.",
  },
  {
    h: "Turnkey solution",
    p: "Player, transcoding, CDN, management console and analytics in one place, with multi-user access and role-based permissions — a single point of access for your organisation.",
  },
];

export default function EnterprisePage() {
  return (
    <>
      <PageHero
        eyebrow="Enterprise Platform"
        title="All-in-one platform for live and on-demand video"
        intro="Elevate your content, engage your audience and grow your brand with a great live streaming experience — transcoding, monetisation, security and content management, with an embedded player."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/free-trial" size="lg">Try now <ArrowIcon /></Button>
          <Button href="/pricing" size="lg" variant="light">See pricing</Button>
        </div>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {sections.map((s, i) => (
              <div
                key={s.h}
                className="reveal rounded-2xl border border-ink-100 bg-white p-7"
                data-delay={(i % 2) * 70}
              >
                <h2 className="text-lg font-bold text-ink-900">{s.h}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.p}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <LogoMarquee tone="ink" />

      <FeatureGrid
        eyebrow="Why choose SabioCast"
        title="Everything a live stream needs"
        tone="muted"
        features={[
          { title: "Extensive feature set", body: "Streaming, management, distribution, monetisation and analytics for live and on-demand video." },
          { title: "Branded multilingual player", body: "Responsive HTML5 player with styling options, poster images and overlay messages, on any browser and device." },
          { title: "Simulcasting", body: "Auto-simulcast to Facebook, YouTube, Twitch and X, with language selection for multilingual events." },
          { title: "Cloud recording", body: "Server-side recording downloadable after the stream. For multilingual events, all audio and captions are downloadable." },
          { title: "Limit stream accessibility", body: "Whitelist and blacklist countries, domains and IP addresses, with different settings per stream." },
          { title: "Detailed analytics", body: "Real-time viewer count and geography, plus post-event behavioural insight." },
        ]}
      />

      <StatBand
        stats={[
          { value: "RTMP + SRT", label: "ingest protocols supported" },
          { value: "5", label: "adaptive resolutions per stream" },
          { value: "100%", label: "player failover coverage" },
          { value: "REST + JS", label: "APIs to integrate" },
        ]}
      />

      <CtaSection />
    </>
  );
}
