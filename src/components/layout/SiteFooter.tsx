import Image from "next/image";
import Link from "next/link";
import { brand } from "@/config/brand";
import { getSite } from "@/lib/content/loaders";

type FooterProps = {
  company: { label: string; href: string }[];
  legal: { label: string; href: string }[];
  insuranceNote: string;
};

export function SiteFooter({ company, legal, insuranceNote }: FooterProps) {
  const site = getSite();

  return (
    <footer className="border-t border-cube-navy/10 bg-cube-navy text-white">
      <div className="relative overflow-hidden border-b border-white/10 px-4 py-10 text-center sm:py-14 md:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(120,150,210,.18), transparent 62%)",
          }}
        />
        <Image
          src={brand.logos.cube}
          alt=""
          width={88}
          height={88}
          className="relative mx-auto mb-4 h-16 w-16 sm:mb-5 sm:h-[88px] sm:w-[88px]"
          unoptimized
          aria-hidden
        />
        <p className="relative font-[family-name:var(--font-assistant)] text-lg tracking-[0.12em] sm:text-2xl sm:tracking-[0.18em]">
          <span className="font-bold">CUBE</span>{" "}
          <span className="font-light text-white/75">FINANCIAL GROUP</span>
        </p>
        <p className="relative mt-2 text-base font-medium text-cube-gold sm:mt-3 sm:text-lg">
          {brand.tagline}
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 md:px-6">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-cube-gold">פתרונות</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/solutions#pension" className="hover:text-white">
                  מוצרים פנסיוניים
                </Link>
              </li>
              <li>
                <Link href="/solutions#financial" className="hover:text-white">
                  מוצרים פיננסיים
                </Link>
              </li>
              <li>
                <Link href="/solutions#retirement" className="hover:text-white">
                  גיל שלישי ופרישה
                </Link>
              </li>
              <li>
                <Link href="/solutions#insurance" className="hover:text-white">
                  ביטוח
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-cube-gold">החברה</h3>
            <ul className="space-y-2 text-sm text-white/80">
              {company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-cube-gold">יצירת קשר</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="font-medium text-white">{site.contact.name}</li>
              <li>
                <a href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`}>
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </li>
              <li>
                <a
                  href={site.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>{site.contact.address}</li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/60">
          {insuranceNote}
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-xs text-white/50">
          {legal.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-white/80">
              {link.label}
            </Link>
          ))}
          <span>© {new Date().getFullYear()} Cube Financial Group</span>
        </div>
      </div>
    </footer>
  );
}
