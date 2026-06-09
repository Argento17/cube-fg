import Image from "next/image";
import Link from "next/link";
import { brand } from "@/config/brand";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
  closing,
  items,
}: {
  title: string;
  subtitle: string;
  closing: string;
  items: Dimension[];
}) {
  return (
    <section className="bg-cube-neutral py-20 md:py-28" id="dimensions">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="relative mx-auto mb-12 flex justify-center">
          <div className="relative h-24 w-24 md:h-28 md:w-28">
            <Image
              src={brand.logos.icon}
              alt=""
              width={112}
              height={112}
              className="h-full w-full object-contain"
              unoptimized
              aria-hidden
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
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
