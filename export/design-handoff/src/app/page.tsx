import { ClientScenarios } from "@/components/home/ClientScenarios";
import { FourDimensions } from "@/components/home/FourDimensions";
import { FounderSection } from "@/components/home/FounderSection";
import { HeroVideo } from "@/components/home/HeroVideo";
import { MeetingCtaBand } from "@/components/home/MeetingCtaBand";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TrustFramework } from "@/components/home/TrustFramework";
import { getHomepageSection } from "@/lib/content/loaders";

export default function HomePage() {
  const hero = getHomepageSection<{
    headline: string;
    brand: string;
    tagline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    video: { src: string; poster: string };
  }>("hero");

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

  const dimensions = getHomepageSection<{
    title: string;
    subtitle: string;
    closing: string;
    items: {
      id: string;
      number: string;
      title: string;
      description: string;
      href: string;
      insuranceArm?: boolean;
    }[];
  }>("dimensions");

  const trust = getHomepageSection<{
    eyebrow: string;
    intro: string;
    pillars: { number: string; title: string; description: string }[];
    processLink: { label: string; href: string };
  }>("trust");

  const process = getHomepageSection<{
    title: string;
    subtitle: string;
    steps: { number: string; title: string }[];
    link: { label: string; href: string };
  }>("process");

  const meetingCta = getHomepageSection<{
    headline: string;
    subtext: string;
    cta: { label: string; href: string };
  }>("meeting-cta");

  return (
    <>
      <HeroVideo content={hero} />
      <FounderSection content={founder as Parameters<typeof FounderSection>[0]["content"]} />
      <ClientScenarios
        title={scenarios.title}
        subtitle={scenarios.subtitle}
        items={scenarios.items}
        insurance={scenarios.insurance}
      />
      <FourDimensions
        title={dimensions.title}
        subtitle={dimensions.subtitle}
        closing={dimensions.closing}
        items={dimensions.items}
      />
      <TrustFramework
        eyebrow={trust.eyebrow}
        intro={trust.intro}
        pillars={trust.pillars}
        processLink={trust.processLink}
      />
      <ProcessSection
        title={process.title}
        subtitle={process.subtitle}
        steps={process.steps}
        link={process.link}
      />
      <MeetingCtaBand
        headline={meetingCta.headline}
        subtext={meetingCta.subtext}
        cta={meetingCta.cta}
      />
    </>
  );
}
