import fs from "fs";
import path from "path";
import type { Solution, SolutionCategory } from "./types";

const contentDir = path.join(process.cwd(), "content");

function readJson<T>(relativePath: string): T {
  const filePath = path.join(contentDir, relativePath);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function getSite() {
  return readJson<{
    name: string;
    tagline: string;
    insuranceArm: string;
    seo: { defaultTitle: string; defaultDescription: string };
    contact: {
      phone: string;
      email: string;
      whatsapp: string;
      address: string;
      mapEmbed: string;
    };
  }>("site.json");
}

export function getNavigation() {
  return readJson<{
    main: import("./types").NavItem[];
    cta: { label: string; href: string };
    footer: {
      company: { label: string; href: string }[];
      legal: { label: string; href: string }[];
      insuranceNote: string;
    };
  }>("navigation.json");
}

export function getHomepageSection<T>(name: string): T {
  return readJson<T>(`homepage/${name}.json`);
}

export function getMeetingContent() {
  return readJson<Record<string, unknown>>("meeting.json");
}

export function getContactContent() {
  return readJson<Record<string, unknown>>("contact.json");
}

export function getAboutContent() {
  return readJson<Record<string, unknown>>("about.json");
}

export function getProcessPageContent() {
  return readJson<Record<string, unknown>>("process-page.json");
}

export function getSolutionsData() {
  return readJson<{
    pageTitle: string;
    intro: string;
    categories: SolutionCategory[];
    solutions: Solution[];
  }>("solutions.json");
}

export function getAllSolutionSlugs(): string[] {
  return getSolutionsData().solutions.map((s) => s.slug);
}

export function getSolutionBySlug(slug: string): Solution | undefined {
  return getSolutionsData().solutions.find((s) => s.slug === slug);
}

export function getCategoryById(id: string): SolutionCategory | undefined {
  return getSolutionsData().categories.find((c) => c.id === id);
}
