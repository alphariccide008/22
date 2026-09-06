import { Container } from "./ui";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 pb-16 pt-16 text-white md:pb-20 md:pt-24">
      <div className="bg-grid absolute inset-0 opacity-[0.12]" />
      <div className="absolute -left-40 -top-20 h-[26rem] w-[26rem] rounded-full bg-brand-600/25 blur-[120px]" />
      <div className="absolute right-0 top-10 h-[20rem] w-[20rem] rounded-full bg-accent-500/15 blur-[120px]" />
      <Container className="relative">
        <div className="max-w-3xl reveal in-view">
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 text-balance font-display text-4xl font-bold leading-[1.06] sm:text-5xl md:text-[3.25rem]">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 text-lg leading-relaxed text-white/70">{intro}</p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
