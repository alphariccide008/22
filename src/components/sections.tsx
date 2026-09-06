import { Container, Section, SectionHeading, Button, Card, ArrowIcon, CheckIcon } from "./ui";
import { clientLogos } from "@/content/logos";
import type { Feature, Faq } from "@/content/solutions";
import { FaqAccordion } from "./FaqAccordion";

/* ---------------- Logo marquee ---------------- */

export function LogoMarquee({
  heading = "Trusted by global brands and companies",
  tone = "paper",
}: {
  heading?: string;
  tone?: "paper" | "ink";
}) {
  const row = [...clientLogos, ...clientLogos];
  return (
    <section className={tone === "ink" ? "bg-ink-950 py-16 text-white" : "bg-paper py-16"}>
      <Container>
        <p
          className={`text-center text-xs font-semibold uppercase tracking-[0.18em] ${
            tone === "ink" ? "text-white/40" : "text-ink-400"
          }`}
        >
          {heading}
        </p>
      </Container>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max gap-12 pr-12">
          {row.map((name, i) => (
            <span
              key={i}
              className={`shrink-0 font-display text-lg font-semibold tracking-tight ${
                tone === "ink" ? "text-white/50" : "text-ink-400"
              }`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Feature grid ---------------- */

export function FeatureGrid({
  eyebrow,
  title,
  intro,
  features,
  tone = "paper",
  columns = 3,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  features: Feature[];
  tone?: "paper" | "muted" | "ink";
  columns?: 2 | 3;
}) {
  const light = tone === "ink";
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          intro={intro}
          tone={light ? "light" : "dark"}
        />
        <div
          className={`mt-14 grid gap-5 ${
            columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`reveal group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                light
                  ? "border-white/10 bg-white/[0.03] hover:border-white/25"
                  : "border-ink-100 bg-white hover:border-brand-200 hover:shadow-[0_24px_50px_-24px_rgba(90,63,228,0.28)]"
              }`}
              data-delay={i * 60}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${
                    light ? "bg-accent-500/15 text-accent-400" : "bg-brand-50 text-brand-600"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {f.stat && (
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      light ? "bg-white/10 text-white" : "bg-accent-50 text-accent-700"
                    }`}
                  >
                    {f.stat}
                  </span>
                )}
              </div>
              <h3
                className={`mt-4 text-lg font-bold ${light ? "text-white" : "text-ink-900"}`}
              >
                {f.title}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  light ? "text-white/60" : "text-ink-600"
                }`}
              >
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ---------------- Split feature ---------------- */

export function SplitFeature({
  eyebrow,
  title,
  body,
  bullets,
  image,
  reverse = false,
  cta,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body: React.ReactNode;
  bullets?: string[];
  image: React.ReactNode;
  reverse?: boolean;
  cta?: { label: string; href: string };
}) {
  return (
    <Section>
      <Container>
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className="reveal">
            <SectionHeading eyebrow={eyebrow} title={title} intro={body} />
            {bullets && (
              <ul className="mt-6 space-y-3">
                {bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-ink-700">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    <span className="text-[0.95rem] leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {cta && (
              <Button href={cta.href} variant="ghost" className="mt-8">
                {cta.label} <ArrowIcon />
              </Button>
            )}
          </div>
          <div className="reveal" data-delay={120}>
            {image}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ---------------- Stat band ---------------- */

export function StatBand({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <Section tone="ink">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="reveal" data-delay={i * 80}>
              <p className="font-display text-4xl font-bold text-gradient sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */

export function FaqSection({
  eyebrow = "FAQ",
  title = "Frequently asked questions",
  faqs,
  tone = "muted",
}: {
  eyebrow?: string;
  title?: string;
  faqs: Faq[];
  tone?: "paper" | "muted";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow={eyebrow} title={title} />
          <FaqAccordion faqs={faqs} />
        </div>
      </Container>
    </Section>
  );
}

/* ---------------- CTA ---------------- */

export function CtaSection({
  heading = "Get started now",
  body = "Start live streaming today with a solution of choice. No credit card required.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="bg-paper py-20 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-700 px-6 py-14 text-center md:px-16 md:py-20">
          <div className="bg-grid absolute inset-0 opacity-30" />
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-500/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-brand-400/30 blur-3xl" />
          <div className="relative">
            <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">{body}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/free-trial" size="lg" variant="primary">
                Try for free <ArrowIcon />
              </Button>
              <Button href="/contact" size="lg" variant="light">
                Contact us for more info
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Service models ---------------- */

export function ServiceModels() {
  return (
    <Section tone="muted">
      <Container>
        <SectionHeading
          eyebrow="Support & services"
          title="World-class support and services for global events"
          align="center"
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-bold text-ink-900">Premium support</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              SabioCast is a self-service platform. Use our AI solutions and hire
              correctors, interpreters or captioners yourself. Premium support
              adds a guaranteed response time, a service level and a custom Slack
              channel for direct contact with our engineers.
            </p>
            <Button href="/premium-support" variant="ghost" className="mt-5">
              Learn more <ArrowIcon />
            </Button>
          </Card>
          <Card>
            <h3 className="text-lg font-bold text-ink-900">Managed service</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              We source correctors, interpreters and captioners for optimal
              quality, help you manage your project, monitor your live stream and
              provide prompt assistance — so your event just works.
            </p>
            <Button href="/managed-service" variant="ghost" className="mt-5">
              Learn more <ArrowIcon />
            </Button>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
