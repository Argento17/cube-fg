import Image from "next/image";
import Link from "next/link";
import { brand, type HeaderBrandVariant } from "@/config/brand";

type BrandLockupProps = {
  variant?: HeaderBrandVariant;
  compact?: boolean;
  className?: string;
};

const wordmarkClass = (compact: boolean) =>
  compact
    ? "text-[12px] tracking-[0.14em] sm:text-[13px] sm:tracking-[0.15em] md:text-[15px]"
    : "text-[13px] tracking-[0.15em] sm:text-[15px] sm:tracking-[0.17em] md:text-[18px] md:tracking-[0.18em] lg:text-[19px]";

export function BrandLockup({
  variant = "icon-wordmark",
  compact = false,
  className = "",
}: BrandLockupProps) {
  const wordmark = wordmarkClass(compact);
  const iconClass = compact
    ? "h-11 w-11 sm:h-[52px] sm:w-[52px] md:h-[60px] md:w-[60px]"
    : "h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20";

  const iconEl = (
    <span className="flex shrink-0 items-center justify-center self-center">
      <Image
        src={brand.logos.cube}
        alt=""
        width={80}
        height={80}
        className={`object-contain transition-transform duration-300 group-hover:scale-[1.02] ${iconClass}`}
        priority
        unoptimized
        aria-hidden
      />
    </span>
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
          className={`max-w-[180px] font-[family-name:var(--font-assistant)] font-bold leading-snug text-cube-navy ${wordmark}`}
        >
          {brand.wordmark}
        </p>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`group flex min-w-0 items-center gap-2 sm:gap-2.5 md:gap-3.5 ${className}`}
      aria-label={`${brand.name} — דף הבית`}
    >
      {iconEl}
      <p
        className={`flex min-w-0 flex-col items-center justify-center text-center font-[family-name:var(--font-assistant)] leading-[1.1] text-cube-navy ${wordmark}`}
      >
        <span className="block whitespace-nowrap font-extrabold">CUBE</span>
        <span className="mt-0.5 block whitespace-nowrap font-normal">
          FINANCIAL GROUP
        </span>
      </p>
    </Link>
  );
}
