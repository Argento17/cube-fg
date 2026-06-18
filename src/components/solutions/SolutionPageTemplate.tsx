import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import type { Solution } from "@/lib/content/types";
import { getCategoryById } from "@/lib/content/loaders";

export function SolutionPageTemplate({ solution }: { solution: Solution }) {
  const category = getCategoryById(solution.categoryId);
  const meetingHref = `/meeting?subject=${solution.meetingSubject}`;

  return (
    <>
      <section className="bg-cube-navy py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <nav className="mb-4 text-xs text-white/70 sm:text-sm" aria-label="מיקום">
            <Link href="/solutions" className="hover:text-white">
              פתרונות
            </Link>
            <span className="mx-1.5 sm:mx-2">/</span>
            <span>{category?.title}</span>
            <span className="mx-1.5 sm:mx-2">/</span>
            <span className="text-white">{solution.title}</span>
          </nav>
          <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">{solution.title}</h1>
          <p className="mt-3 max-w-2xl text-base text-white/85 sm:mt-4 sm:text-lg">{solution.hero.intro}</p>
          <div className="mt-6 sm:mt-8">
            <Button href={meetingHref} variant="primary" className="w-full sm:w-auto">
              לתיאום פגישת ייעוץ
            </Button>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="text-2xl font-bold text-cube-navy">מהות הפתרון</h2>
          <p className="mt-4 leading-relaxed text-cube-body">{solution.whatIs}</p>

          <h2 className="mt-12 text-2xl font-bold text-cube-navy">למי מתאים</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-cube-body">
            {solution.whoIsItFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-cube-navy">יתרונות</h2>
          <ul className="mt-4 space-y-3">
            {solution.benefits.map((item) => (
              <li key={item} className="flex gap-2 text-cube-body">
                <span className="text-cube-gold">✓</span>
                {item}
              </li>
            ))}
          </ul>

          {solution.insuranceNote && (
            <p className="mt-8 rounded-sm border border-cube-navy/10 bg-cube-neutral p-4 text-sm text-cube-body">
              שירות ביטוח במסגרת בר חיים ביטוחים, חטיבת הביטוח של Cube Financial Group.
            </p>
          )}

          {solution.faq.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-cube-navy">שאלות נפוצות</h2>
              <FaqAccordion items={solution.faq} />
            </div>
          )}
        </div>
      </section>

      <section className="bg-cube-neutral py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="text-lg font-bold text-cube-navy sm:text-xl">רוצים לדבר על {solution.title}?</h2>
          <div className="mt-5 sm:mt-6">
            <Button href={meetingHref} variant="secondary" className="w-full sm:w-auto">
              לתיאום פגישת ייעוץ
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
