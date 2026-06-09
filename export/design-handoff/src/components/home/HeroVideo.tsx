import { Button } from "@/components/ui/Button";

type HeroContent = {
  headline: string;
  brand: string;
  tagline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  video: { src: string; poster?: string };
};

/**
 * Hero background video — CSS handles mobile / reduced-motion fallbacks.
 * No JS play/pause gating (that was hiding the video behind a solid overlay).
 */
export function HeroVideo({ content }: { content: HeroContent }) {
  const posterUrl =
    content.video.poster && content.video.poster.length > 0
      ? content.video.poster
      : undefined;

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      <div className="absolute inset-0 bg-cube-navy" aria-hidden>
        {/* Navy fallback: mobile + reduced motion (hidden on desktop when motion OK) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-cube-navy via-cube-sapphire/80 to-cube-navy md:motion-safe:opacity-0"
          aria-hidden
        />

        <video
          className="absolute inset-0 h-full w-full object-cover max-md:hidden motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterUrl}
          aria-hidden
        >
          <source src={content.video.src} type="video/mp4" />
        </video>

        {/* Text readability — video still visible through this */}
        <div
          className="absolute inset-0 bg-gradient-to-l from-cube-navy/90 via-cube-navy/65 to-cube-navy/30"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 md:px-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">
            {content.headline}
          </h1>
          <div className="mt-4 h-0.5 w-16 bg-cube-gold" />
          <p className="mt-6 text-lg font-medium text-white">{content.brand}</p>
          <p className="mt-1 text-base text-white/80">{content.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={content.primaryCta.href} variant="primary">
              {content.primaryCta.label}
            </Button>
            <Button href={content.secondaryCta.href} variant="outline">
              {content.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
