"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { Button } from "@/components/ui/Button";
import type { NavItem } from "@/lib/content/types";

type SiteHeaderProps = {
  nav: NavItem[];
  cta: { label: string; href: string };
};

const CONTACT_HREF = "/contact";

const navLinkClass =
  "font-[family-name:var(--font-assistant)] text-[15px] font-semibold tracking-wide text-cube-navy transition-colors hover:text-cube-sapphire md:text-base";

function NavItems({
  items,
  onNavigate,
  className,
}: {
  items: NavItem[];
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <>
      {items.map((item) =>
        item.children ? (
          <div key={item.href} className={`group relative ${className ?? ""}`}>
            <Link href={item.href} className={navLinkClass} onClick={onNavigate}>
              {item.label}
              <span className="ms-0.5 text-cube-navy/50" aria-hidden>
                ▾
              </span>
            </Link>
            <div className="invisible absolute start-0 top-full z-50 mt-1 min-w-[240px] rounded-sm border border-cube-navy/10 bg-white py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-4 py-2.5 font-[family-name:var(--font-assistant)] text-[15px] font-semibold text-cube-body hover:bg-cube-neutral hover:text-cube-navy"
                  onClick={onNavigate}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className={className ?? navLinkClass}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        ),
      )}
    </>
  );
}

export function SiteHeader({ nav, cta }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const mainNav = nav.filter((item) => item.href !== CONTACT_HREF);
  const contactItem = nav.find((item) => item.href === CONTACT_HREF);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-cube-navy/15 bg-cube-neutral/98 py-2 shadow-sm backdrop-blur-md"
          : "border-cube-navy/10 bg-cube-neutral/95 py-2.5 backdrop-blur-md sm:py-3 md:py-4"
      } relative`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 sm:gap-4 md:gap-6 md:px-6">
        <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
          {contactItem && (
            <Link
              href={contactItem.href}
              className="hidden font-[family-name:var(--font-assistant)] text-[15px] font-semibold text-cube-navy/90 transition-colors hover:text-cube-navy md:inline-block md:text-base"
            >
              {contactItem.label}
            </Link>
          )}
          <Button
            href={cta.href}
            variant="outlineGold"
            className="hidden font-[family-name:var(--font-assistant)] text-[15px] font-bold tracking-wide sm:inline-flex md:text-base"
          >
            {cta.label}
          </Button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-sm border border-cube-navy/20 lg:hidden"
            aria-expanded={open}
            aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
            onClick={() => setOpen(!open)}
          >
            <svg
              className="h-5 w-5 text-cube-navy"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <nav
          className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-8"
          aria-label="ניווט ראשי"
        >
          <NavItems items={mainNav} />
        </nav>

        <div className="ms-auto min-w-0 shrink lg:min-w-[280px] xl:min-w-[320px]">
          <BrandLockup
            variant="icon-wordmark"
            compact={scrolled}
            className="hidden sm:flex"
          />
          <BrandLockup variant="icon-only" compact className="sm:hidden" />
        </div>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-cube-navy/10 bg-white lg:hidden">
          <div className="border-b border-cube-navy/5 bg-cube-neutral/50 px-4 py-5">
            <BrandLockup variant="icon-wordmark" compact={false} />
          </div>
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="ניווט נייד">
            {nav.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block min-h-11 py-2.5 font-[family-name:var(--font-assistant)] text-base font-semibold text-cube-navy"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block min-h-10 py-2 pe-4 font-[family-name:var(--font-assistant)] text-[15px] font-medium text-cube-body"
                    onClick={() => setOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-3 border-t border-cube-navy/10 pt-4">
              <Button href={cta.href} variant="outlineGold" className="w-full">
                {cta.label}
              </Button>
              {contactItem && (
                <Button href={contactItem.href} variant="secondary" className="w-full">
                  {contactItem.label}
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
