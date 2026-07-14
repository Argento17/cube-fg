import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { getLegalContent } from "@/lib/content/loaders";

const content = getLegalContent("accessibility");

export const metadata: Metadata = {
  title: content.title,
  description: content.seo.description,
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      title={content.title}
      updated={content.updated}
      intro={content.intro}
      sections={content.sections}
    />
  );
}
