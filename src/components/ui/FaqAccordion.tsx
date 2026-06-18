"use client";

import { useState } from "react";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-cube-navy/10 rounded-sm border border-cube-navy/10">
      {items.map((item, index) => (
        <div key={item.q}>
          <button
            type="button"
            className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-4 text-start text-sm font-semibold text-cube-navy hover:bg-cube-neutral/50 sm:text-base"
            aria-expanded={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {item.q}
            <span className="text-cube-gold">{openIndex === index ? "−" : "+"}</span>
          </button>
          {openIndex === index && (
            <div className="px-4 pb-4 text-sm leading-relaxed text-cube-body">{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}
