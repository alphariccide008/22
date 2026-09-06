import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeading, Button, ArrowIcon, CheckIcon } from "@/components/ui";
import { CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Managed Service",
  description:
    "Let SabioCast manage your multilingual event from start to finish — interpreter and captioner sourcing, testing, monitoring and live assistance.",
};

const before = [
  "Scope assessment by email or virtual meeting",
  "Language service provider sourcing for your languages and subject",
  "Staff training and platform setup",
  "An advance testing opportunity",
];

const during = [
  "Final rehearsal and system check",
  "Live stream encoding verification",
  "Continuous monitoring of audio and captions",
  "Real-time management via Slack",
  "Multi-language viewer access",
];

const included = [
  "Dedicated project manager",
  "Support engineers for optimisation",
  "Professional linguist quality review",
  "Custom Slack channel access",
];

export default function ManagedServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Managed Service"
        title="Let us manage your event from start to finish"
        intro="Deliver a flawless multilingual live stream without the stress. We source vetted interpreters and captioners, set up and test the platform, and monitor everything during the broadcast."
      >
        <Button href="/contact?intent=quote" size="lg">Get a quote <ArrowIcon /></Button>
      </PageHero>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="Two phases, one seamless event"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="reveal rounded-2xl border border-ink-100 bg-white p-7">
              <h3 className="font-bold text-ink-900">Before the event</h3>
              <ul className="mt-4 space-y-3">
                {before.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-ink-700">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal rounded-2xl border border-ink-100 bg-white p-7" data-delay={80}>
              <h3 className="font-bold text-ink-900">During the event</h3>
              <ul className="mt-4 space-y-3">
                {during.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-ink-700">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <SectionHeading
              eyebrow="Quality control"
              title="Finding the right interpreters and captioners"
              intro="We work with vetted language service providers who meet strict technical and linguistic quality standards, and who work in pairs for live events. Every event gets a dedicated project manager and a professional linguist quality review."
            />
            <div className="reveal rounded-2xl border border-ink-100 bg-white p-6" data-delay={100}>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-400">
                Always included
              </p>
              <ul className="mt-3 space-y-2.5">
                {included.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-ink-700">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
