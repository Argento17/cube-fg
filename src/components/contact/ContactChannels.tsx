import Link from "next/link";
import type { ReactNode } from "react";

type ChannelIcon = "phone" | "email" | "address" | "whatsapp";

function ChannelIconMark({ type }: { type: ChannelIcon }) {
  const base = "h-6 w-6";

  const icons: Record<ChannelIcon, ReactNode> = {
    phone: (
      <svg className={base} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.1 21 3 13.9 3 5c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
          fill="currentColor"
        />
      </svg>
    ),
    email: (
      <svg className={base} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M4 7l8 6 8-6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    address: (
      <svg className={base} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
    whatsapp: (
      <svg className={base} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.004 2C6.477 2 2 6.145 2 11.243c0 2.016.654 3.88 1.77 5.41L2 22l5.563-1.73a9.86 9.86 0 004.441 1.06h.005c5.527 0 10.004-4.145 10.004-9.243C22.008 6.145 17.531 2 12.004 2zm0 16.9h-.004a8.1 8.1 0 01-4.12-1.13l-.295-.175-3.3 1.025 1.08-3.21-.193-.31a8.07 8.07 0 01-1.24-4.3C3.932 7.35 7.57 4.1 12.004 4.1c4.434 0 8.072 3.25 8.072 7.25s-3.638 7.25-8.072 7.25z" />
      </svg>
    ),
  };

  return icons[type];
}

function ChannelRow({
  icon,
  label,
  children,
  href,
  external,
  iconClassName = "text-cube-gold",
}: {
  icon: ChannelIcon;
  label: string;
  children: ReactNode;
  href?: string;
  external?: boolean;
  iconClassName?: string;
}) {
  const inner = (
    <>
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cube-navy/10 bg-white shadow-sm transition-colors group-hover:border-cube-gold/40 group-hover:bg-cube-neutral ${iconClassName}`}
      >
        <ChannelIconMark type={icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-bold uppercase tracking-wider text-cube-gold">
          {label}
        </span>
        <span className="mt-1 block text-base font-semibold text-cube-navy group-hover:text-cube-sapphire md:text-lg">
          {children}
        </span>
      </span>
      <span
        className="shrink-0 text-cube-navy/25 transition-transform group-hover:-translate-x-0.5 group-hover:text-cube-gold"
        aria-hidden
      >
        ←
      </span>
    </>
  );

  const className =
    "group flex min-h-[3.25rem] items-center gap-3 rounded-sm border border-transparent p-3 transition-all hover:border-cube-navy/10 hover:bg-cube-neutral/80 sm:gap-4";

  if (!href) {
    return <div className={className}>{inner}</div>;
  }

  if (external) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {inner}
    </a>
  );
}

type ContactChannelsProps = {
  labels: {
    phone: string;
    email: string;
    office: string;
    address: string;
    whatsapp: string;
    whatsappCta: string;
  };
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
};

function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("0")) {
    return `tel:+972${digits.slice(1)}`;
  }
  return `tel:${digits}`;
}

function mapsHref(address: string) {
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
}

export function ContactChannels({
  labels,
  phone,
  email,
  address,
  whatsapp,
}: ContactChannelsProps) {
  return (
    <ul className="space-y-2">
      <li>
        <ChannelRow icon="phone" label={labels.phone} href={telHref(phone)}>
          {phone}
        </ChannelRow>
      </li>
      <li>
        <ChannelRow icon="email" label={labels.email} href={`mailto:${email}`}>
          {email}
        </ChannelRow>
      </li>
      <li>
        <ChannelRow
          icon="address"
          label={labels.office}
          href={mapsHref(address)}
          external
        >
          <span className="block text-sm font-medium text-cube-body/80">{labels.address}</span>
          {address}
        </ChannelRow>
      </li>
      <li>
        <ChannelRow
          icon="whatsapp"
          label={labels.whatsapp}
          href={whatsapp}
          external
          iconClassName="text-[#25D366]"
        >
          {labels.whatsappCta}
        </ChannelRow>
      </li>
    </ul>
  );
}
