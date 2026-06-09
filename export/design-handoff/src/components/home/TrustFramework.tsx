import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Pillar = { number: string; title: string; description: string };

export function TrustFramework({
  eyebrow,
  intro,
  pillars,
  processLink,
}: {
  eyebrow: string;
  intro: string;
  pillars: Pillar[];
  processLink: { label: string; href: string };
}) {
  return (
    <section className="bg-cube-navy py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading eyebrow={eyebrow} title="למה לבחור ב-Cube" subtitle={intro} light align="center" />

        <div className="rounded-sm bg-cube-neutral p-8 md:p-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.number}>
                <span className="text-sm font-semibold text-cube-gold">{pillar.number}</span>
                <h3 className="mt-2 text-lg font-bold text-cube-navy">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cube-body">{pillar.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link href={processLink.href} className="text-sm font-medium text-cube-sapphire hover:underline">
              {processLink.label} ←
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
