import Image from "next/image";
import Link from "next/link";
import { brand, type HeaderBrandVariant } from "@/config/brand";

type BrandLockupProps = {
  variant?: HeaderBrandVariant;
  compact?: boolean;
  className?: string;
};

const iconSize = (compact: boolean) => (compact ? 72 : 96);

const wordmarkClass = (compact: boolean) =>
  compact
    ? "text-[12px] tracking-[0.14em] md:text-[13px]"
    : "text-[13px] tracking-[0.15em] sm:text-[14px] md:text-[15px] md:tracking-[0.17em]";

export function BrandLockup({
  variant = "icon-wordmark",
  compact = false,
  className = "",
}: BrandLockupProps) {
  const size = iconSize(compact);
  const wordmark = wordmarkClass(compact);

  const iconEl = (
    <Image
      src={brand.logos.icon}
      srcSet={`${brand.logos.icon} 1x, ${brand.logos.icon2x} 2x`}
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      className={`shrink-0 object-contain transition-transform duration-300 group-hover:scale-[1.02] ${
        compact ? "h-[72px] w-[72px]" : "h-[88px] w-[88px] sm:h-[96px] sm:w-[96px]"
      }`}
      priority
      unoptimized
      aria-hidden
    />
  );

  if (variant === "icon-only") {
    return (
      <Link
        href="/"
        className={`group inline-flex shrink-0 ${className}`}
        aria-label={`${brand.name} — דף הבית`}
      >
        {iconEl}
        <span className="sr-only">{brand.wordmark}</span>
      </Link>
    );
  }

  if (variant === "stacked") {
    return (
      <Link
        href="/"
        className={`group flex shrink-0 flex-col items-center gap-2 text-center ${className}`}
        aria-label={`${brand.name} — דף הבית`}
      >
        {iconEl}
        <p
          className={`max-w-[160px] font-[family-name:var(--font-assistant)] font-bold leading-snug text-cube-navy ${wordmark}`}
        >
          {brand.wordmark}
        </p>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`group flex min-w-0 items-center gap-3 md:gap-4 ${className}`}
      aria-label={`${brand.name} — דף הבית`}
    >
      {iconEl}
      <p
        className={`min-w-0 font-[family-name:var(--font-assistant)] font-bold leading-tight text-cube-navy ${wordmark}`}
      >
        <span className="block whitespace-nowrap">CUBE</span>
        <span className="mt-0.5 block whitespace-nowrap font-semibold opacity-95">
          FINANCIAL GROUP
        </span>
      </p>
    </Link>
  );
}
