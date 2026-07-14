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
    ? "text-[11px] tracking-[0.1em] sm:text-[14px] sm:tracking-[0.14em] md:text-[16px]"
    : "text-[12px] tracking-[0.1em] sm:text-[16px] sm:tracking-[0.14em] md:text-[18px] md:tracking-[0.16em] lg:text-[20px]";

export function BrandLockup({
  variant = "icon-wordmark",
  compact = false,
  className = "",
}: BrandLockupProps) {
  const wordmark = wordmarkClass(compact);
  const iconClass = compact
    ? "h-11 w-11 sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]"
    : "h-12 w-12 sm:h-[4.75rem] sm:w-[4.75rem] md:h-24 md:w-24 lg:h-[6.5rem] lg:w-[6.5rem]";

  const iconEl = (
    <span className="flex shrink-0 items-center justify-center self-center">
      <Image
        src={brand.logos.icon2x}
        alt=""
        width={256}
        height={256}
        className={`object-contain transition-transform duration-300 group-hover:scale-[1.03] ${iconClass}`}
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
        <Image
          src={brand.logos.full}
          alt={brand.wordmark}
          width={435}
          height={512}
          className="h-36 w-auto object-contain sm:h-44"
          priority
          unoptimized
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`group flex min-w-0 max-w-full items-center gap-2 sm:gap-3 md:gap-4 ${className}`}
      aria-label={`${brand.name} — דף הבית`}
    >
      {iconEl}
      <p
        className={`flex min-w-0 flex-col items-start justify-center leading-[1.05] text-cube-navy ${wordmark}`}
      >
        <span className="block whitespace-nowrap font-[family-name:var(--font-assistant)] font-extrabold">
          CUBE
        </span>
        <span className="mt-0.5 block whitespace-nowrap font-[family-name:var(--font-assistant)] font-medium tracking-[0.12em] text-cube-gold sm:tracking-[0.2em]">
          FINANCIAL GROUP
        </span>
      </p>
    </Link>
  );
}
