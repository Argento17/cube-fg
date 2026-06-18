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
    <section className="bg-cube-navy py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">{headline}</h2>
        <p className="mt-3 text-sm text-white/80 sm:mt-4 sm:text-base">{subtext}</p>
        <div className="mt-6 sm:mt-8">
          <Button href={cta.href} variant="primary" className="w-full px-8 py-3.5 text-base sm:w-auto">
            {cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
