"use client";

import { useEffect, useState } from "react";

type Partner = {
  id: string;
  name: string;
  logo: string;
};

const logoHeight = "h-14 md:h-20";

/** Subtle scale tweaks when a mark reads too large/small at the shared height. */
const partnerScale: Record<string, string> = {
  hachshara: "scale-[0.76] md:scale-[0.8]",
  clal: "scale-[0.8] md:scale-[0.84]",
  migdal: "scale-[1.1] md:scale-[1.12]",
  more: "scale-[0.92] md:scale-[0.94]",
};

function PartnerLogo({ partner }: { partner: Partner }) {
  const scale = partnerScale[partner.id] ?? "";
  const imgClass = `${logoHeight} w-auto origin-center object-contain object-center opacity-95 transition-opacity hover:opacity-100 ${scale}`;

  if (partner.id === "meitav") {
    return (
      <div
        className={`flex ${logoHeight} items-center justify-center overflow-hidden`}
      >
        <img
          src={encodeURI(partner.logo)}
          alt={partner.name}
          width={280}
          height={112}
          className="h-40 w-auto object-contain object-center opacity-95 transition-opacity hover:opacity-100 md:h-56"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <img
      src={encodeURI(partner.logo)}
      alt={partner.name}
      width={224}
      height={80}
      className={imgClass}
      loading="lazy"
      decoding="async"
    />
  );
}

export function PartnersCarousel({
  title,
  partners,
}: {
  title: string;
  partners: Partner[];
}) {
  const [paused, setPaused] = useState(false);
  const doubled = [...partners, ...partners];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setPaused(true);
    const handler = () => setPaused(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section className="border-y border-cube-navy/10 bg-cube-neutral py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center text-2xl font-bold text-cube-navy md:text-3xl">
          {title}
        </h2>
      </div>

      <div
        className="relative mt-12 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
          if (!mq.matches) setPaused(false);
        }}
      >
        <div
          className={`flex w-max items-center gap-12 px-6 sm:gap-16 sm:px-8 md:px-10 ${
            paused ? "" : "animate-partners-scroll"
          }`}
          aria-label={title}
        >
          {doubled.map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="flex h-16 w-44 shrink-0 items-center justify-center sm:h-20 sm:w-56 md:h-24"
            >
              <PartnerLogo partner={partner} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
