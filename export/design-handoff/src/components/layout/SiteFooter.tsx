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
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src={brand.logos.horizontal}
              alt={brand.name}
              width={180}
              height={48}
              className="mb-4 h-10 w-auto brightness-0 invert"
              unoptimized
            />
            <p className="text-sm text-white/75">{brand.tagline}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-cube-gold">פתרונות</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/solutions#pension" className="hover:text-white">מוצרים פנסיוניים</Link></li>
              <li><Link href="/solutions#financial" className="hover:text-white">מוצרים פיננסיים</Link></li>
              <li><Link href="/solutions#retirement" className="hover:text-white">גיל שלישי ופרישה</Link></li>
              <li><Link href="/solutions#insurance" className="hover:text-white">ביטוח</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-cube-gold">החברה</h3>
            <ul className="space-y-2 text-sm text-white/80">
              {company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-cube-gold">יצירת קשר</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a></li>
              <li><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
              <li><a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
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
