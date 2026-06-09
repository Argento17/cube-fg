import Image from "next/image";
import Link from "next/link";
import { brand } from "@/config/brand";

type Dimension = {
  id: string;
  number: string;
  title: string;
  description: string;
  href: string;
  insuranceArm?: boolean;
};

export function FourDimensions({
  title,
  subtitle,
  frameworkLine,
  closing,
  items,
}: {
  title: string;
  subtitle: string;
  frameworkLine: string;
  closing: string;
  items: Dimension[];
}) {
  return (
    <section className="bg-cube-neutral py-20 md:py-28" id="dimensions">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-center font-[family-name:var(--font-assistant)] text-xs font-bold uppercase tracking-[0.24em] text-cube-gold">
          {subtitle}
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-balance text-center text-3xl font-extrabold leading-tight text-cube-navy md:text-4xl">
          {title}
        </h2>

        <div className="mt-7 flex flex-col items-center gap-3">
          <Image
            src={brand.logos.cube}
            alt=""
            width={72}
            height={72}
            className="h-[72px] w-[72px]"
            unoptimized
            aria-hidden
          />
          <p className="max-w-md text-center text-sm leading-relaxed text-cube-body">
            {frameworkLine}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group rounded-sm border border-cube-navy/10 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="text-sm font-semibold text-cube-gold">{item.number}</span>
              <h3 className="mt-2 text-xl font-bold text-cube-navy group-hover:text-cube-sapphire">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cube-body">{item.description}</p>
              {item.insuranceArm && (
                <p className="mt-2 text-xs text-cube-body/70">בר חיים ביטוחים</p>
              )}
            </Link>
          ))}
        </div>

        <p className="mt-12 text-center text-lg font-medium text-cube-navy">{closing}</p>
      </div>
    </section>
  );
}
