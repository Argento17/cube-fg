export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type Solution = {
  slug: string;
  categoryId: string;
  title: string;
  meetingSubject: string;
  hero: { intro: string };
  whatIs: string;
  whoIsItFor: string[];
  benefits: string[];
  faq: { q: string; a: string }[];
  insuranceNote?: boolean;
  canonical?: boolean;
};

export type SolutionCategory = {
  id: string;
  title: string;
  description: string;
  insuranceArm?: boolean;
};
