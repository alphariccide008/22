import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeading, Button, ArrowIcon } from "@/components/ui";
import { PlayerMock } from "@/components/PlayerMock";
import { CtaSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Multilingual Live Demo",
  description:
    "See SabioCast in action — any number of audio languages and closed captions, in an embeddable player, live and simulive.",
};

const demos = [
  {
    id: "multilingual",
    title: "Multilingual Live Streaming",
    body: "A live stream with several selectable audio languages and closed captions. Use the headphone menu to select audio and the CC menu for captions.",
  },
  {
    id: "ai-speech",
    title: "Live AI Speech Translations and Subtitles",
    body: "Fully automatic AI speech translation and multilingual subtitles, generated in real time with natural-sounding AI voices.",
  },
  {
    id: "accuracy",
    title: "Live AI Captions Accuracy Comparison",
    body: "The same live stream captioned automatically by SabioCast, YouTube and Vimeo — different speakers, accents and speech patterns, all unedited.",
  },
  {
    id: "floor",
    title: "Live AI for Multilingual Floor",
    body: "AI captions and translations for a stream where multiple languages are spoken from the floor, each segment captioned natively then translated.",
  },
];

export default function DemosPage() {
  return (
    <>
      <PageHero
        eyebrow="Live demo"
        title="Any number of audio languages and closed captions"
        intro="Our demo streams 3 times per hour, at :00, :20 and :40. Use the headphone menu to select audio languages and the CC menu for closed captions."
      >
        <Button href="/free-trial" size="lg">Try it yourself <ArrowIcon /></Button>
      </PageHero>

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <PlayerMock />
            <p className="mt-4 text-center text-sm text-ink-500">
              Embed this exact player in any site or platform with a single snippet.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading eyebrow="Demo library" title="What you can watch" />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {demos.map((d, i) => (
              <div
                key={d.id}
                id={d.id}
                className="reveal scroll-mt-24 rounded-2xl border border-ink-100 bg-white p-7"
                data-delay={(i % 2) * 70}
              >
                <h3 className="text-lg font-bold text-ink-900">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{d.body}</p>
                <Button href="/free-trial" variant="ghost" className="mt-5">
                  Request access <ArrowIcon />
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
