import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui";
import { legalDocs, legalBySlug } from "@/content/legal";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = legalBySlug(slug);
  if (!doc) return {};
  return { title: doc.title, description: doc.intro };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = legalBySlug(slug);
  if (!doc) notFound();

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={doc.title}
        intro={`Last updated ${new Date(doc.updated).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}`}
      />
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_2.4fr]">
            <nav className="reveal hidden lg:block">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-400">
                Legal documents
              </p>
              <ul className="mt-4 space-y-2">
                {legalDocs.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/legal/${d.slug}`}
                      className={`text-sm ${
                        d.slug === doc.slug
                          ? "font-semibold text-brand-700"
                          : "text-ink-600 hover:text-brand-700"
                      }`}
                    >
                      {d.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <article className="reveal max-w-2xl" data-delay={80}>
              <p className="text-[1.05rem] leading-relaxed text-ink-700">{doc.intro}</p>
              {doc.sections.map((s) => (
                <section key={s.h} className="mt-10">
                  <h2 className="text-lg font-bold text-ink-900">{s.h}</h2>
                  {s.p.map((para, i) => (
                    <p key={i} className="mt-3 text-[0.98rem] leading-relaxed text-ink-600">
                      {para}
                    </p>
                  ))}
                </section>
              ))}
              <p className="mt-12 border-t border-ink-100 pt-6 text-sm text-ink-500">
                Questions about this document? Email{" "}
                <a href="mailto:legal@sabiocast.com" className="font-semibold text-brand-700">
                  legal@sabiocast.com
                </a>
                .
              </p>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
