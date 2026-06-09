import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { getAboutContent } from "@/lib/content/loaders";

const content = getAboutContent() as {
  seo: { title: string; description: string };
  hero: { headline: string; subheadline: string };
  story: { title: string; paragraphs: string[] };
  philosophy: { title: string; items: string[] };
  founder: { name: string; title: string; bio: string };
  insuranceArm: { title: string; text: string };
};

export const metadata: Metadata = {
  title: content.seo.title.replace(" | Cube Financial Group", ""),
  description: content.seo.description,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-cube-neutral py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h1 className="text-4xl font-bold text-cube-navy">{content.hero.headline}</h1>
          <p className="mt-4 text-xl text-cube-sapphire">{content.hero.subheadline}</p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="text-2xl font-bold text-cube-navy">{content.story.title}</h2>
          {content.story.paragraphs.map((p) => (
            <p key={p.slice(0, 20)} className="mt-4 leading-relaxed text-cube-body">
              {p}
            </p>
          ))}

          <h2 className="mt-12 text-2xl font-bold text-cube-navy">{content.philosophy.title}</h2>
          <ul className="mt-4 space-y-2">
            {content.philosophy.items.map((item) => (
              <li key={item} className="flex gap-2 text-cube-body">
                <span className="text-cube-gold">—</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-sm border border-cube-navy/10 bg-cube-neutral p-6">
            <h2 className="text-xl font-bold text-cube-navy">{content.founder.name}</h2>
            <p className="text-cube-sapphire">{content.founder.title}</p>
            <p className="mt-4 text-cube-body">{content.founder.bio}</p>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold text-cube-navy">{content.insuranceArm.title}</h2>
            <p className="mt-2 text-cube-body">{content.insuranceArm.text}</p>
          </div>

          <div className="mt-10">
            <Button href="/meeting" variant="primary">
              לתיאום פגישת ייעוץ
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
