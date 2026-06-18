import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { getAboutContent } from "@/lib/content/loaders";

const content = getAboutContent() as {
  seo: { title: string; description: string };
  hero: { headline: string; subheadline: string };
  story: { title: string; paragraphs: string[] };
  philosophy: { title: string; items: string[] };
  founder: { name: string; title: string; photo: string; bio: string };
  insuranceArm: { title: string; text: string };
};

export const metadata: Metadata = {
  title: content.seo.title.replace(" | Cube Financial Group", ""),
  description: content.seo.description,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-cube-neutral py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h1 className="text-3xl font-bold text-cube-navy sm:text-4xl">{content.hero.headline}</h1>
          <p className="mt-3 text-lg text-cube-sapphire sm:mt-4 sm:text-xl">{content.hero.subheadline}</p>
        </div>
      </section>

      <section className="py-10 sm:py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-cube-navy">{content.story.title}</h2>
            {content.story.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} className="mt-4 leading-relaxed text-cube-body">
                {p}
              </p>
            ))}

            <h2 className="mt-12 text-2xl font-bold text-cube-navy">
              {content.philosophy.title}
            </h2>
            <ul className="mt-4 space-y-2">
              {content.philosophy.items.map((item) => (
                <li key={item} className="flex gap-2 text-cube-body">
                  <span className="text-cube-gold">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 grid items-start gap-6 rounded-sm border border-cube-navy/10 bg-cube-neutral p-5 sm:mt-12 sm:gap-8 sm:p-6 md:grid-cols-12 md:gap-10 md:p-8">
            <div className="order-2 md:order-none md:col-span-7">
              <h2 className="text-xl font-bold text-cube-navy">{content.founder.name}</h2>
              <p className="text-cube-sapphire">{content.founder.title}</p>
              <p className="mt-4 leading-relaxed text-cube-body">{content.founder.bio}</p>
            </div>
            <div className="order-1 mx-auto w-full max-w-sm md:order-none md:col-span-5 md:mx-0">
              <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm border border-cube-navy/10">
                <Image
                  src={content.founder.photo}
                  alt={content.founder.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <div className="absolute bottom-0 start-0 h-1 w-16 bg-cube-gold" aria-hidden />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <h2 className="text-xl font-bold text-cube-navy">{content.insuranceArm.title}</h2>
            <p className="mt-2 leading-relaxed text-cube-body">{content.insuranceArm.text}</p>
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
