import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "outlineGold";

const variants: Record<Variant, string> = {
  primary:
    "bg-cube-gold text-cube-navy hover:bg-cube-gold/90 border border-cube-gold",
  secondary: "bg-cube-navy text-white hover:bg-cube-navy/90 border border-cube-navy",
  outline:
    "bg-transparent text-white border border-white/80 hover:bg-white/10",
  outlineGold:
    "bg-transparent text-cube-navy border border-cube-gold hover:bg-cube-gold/10",
};

type ButtonProps = {
  href?: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cube-gold";

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
