import { Button } from "@/components/ui/Button";

export function MeetingCtaBand({
  headline,
  subtext,
  cta,
}: {
  headline: string;
  subtext: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="bg-cube-navy py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <h2 className="text-2xl font-bold text-white md:text-3xl">{headline}</h2>
        <p className="mt-4 text-white/80">{subtext}</p>
        <div className="mt-8">
          <Button href={cta.href} variant="primary" className="text-base px-8 py-3.5">
            {cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
