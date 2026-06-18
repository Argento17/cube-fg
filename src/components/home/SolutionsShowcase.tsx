import Link from "next/link";
import type { ReactNode } from "react";

type SolutionCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};

function CardMark({ variant }: { variant: string }) {
  const marks: Record<string, ReactNode> = {
    pension: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
        <rect x="8" y="32" width="32" height="8" rx="1" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <rect x="12" y="22" width="24" height="8" rx="1" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <rect x="16" y="12" width="16" height="8" rx="1" fill="none" stroke="#1E3A8A" strokeWidth="2" />
        <path
          d="M24 10 L24 4 M20 8 L24 4 L28 8"
          fill="none"
          stroke="#1E3A8A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    financial: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
        <rect x="8" y="28" width="8" height="12" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <rect x="20" y="20" width="8" height="20" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <rect x="32" y="12" width="8" height="28" fill="none" stroke="#1E3A8A" strokeWidth="2" />
      </svg>
    ),
    retirement: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
        <circle cx="24" cy="24" r="14" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <path d="M24 14 L24 24 L32 28" fill="none" stroke="#1E3A8A" strokeWidth="2" />
      </svg>
    ),
    insurance: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
        <path d="M24 8 L38 16 V28 C38 36 24 42 24 42 C24 42 10 36 10 28 V16 Z" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <line x1="18" y1="26" x2="30" y2="26" stroke="#1E3A8A" strokeWidth="2" />
      </svg>
    ),
  };

  return marks[variant] ?? marks.financial;
}

export function SolutionsShowcase({
  title,
  items,
}: {
  title: string;
  items: SolutionCard[];
}) {
  return (
    <section className="bg-white py-14 sm:py-20 md:py-28" id="solutions">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center text-2xl font-extrabold text-cube-navy sm:text-3xl md:text-4xl">
          {title}
        </h2>
        <div className="mx-auto mt-3 h-0.5 w-16 bg-cube-gold" />

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col rounded-sm border border-cube-navy/10 bg-cube-neutral p-6 transition-all duration-300 hover:border-cube-gold/40 hover:shadow-lg sm:p-8"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-sm border border-cube-navy/8 bg-white">
                <CardMark variant={item.id} />
              </div>
              <h3 className="text-xl font-bold text-cube-navy group-hover:text-cube-sapphire">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-cube-body">
                {item.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-cube-gold">
                {item.cta}
                <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
                  ←
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
