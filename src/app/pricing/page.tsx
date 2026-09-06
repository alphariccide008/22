import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeading, Button, ArrowIcon, CheckIcon } from "@/components/ui";
import { FaqSection, CtaSection } from "@/components/sections";
import { plans, annualPlan, pricingFaqs } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple plans for multilingual live streaming — data traffic, processing hours and optional AI hours, monthly or annual. No hidden tiers.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple plans, no hidden tiers"
        intro="Every plan contains a set amount of resources — data traffic, live and VoD processing hours, and optionally AI hours. Need more? Add resources up front or simply pay overuse when your plan ends. We never stop your live stream."
      />

      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`reveal flex flex-col rounded-2xl border p-7 ${
                  plan.featured
                    ? "border-brand-600 bg-brand-700 text-white shadow-[0_30px_70px_-30px_rgba(90,63,228,0.6)]"
                    : "border-ink-100 bg-white"
                }`}
                data-delay={(i % 3) * 70}
              >
                {plan.featured && (
                  <span className="mb-3 w-fit rounded-full bg-accent-500 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    Most popular
                  </span>
                )}
                <h3
                  className={`text-lg font-bold ${plan.featured ? "text-white" : "text-ink-900"}`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${plan.featured ? "text-white/70" : "text-ink-500"}`}
                >
                  {plan.blurb}
                </p>
                <p className="mt-5 flex items-baseline gap-1">
                  <span
                    className={`text-xs font-semibold ${plan.featured ? "text-white/60" : "text-ink-400"}`}
                  >
                    from
                  </span>
                  <span
                    className={`font-display text-4xl font-bold ${plan.featured ? "text-white" : "text-ink-900"}`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${plan.featured ? "text-white/60" : "text-ink-400"}`}
                  >
                    {plan.cadence}
                  </span>
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.includes.map((f) => (
                    <li
                      key={f}
                      className={`flex gap-2.5 text-sm ${plan.featured ? "text-white/85" : "text-ink-700"}`}
                    >
                      <CheckIcon
                        className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-accent-300" : "text-brand-600"}`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  href={plan.href}
                  variant={plan.featured ? "light" : "ghost"}
                  className="mt-7 w-full"
                >
                  See plan <ArrowIcon />
                </Button>
              </div>
            ))}
          </div>

          {/* annual */}
          <div className="reveal mt-6 rounded-2xl border border-ink-100 bg-ink-50 p-8 md:flex md:items-center md:justify-between md:gap-8">
            <div className="max-w-xl">
              <h3 className="text-xl font-bold text-ink-900">{annualPlan.name}</h3>
              <p className="mt-2 text-sm text-ink-600">{annualPlan.blurb}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {annualPlan.includes.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-ink-700">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Button href="/contact?intent=quote&plan=annual" className="mt-6 shrink-0 md:mt-0">
              Contact us <ArrowIcon />
            </Button>
          </div>
        </Container>
      </Section>

      <Section id="calculator" tone="ink">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="Estimate data traffic"
              title="Not sure which plan you need?"
              intro="Data traffic depends on your audience size, stream length and video quality. Tell us about your event and we'll size a plan — and if you already have a quote from another provider, send us the terms and we'll come up with something more suitable."
              tone="light"
            />
            <div className="reveal rounded-2xl border border-white/10 bg-white/[0.03] p-6" data-delay={100}>
              <dl className="space-y-4 text-sm">
                {[
                  ["Typical webinar (500 viewers, 1h, HD)", "~120 GB"],
                  ["Conference (5,000 viewers, 3h, HD)", "~3.5 TB"],
                  ["Flagship broadcast (50,000 viewers, 2h)", "~22 TB"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <dt className="text-white/60">{k}</dt>
                    <dd className="font-display font-bold text-white">{v}</dd>
                  </div>
                ))}
              </dl>
              <Button href="/contact?intent=quote" variant="light" className="mt-6 w-full">
                Get a tailored quote
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <FaqSection
        title="Plans & pricing questions"
        faqs={pricingFaqs}
        tone="muted"
      />

      <CtaSection heading="Start with a free trial" body="Test the platform for 7 days. No credit card required." />
    </>
  );
}
