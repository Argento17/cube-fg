import { ClientScenarios } from "@/components/home/ClientScenarios";
import { FounderSection } from "@/components/home/FounderSection";
import { HeroVideo } from "@/components/home/HeroVideo";
import { MeetingCtaBand } from "@/components/home/MeetingCtaBand";
import { PartnersCarousel } from "@/components/home/PartnersCarousel";
import { SolutionsShowcase } from "@/components/home/SolutionsShowcase";
import { TrustFramework } from "@/components/home/TrustFramework";
import { getHomepageSection } from "@/lib/content/loaders";

export default function HomePage() {
  const hero = getHomepageSection<{
    headline: string;
    brand: string;
    tagline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    video: { src: string; mobileSrc?: string; poster?: string };
  }>("hero");

  const solutionsShowcase = getHomepageSection<{
    title: string;
    items: {
      id: string;
      title: string;
      description: string;
      href: string;
      cta: string;
    }[];
  }>("solutions-showcase");

  const founder = getHomepageSection("founder");

  const scenarios = getHomepageSection<{
    title: string;
    subtitle: string;
    items: {
      id: string;
      title: string;
      challenge: string;
      approach: string;
      outcome: string;
      link: string;
    }[];
    insurance?: {
      title: string;
      subtitle: string;
      items: {
        id: string;
        title: string;
        challenge: string;
        approach: string;
        outcome: string;
        link: string;
      }[];
    };
  }>("scenarios");

  const trust = getHomepageSection<{
    eyebrow: string;
    intro: string;
    pillars: { number: string; title: string; description: string }[];
  }>("trust");

  const partners = getHomepageSection<{
    title: string;
    partners: { id: string; name: string; logo: string }[];
  }>("partners");

  const meetingCta = getHomepageSection<{
    headline: string;
    subtext: string;
    cta: { label: string; href: string };
  }>("meeting-cta");

  return (
    <>
      <HeroVideo content={hero} />
      <SolutionsShowcase
        title={solutionsShowcase.title}
        items={solutionsShowcase.items}
      />
      <FounderSection content={founder as Parameters<typeof FounderSection>[0]["content"]} />
      <ClientScenarios
        title={scenarios.title}
        subtitle={scenarios.subtitle}
        items={scenarios.items}
        insurance={scenarios.insurance}
      />
      <TrustFramework
        eyebrow={trust.eyebrow}
        intro={trust.intro}
        pillars={trust.pillars}
      />
      <PartnersCarousel
        title={partners.title}
        partners={partners.partners}
      />
      <MeetingCtaBand
        headline={meetingCta.headline}
        subtext={meetingCta.subtext}
        cta={meetingCta.cta}
      />
    </>
  );
}
