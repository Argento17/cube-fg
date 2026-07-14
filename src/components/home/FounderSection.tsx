import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type FounderContent = {
  headline: string;
  name: string;
  title: string;
  photo: string;
  story: string;
  background: string[];
  highlights: string[];
  philosophy: string;
  ctas: { about: { label: string; href: string }; meeting: { label: string; href: string } };
};

export function FounderSection({ content }: { content: FounderContent }) {
  return (
    <section className="bg-cube-neutral py-14 sm:py-20 md:py-28" id="founder">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="mx-auto w-full max-w-md lg:col-span-5 lg:mx-0">
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
            <p className="mt-4 text-lg font-semibold text-cube-navy sm:text-xl">
              {content.name}
            </p>
            <p className="mt-0.5 text-base text-cube-sapphire">{content.title}</p>
          </div>

          <div className="lg:col-span-7">
            <Link href={content.ctas.about.href} className="group inline-block">
              <h2 className="text-2xl font-extrabold leading-tight text-cube-navy transition-colors group-hover:text-cube-sapphire sm:text-3xl md:text-4xl">
                נעים מאוד, אנחנו{" "}
                <span>
                  CUBE
                  <span className="text-cube-gold">.</span>
                </span>
              </h2>
            </Link>

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

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button href={content.ctas.about.href} variant="secondary" className="w-full sm:w-auto">
                {content.ctas.about.label}
              </Button>
              <Button href={content.ctas.meeting.href} variant="primary" className="w-full sm:w-auto">
                {content.ctas.meeting.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
