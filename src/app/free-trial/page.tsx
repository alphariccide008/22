import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section, CheckIcon } from "@/components/ui";
import { TrialForm } from "@/components/TrialForm";

export const metadata: Metadata = {
  title: "Request a free trial account",
  description: "Test the SabioCast platform for 7 days. No credit card required. Business email required.",
};

const notes = [
  "A trial account is valid for 7 days by default",
  "Designed to test the SaaS platform, not to access an existing stream",
  "A business email is required — you must represent a company or organisation",
  "No credit card required",
];

export default function FreeTrialPage() {
  return (
    <>
      <PageHero
        eyebrow="Free trial"
        title="Request a free trial account"
        intro="Try the platform yourself. We recommend using the pricing page to size a plan before requesting a trial, so we can tailor the account to your use case."
      />
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr]">
            <div className="reveal">
              <h2 className="text-lg font-bold text-ink-900">Good to know</h2>
              <ul className="mt-4 space-y-3">
                {notes.map((n) => (
                  <li key={n} className="flex gap-3 text-sm text-ink-700">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    {n}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-ink-100 bg-ink-50 p-5 text-sm text-ink-600">
                Need a hosted, managed event instead?{" "}
                <a href="/managed-service" className="font-semibold text-brand-700 underline">
                  See our managed service
                </a>
                .
              </div>
            </div>
            <div className="reveal" data-delay={100}>
              <TrialForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
