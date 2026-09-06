import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Send the SabioCast team your questions about multilingual live streaming, plans, and managed services.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const { intent } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your event"
        intro="Please send us your questions using the form. A member of the team will get back to you at your business email within one working day."
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr]">
            <div className="reveal">
              <h2 className="text-lg font-bold text-ink-900">SabioCast HQ</h2>
              <address className="mt-3 text-sm not-italic leading-relaxed text-ink-600">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.country}
              </address>
              <p className="mt-6 text-sm text-ink-600">
                General enquiries
                <br />
                <a href={`mailto:${site.email}`} className="font-semibold text-brand-700">
                  {site.email}
                </a>
              </p>
              <div className="mt-8 rounded-2xl border border-ink-100 bg-ink-50 p-5 text-sm text-ink-600">
                <p className="font-semibold text-ink-900">Looking for a trial?</p>
                <p className="mt-1">
                  You can{" "}
                  <a href="/free-trial" className="font-semibold text-brand-700 underline">
                    request a trial account
                  </a>{" "}
                  directly — no sales call required.
                </p>
              </div>
            </div>
            <div className="reveal" data-delay={100}>
              <ContactForm defaultIntent={intent} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
