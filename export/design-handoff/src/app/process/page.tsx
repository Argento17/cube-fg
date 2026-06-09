import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { getProcessPageContent } from "@/lib/content/loaders";

const content = getProcessPageContent() as {
  seo: { title: string; description: string };
  title: string;
  intro: string;
  steps: { number: string; title: string; description: string }[];
  cta: { label: string; href: string };
};

export const metadata: Metadata = {
  title: content.title,
  description: content.seo.description,
};

export default function ProcessPage() {
  return (
    <>
      <section className="bg-cube-neutral py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h1 className="text-4xl font-bold text-cube-navy">{content.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-cube-body">{content.intro}</p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <ol className="space-y-10">
            {content.steps.map((step) => (
              <li key={step.number} className="flex gap-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-cube-gold text-lg font-bold text-cube-navy">
                  {step.number}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-cube-navy">{step.title}</h2>
                  <p className="mt-2 leading-relaxed text-cube-body">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <Button href={content.cta.href} variant="primary">
              {content.cta.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
