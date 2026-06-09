import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Step = { number: string; title: string };

export function ProcessSection({
  title,
  subtitle,
  steps,
  link,
}: {
  title: string;
  subtitle: string;
  steps: Step[];
  link: { label: string; href: string };
}) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading title={title} subtitle={subtitle} />

        <ol className="grid gap-6 md:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number} className="relative text-center md:text-start">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-cube-gold text-sm font-bold text-cube-navy">
                {step.number}
              </span>
              <h3 className="mt-4 font-bold text-cube-navy">{step.title}</h3>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-center">
          <Link href={link.href} className="text-sm font-medium text-cube-sapphire hover:underline">
            {link.label} ←
          </Link>
        </p>
      </div>
    </section>
  );
}
