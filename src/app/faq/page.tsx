import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaSection } from "@/components/sections";
import { faqCategories } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the most common questions about SabioCast — delivery, languages, accuracy, recording and pricing.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        intro="Everything you need to know about multilingual live streaming with SabioCast. Can't find your answer? Contact us and we'll help."
      />
      <Section>
        <Container>
          <div className="space-y-16">
            {faqCategories.map((cat, i) => (
              <div key={cat.title} className="reveal grid gap-8 lg:grid-cols-[1fr_2fr]" data-delay={i * 40}>
                <h2 className="text-2xl font-bold text-ink-900">{cat.title}</h2>
                <FaqAccordion faqs={cat.items} />
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <CtaSection heading="Still have a question?" body="Ask the team directly — we reply within one working day." />
    </>
  );
}
