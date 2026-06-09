import Image from "next/image";
import { Button } from "@/components/ui/Button";

type FounderContent = {
  eyebrow: string;
  name: string;
  title: string;
  photo: string;
  story: string;
  background: string[];
  highlights: string[];
  philosophy: string;
  insuranceNote?: string;
  ctas: { about: { label: string; href: string }; meeting: { label: string; href: string } };
};

export function FounderSection({ content }: { content: FounderContent }) {
  return (
    <section className="bg-cube-neutral py-20 md:py-28" id="founder">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm border border-cube-navy/15 bg-cube-navy/5">
              <Image
                src={content.photo}
                alt={content.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 400px"
                priority
              />
              <div className="absolute bottom-0 start-0 h-1 w-16 bg-cube-gold" aria-hidden />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="mb-2 text-sm font-medium text-cube-gold">{content.eyebrow}</p>
            <h2 className="text-3xl font-bold text-cube-navy md:text-4xl">{content.name}</h2>
            <p className="mt-1 text-lg text-cube-sapphire">{content.title}</p>

            <p className="mt-6 leading-relaxed text-cube-body">{content.story}</p>

            <ul className="mt-6 space-y-2 text-cube-body">
              {content.background.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-cube-gold">—</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {content.highlights.map((chip) => (
                <span
                  key={chip}
                  className="rounded-sm border border-cube-navy/15 bg-white px-3 py-1 text-sm text-cube-navy"
                >
                  {chip}
                </span>
              ))}
            </div>

            <blockquote className="mt-8 border-s-4 border-cube-gold ps-4 text-lg italic text-cube-navy">
              {content.philosophy}
            </blockquote>

            {content.insuranceNote && (
              <p className="mt-4 text-sm text-cube-body/80">{content.insuranceNote}</p>
            )}

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={content.ctas.about.href} variant="secondary">
                {content.ctas.about.label}
              </Button>
              <Button href={content.ctas.meeting.href} variant="primary">
                {content.ctas.meeting.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
