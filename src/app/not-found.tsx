import { Container, Button, ArrowIcon } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink-950 text-white">
      <div className="bg-grid absolute inset-0 opacity-[0.12]" />
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand-600/25 blur-[120px]" />
      <Container className="relative text-center">
        <p className="font-display text-7xl font-bold text-gradient">404</p>
        <h1 className="mt-4 text-2xl font-bold">This page couldn&apos;t be found</h1>
        <p className="mx-auto mt-3 max-w-md text-white/60">
          The link may be broken, or the page may have moved. Let&apos;s get you
          back to something useful.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg">Back home <ArrowIcon /></Button>
          <Button href="/contact" size="lg" variant="light">Contact us</Button>
        </div>
      </Container>
    </section>
  );
}
