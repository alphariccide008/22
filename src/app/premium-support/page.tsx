import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeading, Button, ArrowIcon, CheckIcon } from "@/components/ui";
import { CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Premium Support",
  description:
    "Autonomous use of the SabioCast platform with premium support — guaranteed response times, a service level, and a custom Slack channel.",
};

const autonomous = [
  "Complete help centre with manuals, tutorials and FAQs",
  "Technical support by email (best effort)",
  "Assistance during Brussels office hours",
];

const premium = [
  "Direct contact during live streams with instant availability",
  "Guaranteed response times for extended broadcasts (negotiable)",
  "Custom Slack channel to chat directly with support engineers",
  "Virtual meetings via Slack, Zoom, Teams or Google Meet",
  "Support during your testing phase",
  "A team of experienced streaming professionals",
];

export default function PremiumSupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Premium Support"
        title="Autonomous use of SabioCast, with premium support"
        intro="Get the best of both worlds: run the platform yourself, and have our engineers on hand with guaranteed response times and a service level when it matters most."
      >
        <Button href="/contact?intent=quote" size="lg">Get a quote <ArrowIcon /></Button>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="reveal rounded-2xl border border-ink-100 bg-white p-7">
              <h2 className="text-lg font-bold text-ink-900">Included with every SaaS plan</h2>
              <ul className="mt-4 space-y-3">
                {autonomous.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-ink-700">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-ink-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal rounded-2xl border border-brand-200 bg-brand-50 p-7" data-delay={80}>
              <h2 className="text-lg font-bold text-ink-900">Premium support add-on</h2>
              <ul className="mt-4 space-y-3">
                {premium.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-ink-800">
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
          <SectionHeading
            eyebrow="Premium support vs managed service"
            title="Which one do you need?"
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-ink-100 bg-white p-6">
              <h3 className="font-bold text-ink-900">Premium support</h3>
              <p className="mt-2 text-sm text-ink-600">
                You manage interpreters, captioners and live stream operations.
                SabioCast provides technical oversight and rapid assistance.
              </p>
            </div>
            <div className="rounded-2xl border border-ink-100 bg-white p-6">
              <h3 className="font-bold text-ink-900">Managed service</h3>
              <p className="mt-2 text-sm text-ink-600">
                SabioCast sources and manages interpreters and captioners and runs
                the event with you — recommended if you're new to live streaming.
              </p>
              <Button href="/managed-service" variant="ghost" className="mt-4">
                Managed service <ArrowIcon />
              </Button>
            </div>
          </div>
          <p className="mt-6 text-sm text-ink-500">
            Pricing is a custom quote based on broadcast duration, scope and
            requirements. <a href="/contact?intent=quote" className="font-semibold text-brand-700 underline">Request one here.</a>
          </p>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
