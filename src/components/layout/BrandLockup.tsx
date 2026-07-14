import Image from "next/image";
import Link from "next/link";
import { brand, type HeaderBrandVariant } from "@/config/brand";

type BrandLockupProps = {
  variant?: HeaderBrandVariant;
  compact?: boolean;
  className?: string;
};

export function BrandLockup({
  variant = "icon-wordmark",
  compact = false,
  className = "",
}: BrandLockupProps) {
  const iconClass = compact
    ? "h-11 w-11 sm:h-[52px] sm:w-[52px] md:h-[60px] md:w-[60px]"
    : "h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20";

  const lockupClass = compact
    ? "h-12 w-auto sm:h-14 md:h-16"
    : "h-14 w-auto sm:h-16 md:h-[4.5rem]";

  if (variant === "icon-only") {
    return (
      <Link
        href="/"
        className={`group inline-flex shrink-0 ${className}`}
        aria-label={`${brand.name} — דף הבית`}
      >
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
        <span className="sr-only">{brand.wordmark}</span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`group inline-flex shrink-0 items-center ${className}`}
      aria-label={`${brand.name} — דף הבית`}
    >
      <Image
        src={brand.logos.full}
        alt={brand.wordmark}
        width={218}
        height={256}
        className={`object-contain object-center transition-transform duration-300 group-hover:scale-[1.02] ${lockupClass}`}
        priority
        unoptimized
      />
    </Link>
  );
}
