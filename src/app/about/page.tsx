import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui";
import { LogoMarquee, StatBand, CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "About us",
  description:
    "SabioCast has been reinventing multilingual live streaming since 2005 — making high-quality captions and simultaneous interpretation accessible for live video.",
};

const timeline = [
  { year: "2005", text: "Founded in Berchem, Belgium. First live streams delivered for enterprise clients." },
  { year: "2012", text: "Remote simultaneous interpretation launches — interpreters work from anywhere in the world." },
  { year: "2018", text: "Translate@Home wins its first industry innovation award for RSI." },
  { year: "2022", text: "Contextual AI captioning ships: 99+% accuracy without human intervention." },
  { year: "2024", text: "Live AI speech translation and on-site attendee transcription go GA." },
  { year: "2026", text: "The platform is acquired and relaunches as SabioCast, with the same team and technology." },
];

const values = [
  { title: "Break the language barrier", body: "Everyone should be able to broadcast a multilingual live stream to a global audience — and every viewer should be able to watch in their own language." },
  { title: "AI with accountability", body: "We use AI to cut cost and complexity, and we pair it with human correction wherever the highest quality standards demand it." },
  { title: "Built with practitioners", body: "The platform is developed in collaboration with event managers, interpreters and transcribers, aiming for ease of use and a low threshold to entry." },
  { title: "Enterprise-grade by default", body: "ISO 27001-compliant EU data centres, 24/7 monitoring, redundant streams and a tier-one CDN — for events that cannot fail." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Reinventing multilingual live streaming"
        intro="Since 2005 we have led the way in top-notch, user-friendly streaming solutions, making high-quality captions and simultaneous interpretation accessible for live video. We have managed tens of thousands of events for clients all over the world."
      />

      <div className="bg-ink-950">
        <Container>
          <div className="relative -mt-4 aspect-[21/9] overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="/images/about-team.jpg"
              alt="A multilingual broadcast in production"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1216px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
          </div>
        </Container>
        <div className="h-16" />
      </div>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <SectionHeading
              eyebrow="Our mission"
              title="Allow everyone to broadcast multilingual live streams to a global audience"
              intro="We offer both a self-service SaaS platform and a fully managed service where our experts handle interpreter and captioner coordination. Whichever you choose, viewers anywhere in the world can watch your live stream and pick their preferred audio and caption language in our player."
            />
            <div className="reveal space-y-4" data-delay={100}>
              {values.map((v) => (
                <div key={v.title} className="rounded-2xl border border-ink-100 bg-white p-6">
                  <h3 className="text-base font-bold text-ink-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <LogoMarquee tone="ink" />

      <Section tone="muted">
        <Container>
          <SectionHeading eyebrow="History" title="Two decades of firsts" align="center" />
          <ol className="mx-auto mt-12 max-w-3xl space-y-6">
            {timeline.map((t, i) => (
              <li key={t.year} className="reveal flex gap-6" data-delay={i * 50}>
                <span className="font-display text-xl font-bold text-brand-600">{t.year}</span>
                <p className="border-l border-ink-200 pl-6 text-sm leading-relaxed text-ink-700">
                  {t.text}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <StatBand
        stats={[
          { value: "2005", label: "streaming since" },
          { value: "10,000s", label: "of events delivered" },
          { value: "50+", label: "languages supported" },
          { value: "EU", label: "ISO 27001 data centres" },
        ]}
      />

      <CtaSection heading="Work with us" body="Start a free trial, or talk to the team about your next multilingual event." />
    </>
  );
}
