import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type FounderContent = {
  headline: string;
  name: string;
  title: string;
  photo: string;
  paragraphs: string[];
  arms: { title: string; subtitle: string; text: string }[];
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
              <h2 className="font-[family-name:var(--font-assistant)] text-2xl font-extrabold leading-tight text-cube-navy transition-colors group-hover:text-cube-sapphire sm:text-3xl md:text-4xl">
                נעים מאוד, אנחנו{" "}
                <span className="whitespace-nowrap">
                  CUBE FINANCIAL GROUP
                  <span className="text-cube-gold">.</span>
                </span>
              </h2>
            </Link>

            {content.paragraphs.map((p) => (
              <p
                key={p.slice(0, 32)}
                className="mt-4 text-base leading-relaxed text-cube-body first:mt-6 sm:text-[17px]"
              >
                {p}
              </p>
            ))}

            <div className="mt-8 space-y-5 border-t border-cube-navy/10 pt-6">
              {content.arms.map((arm) => (
                <div key={arm.title}>
                  <h3 className="text-base font-bold text-cube-navy sm:text-lg">
                    {arm.title}
                  </h3>
                  {arm.subtitle ? (
                    <p className="mt-0.5 text-sm font-semibold text-cube-sapphire">
                      {arm.subtitle}
                    </p>
                  ) : null}
                  <p className="mt-1.5 text-sm leading-relaxed text-cube-body sm:text-[15px]">
                    {arm.text}
                  </p>
                </div>
              ))}
            </div>

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
