import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container, Section, SectionHeading, Button, ArrowIcon } from "@/components/ui";
import {
  LogoMarquee,
  FeatureGrid,
  FaqSection,
  CtaSection,
  ServiceModels,
} from "@/components/sections";
import { PlayerMock } from "@/components/PlayerMock";
import { solutions, solutionBySlug } from "@/content/solutions";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = solutionBySlug(slug);
  if (!s) return {};
  return { title: s.metaTitle, description: s.metaDescription };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = solutionBySlug(slug);
  if (!s) notFound();

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-ink-950 pb-24 pt-14 text-white md:pt-20">
        <div className="bg-grid absolute inset-0 opacity-[0.12]" />
        <div className="absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-600/25 blur-[120px]" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div className="reveal in-view">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
                {s.eyebrow}
              </span>
              <h1 className="mt-4 text-balance font-display text-4xl font-bold leading-[1.06] sm:text-5xl">
                {s.heroHeading}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
                {s.heroBody}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/free-trial" size="lg">
                  Try now <ArrowIcon />
                </Button>
                <Button href="/demos" size="lg" variant="light">
                  View more
                </Button>
              </div>
            </div>
            <div className="reveal in-view" data-delay={120}>
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={s.heroImage}
                  alt=""
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink-950/70 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* intro */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <SectionHeading title={s.intro.heading} intro={s.intro.body} />
            <div className="reveal" data-delay={100}>
              <PlayerMock />
            </div>
          </div>
        </Container>
      </Section>

      <LogoMarquee tone="ink" />

      <FeatureGrid
        eyebrow="Capabilities"
        title={`What you get with ${s.eyebrow}`}
        features={s.features}
        tone="muted"
      />

      {/* steps */}
      {s.steps && (
        <Section>
          <Container>
            <SectionHeading
              eyebrow={s.steps.subheading}
              title={s.steps.heading}
              intro={s.steps.body}
            />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {s.steps.items.map((item, i) => (
                <div
                  key={item.title}
                  className="reveal rounded-2xl border border-ink-100 bg-white p-6"
                  data-delay={i * 70}
                >
                  <span className="font-display text-3xl font-bold text-brand-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-ink-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <ServiceModels />

      <FaqSection faqs={s.faqs} />

      <CtaSection />
    </>
  );
}
