import Image from "next/image";
import Link from "next/link";
import { brand, type HeaderBrandVariant } from "@/config/brand";

type BrandLockupProps = {
  variant?: HeaderBrandVariant;
  compact?: boolean;
  className?: string;
};

const iconSize = (compact: boolean) => (compact ? 60 : 80);

const wordmarkClass = (compact: boolean) =>
  compact
    ? "text-[14px] tracking-[0.16em] md:text-[15px]"
    : "text-[15px] tracking-[0.17em] sm:text-[16px] md:text-[18px] md:tracking-[0.18em] lg:text-[19px]";

export function BrandLockup({
  variant = "icon-wordmark",
  compact = false,
  className = "",
}: BrandLockupProps) {
  const size = iconSize(compact);
  const wordmark = wordmarkClass(compact);

  const iconEl = (
    <span className="flex shrink-0 items-center justify-center self-center">
      <Image
        src={brand.logos.cube}
        alt=""
        width={size}
        height={size}
        className={`object-contain transition-transform duration-300 group-hover:scale-[1.02] ${
          compact ? "h-[60px] w-[60px]" : "h-[68px] w-[68px] sm:h-[72px] sm:w-[72px] md:h-20 md:w-20"
        }`}
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
      className={`group flex min-w-0 items-center gap-2.5 md:gap-3.5 ${className}`}
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
