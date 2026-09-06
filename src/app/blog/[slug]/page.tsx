import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Container, Section, ArrowIcon } from "@/components/ui";
import { CtaSection } from "@/components/sections";
import { posts, postBySlug } from "@/content/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`${post.category} · ${formatDate(post.date)}`}
        title={post.title}
        intro={post.excerpt}
      />
      <Section>
        <Container>
          <article className="mx-auto max-w-2xl">
            {post.body.map((para, i) => (
              <p key={i} className="mt-5 text-[1.05rem] leading-relaxed text-ink-700 first:mt-0">
                {para}
              </p>
            ))}
            <div className="mt-10 border-t border-ink-100 pt-6">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                <ArrowIcon className="h-4 w-4 rotate-180" /> All news
              </Link>
            </div>
          </article>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <h2 className="text-2xl font-bold text-ink-900">More from the blog</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {more.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-2xl border border-ink-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-200"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                  {p.category}
                </p>
                <h3 className="mt-2 text-base font-bold text-ink-900 group-hover:text-brand-700">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
