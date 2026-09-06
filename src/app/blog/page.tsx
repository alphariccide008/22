import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container, Section, ArrowIcon } from "@/components/ui";
import { CtaSection } from "@/components/sections";
import { posts } from "@/content/blog";

export const metadata: Metadata = {
  title: "News",
  description: "Product updates, how-tos and streaming technology insight from the SabioCast team.",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHero eyebrow="News" title="Latest news" intro="Product updates, how-tos and streaming technology insight from the SabioCast team." />

      <Section>
        <Container>
          <Link
            href={`/blog/${featured.slug}`}
            className="reveal group grid gap-8 rounded-3xl border border-ink-100 bg-white p-6 transition-all hover:border-brand-200 hover:shadow-[0_30px_70px_-35px_rgba(90,63,228,0.3)] md:grid-cols-2 md:p-8"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 via-brand-800 to-ink-950">
              <div className="bg-grid absolute inset-0 opacity-30" />
              <div className="flex aspect-[16/10] items-end p-6">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {featured.category}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                {formatDate(featured.date)} · {featured.readingTime} read
              </p>
              <h2 className="mt-3 text-2xl font-bold text-ink-900 group-hover:text-brand-700">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{featured.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                Read article <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="reveal group flex flex-col rounded-2xl border border-ink-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_50px_-24px_rgba(90,63,228,0.28)]"
                data-delay={(i % 3) * 60}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                  {formatDate(p.date)} · {p.category}
                </p>
                <h3 className="mt-3 flex-1 text-lg font-bold text-ink-900 group-hover:text-brand-700">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-600">{p.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Read <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
