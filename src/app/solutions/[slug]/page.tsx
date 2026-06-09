import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionPageTemplate } from "@/components/solutions/SolutionPageTemplate";
import {
  getAllSolutionSlugs,
  getSolutionBySlug,
} from "@/lib/content/loaders";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSolutionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return {
    title: solution.title,
    description: solution.hero.intro,
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();
  return <SolutionPageTemplate solution={solution} />;
}
