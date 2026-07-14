import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { getAboutContent } from "@/lib/content/loaders";

const content = getAboutContent() as {
  seo: { title: string; description: string };
  hero: { headline: string; subheadline: string };
  intro: { paragraphs: string[] };
  arms: { title: string; subtitle: string; text: string }[];
  why: {
    title: string;
    intro: string;
    items: { title: string; text: string }[];
  };
  founder: {
    name: string;
    title: string;
    photo: string;
    background: {
      title: string;
      credentialsTitle: string;
      credentials: string[];
      institutional: { label: string; text: string };
      independent: { label: string; text: string };
    };
    expertise: {
      title: string;
      items: { title: string; text: string }[];
    };
    personal: {
      title: string;
      lines: string[];
    };
  };
};

export const metadata: Metadata = {
  title: content.seo.title.replace(" | Cube Financial Group", ""),
  description: content.seo.description,
};

export default function AboutPage() {
  const { founder } = content;

  return (
    <>
      <section className="bg-cube-neutral py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h1 className="text-3xl font-bold text-cube-navy sm:text-4xl">
            {content.hero.headline}
          </h1>
          <p className="mt-3 text-lg text-cube-sapphire sm:mt-4 sm:text-xl">
            {content.hero.subheadline}
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            {content.intro.paragraphs.map((p) => (
              <p
                key={p.slice(0, 28)}
                className="mt-4 text-base leading-relaxed text-cube-body first:mt-0 sm:text-lg"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:mt-14 md:grid-cols-3">
            {content.arms.map((arm) => (
              <article
                key={arm.title}
                className="border-t-2 border-cube-gold bg-cube-neutral/60 px-5 py-6 sm:px-6"
              >
                <h2 className="text-xl font-bold text-cube-navy">{arm.title}</h2>
                {arm.subtitle ? (
                  <p className="mt-1 text-sm font-semibold text-cube-sapphire">
                    {arm.subtitle}
                  </p>
                ) : null}
                <p className="mt-3 text-sm leading-relaxed text-cube-body sm:text-[15px]">
                  {arm.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-3xl sm:mt-16">
            <h2 className="text-2xl font-bold text-cube-navy sm:text-3xl">
              {content.why.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cube-body sm:text-lg">
              {content.why.intro}
            </p>
            <ul className="mt-8 space-y-6">
              {content.why.items.map((item) => (
                <li key={item.title}>
                  <h3 className="text-lg font-bold text-cube-navy">
                    <span className="me-2 text-cube-gold" aria-hidden>
                      —
                    </span>
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-cube-body">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 grid items-start gap-6 rounded-sm border border-cube-navy/10 bg-cube-neutral p-5 sm:mt-16 sm:gap-8 sm:p-6 md:grid-cols-12 md:gap-10 md:p-8">
            <div className="order-1 mx-auto w-full max-w-sm md:order-none md:col-span-4 md:mx-0 md:sticky md:top-28">
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-sm border border-cube-navy/10">
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 320px"
                  priority
                />
                <div className="absolute bottom-0 start-0 h-1 w-16 bg-cube-gold" aria-hidden />
              </div>
            </div>

            <div className="order-2 space-y-8 md:order-none md:col-span-8">
              <div>
                <h2 className="text-2xl font-bold text-cube-navy">{founder.name}</h2>
                <p className="mt-1 text-cube-sapphire">{founder.title}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-cube-navy">
                  {founder.background.title}
                </h3>
                <p className="mt-3 text-sm font-semibold text-cube-body">
                  {founder.background.credentialsTitle}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {founder.background.credentials.map((item) => (
                    <li key={item} className="flex gap-2 text-cube-body">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cube-gold" aria-hidden />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 leading-relaxed text-cube-body">
                  <span className="font-semibold text-cube-navy">
                    {founder.background.institutional.label}:{" "}
                  </span>
                  {founder.background.institutional.text}
                </p>
                <p className="mt-3 leading-relaxed text-cube-body">
                  <span className="font-semibold text-cube-navy">
                    {founder.background.independent.label}:{" "}
                  </span>
                  {founder.background.independent.text}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-cube-navy">
                  {founder.expertise.title}
                </h3>
                <ul className="mt-3 space-y-3">
                  {founder.expertise.items.map((item) => (
                    <li key={item.title}>
                      <p className="font-semibold text-cube-navy">{item.title}</p>
                      <p className="mt-0.5 leading-relaxed text-cube-body">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-cube-navy/10 pt-6">
                <h3 className="text-lg font-bold text-cube-navy">
                  {founder.personal.title}
                </h3>
                {founder.personal.lines.map((line) => (
                  <p key={line} className="mt-2 leading-relaxed text-cube-body">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <Button href="/meeting" variant="primary" className="w-full sm:w-auto">
              לתיאום פגישת ייעוץ
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
