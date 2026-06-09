import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Scenario = {
  id: string;
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
  link: string;
};

type InsuranceBlock = {
  title: string;
  subtitle: string;
  items: Scenario[];
};

function ScenarioGrid({
  items,
  startIndex = 0,
}: {
  items: Scenario[];
  startIndex?: number;
}) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {items.map((item, index) => (
        <article
          key={item.id}
          className="flex flex-col rounded-sm border border-cube-navy/10 bg-cube-neutral p-6 shadow-sm"
        >
          <span className="text-sm font-semibold text-cube-gold">
            {String(startIndex + index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-xl font-bold text-cube-navy">{item.title}</h3>
          <dl className="mt-4 flex flex-1 flex-col gap-4 text-sm text-cube-body">
            <div>
              <dt className="font-semibold text-cube-navy">אתגר</dt>
              <dd className="mt-1 leading-relaxed">{item.challenge}</dd>
            </div>
            <div>
              <dt className="font-semibold text-cube-navy">גישה</dt>
              <dd className="mt-1 leading-relaxed">{item.approach}</dd>
            </div>
            <div>
              <dt className="font-semibold text-cube-navy">תוצאה צפויה</dt>
              <dd className="mt-1 leading-relaxed">{item.outcome}</dd>
            </div>
          </dl>
          <Link
            href={item.link}
            className="mt-6 text-sm font-medium text-cube-sapphire hover:text-cube-navy"
          >
            פתרונות רלוונטיים ←
          </Link>
        </article>
      ))}
    </div>
  );
}

export function ClientScenarios({
  title,
  subtitle,
  items,
  insurance,
}: {
  title: string;
  subtitle: string;
  items: Scenario[];
  insurance?: InsuranceBlock;
}) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading title={title} subtitle={subtitle} />
        <ScenarioGrid items={items} />

        {insurance && (
          <div className="mt-20 border-t border-cube-navy/10 pt-20">
            <SectionHeading title={insurance.title} subtitle={insurance.subtitle} />
            <ScenarioGrid items={insurance.items} startIndex={items.length} />
          </div>
        )}
      </div>
    </section>
  );
}
