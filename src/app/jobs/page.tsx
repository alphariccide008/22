import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeading, Button, ArrowIcon, CheckIcon } from "@/components/ui";

export const metadata: Metadata = {
  title: "Jobs",
  description: "Join SabioCast — a growing Belgian B2B SaaS company building AI-powered multilingual live streaming.",
};

const perks = [
  "Training budget and time to innovate",
  "Flexible hours and remote work",
  "Short decision lines, open culture",
  "Competitive salary with fringe benefits",
  "Work-life balance, genuinely",
  "Entrepreneurial spirit encouraged",
];

const openRoles = [
  {
    title: "Backend Developer — SaaS Solutions",
    type: "Full-time · Berchem / remote",
    summary:
      "Build high-performance applications in Linux environments, turning video workflows into AI-powered solutions with ownership across the whole development lifecycle.",
    must: [
      "Bachelor's/Master's in computer science or equivalent experience",
      "Proficiency in Java, Python and/or Go",
      "Comfortable with Linux and open source",
      "English and/or Dutch fluency",
      "Interest in online video technology",
    ],
    nice: [
      "HTML and JavaScript",
      "AI language model experience",
      "FFmpeg, HLS and DASH familiarity",
    ],
  },
];

export default function JobsPage() {
  return (
    <>
      <PageHero
        eyebrow="Jobs"
        title="Build the future of multilingual video"
        intro="SabioCast is a growing Belgian B2B SaaS company specialising in multilingual live streaming. We're looking for tech talent across a range of skill levels."
      />

      <Section>
        <Container>
          <SectionHeading eyebrow="Culture & benefits" title="Why work here" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((p, i) => (
              <li
                key={p}
                className="reveal flex items-start gap-3 rounded-2xl border border-ink-100 bg-white p-5 text-sm text-ink-700"
                data-delay={(i % 3) * 60}
              >
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                {p}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading eyebrow="Open positions" title="Roles we're hiring for" />
          <div className="mt-10 space-y-5">
            {openRoles.map((r) => (
              <div key={r.title} className="reveal rounded-2xl border border-ink-100 bg-white p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-ink-900">{r.title}</h3>
                    <p className="mt-1 text-sm text-ink-500">{r.type}</p>
                  </div>
                  <Button href="/contact?intent=job" variant="ghost">
                    Apply <ArrowIcon />
                  </Button>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-600">{r.summary}</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-400">
                      What you bring
                    </p>
                    <ul className="mt-3 space-y-2">
                      {r.must.map((m) => (
                        <li key={m} className="flex gap-2 text-sm text-ink-700">
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-400">
                      Nice to have
                    </p>
                    <ul className="mt-3 space-y-2">
                      {r.nice.map((m) => (
                        <li key={m} className="flex gap-2 text-sm text-ink-700">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-300" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-ink-500">
            Don&apos;t see your role? Send us your CV and a short motivation anyway via the{" "}
            <a href="/contact" className="font-semibold text-brand-700 underline">
              contact form
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
