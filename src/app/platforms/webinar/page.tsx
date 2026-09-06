import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeading, Button, ArrowIcon } from "@/components/ui";
import { FeatureGrid, CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Webinar Platform",
  description:
    "Create engaging, interactive webinars, virtual events and hybrid gatherings for participants around the world — hosted, branded and multilingual.",
};

const blocks = [
  {
    h: "Customisable, multi-purpose webinars",
    p: "Full front-end branding — logos, banners, colours, custom CSS. Participant interaction with Q&A, chat and surveys. Third-party integrations via iframes. Flexible registration: one-step for marketing, or two-step with approval.",
  },
  {
    h: "Multilingual webinars",
    p: "Stream video with multiple audio tracks, live and on-demand. Viewers switch languages in real time. Remote simultaneous interpretation is available via Translate@Home.",
  },
  {
    h: "Simulive webinars",
    p: "Stream an uploaded video as if it were live, with scheduling automation — also available in multilingual formats.",
  },
  {
    h: "More than just webinars",
    p: "Conferences, e-learning, press conferences and town halls — the appearance is customisable per event type.",
  },
];

export default function WebinarPage() {
  return (
    <>
      <PageHero
        eyebrow="Webinar Platform"
        title="Create engaging, interactive events for participants around the world"
        intro="A hosted platform for webinars, virtual events and hybrid gatherings — branded registration and viewing pages, interactive features, and multilingual audio and captions."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/free-trial" size="lg">Try for free <ArrowIcon /></Button>
          <Button href="/pricing" size="lg" variant="light">Check it out</Button>
        </div>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {blocks.map((b, i) => (
              <div key={b.h} className="reveal rounded-2xl border border-ink-100 bg-white p-7" data-delay={(i % 2) * 70}>
                <h2 className="text-lg font-bold text-ink-900">{b.h}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{b.p}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <FeatureGrid
        eyebrow="Why choose SabioCast"
        title="Key benefits"
        tone="muted"
        features={[
          { title: "Secure registration", body: "Customisable flows — public, approval-based or invitation-only." },
          { title: "Interaction rich", body: "Polls, chat, Q&A, surveys, embedded feeds and calls to action." },
          { title: "Fully branded", body: "Customisable landing and registration pages, with custom CSS." },
          { title: "Live dashboard", body: "Real-time broadcast control and participant monitoring." },
          { title: "On-demand conversion", body: "DVR, auto-conversion, editing and segmentation by topic or speaker." },
          { title: "Per-participant analytics", body: "Viewing heatmaps, watch time and re-watch tracking." },
        ]}
      />

      <CtaSection />
    </>
  );
}
