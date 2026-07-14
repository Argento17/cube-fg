type LegalSection = {
  heading?: string;
  paragraphs?: string[];
  items?: string[];
};

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated?: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="bg-cube-neutral py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h1 className="text-3xl font-bold text-cube-navy sm:text-4xl">{title}</h1>
          {updated ? (
            <p className="mt-3 text-sm text-cube-body/70">עודכן לאחרונה: {updated}</p>
          ) : null}
          {intro ? (
            <p className="mt-5 text-base leading-relaxed text-cube-body sm:text-lg">{intro}</p>
          ) : null}
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-3xl space-y-10 px-4 md:px-6">
          {sections.map((section) => (
            <article key={section.heading ?? section.paragraphs?.[0]?.slice(0, 24)}>
              {section.heading ? (
                <h2 className="text-xl font-bold text-cube-navy">{section.heading}</h2>
              ) : null}
              {section.paragraphs?.map((p) => (
                <p
                  key={p.slice(0, 36)}
                  className="mt-3 text-base leading-relaxed text-cube-body first:mt-3"
                >
                  {p}
                </p>
              ))}
              {section.items && section.items.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2 text-base leading-relaxed text-cube-body">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cube-gold" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export type { LegalSection };
