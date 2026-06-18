import type { Metadata } from "next";
import Link from "next/link";
import { getSolutionsData } from "@/lib/content/loaders";

const data = getSolutionsData();

export const metadata: Metadata = {
  title: "פתרונות",
  description: data.intro,
};

export default function SolutionsPage() {
  return (
    <>
      <section className="bg-cube-neutral py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h1 className="text-3xl font-bold text-cube-navy sm:text-4xl">{data.pageTitle}</h1>
          <p className="mt-3 max-w-2xl text-base text-cube-body sm:mt-4 sm:text-lg">{data.intro}</p>
        </div>
      </section>

      <section className="pb-12 sm:pb-20">
        <div className="mx-auto max-w-6xl space-y-12 px-4 sm:space-y-16 md:px-6">
          {data.categories.map((category) => {
            const items = data.solutions.filter((s) => s.categoryId === category.id);
            return (
              <div key={category.id} id={category.id}>
                <h2 className="text-2xl font-bold text-cube-navy">{category.title}</h2>
                <p className="mt-2 text-cube-body">{category.description}</p>
                {category.insuranceArm && (
                  <p className="mt-1 text-sm text-cube-body/80">בר חיים ביטוחים</p>
                )}
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((solution) => (
                    <li key={solution.slug}>
                      <Link
                        href={`/solutions/${solution.slug}`}
                        className="block min-h-11 rounded-sm border border-cube-navy/10 bg-white px-4 py-3 text-cube-navy transition-colors hover:border-cube-gold hover:bg-cube-neutral"
                      >
                        {solution.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
