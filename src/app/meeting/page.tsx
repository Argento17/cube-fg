import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MeetingForm } from "@/components/meeting/MeetingForm";
import { getMeetingContent } from "@/lib/content/loaders";

const content = getMeetingContent() as {
  title: string;
  subtitle: string;
  form: never;
  advisor: { name: string; title: string; photo: string };
  whatHappensNext: { title: string; steps: string[] };
  trustCopy: string;
  alternateContact: { label: string; href: string };
};

export const metadata: Metadata = {
  title: "תיאום פגישה",
  description: content.subtitle,
};

export default function MeetingPage() {
  return (
    <>
      <section className="bg-cube-neutral py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h1 className="text-3xl font-bold text-cube-navy md:text-4xl">{content.title}</h1>
          <p className="mt-2 text-cube-body">{content.subtitle}</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:px-6">
          <div>
            <MeetingForm content={{ form: content.form }} />
          </div>
          <aside className="rounded-sm border border-cube-navy/10 bg-cube-neutral p-6 md:p-8">
            <div className="relative mb-6 h-28 w-28 overflow-hidden rounded-full border border-cube-navy/15 shadow-sm md:h-32 md:w-32">
              <Image
                src={content.advisor.photo}
                alt={content.advisor.name}
                fill
                className="object-cover object-[center_20%]"
                sizes="128px"
              />
            </div>
            <h2 className="text-lg font-bold text-cube-navy">{content.advisor.name}</h2>
            <p className="text-sm text-cube-sapphire">{content.advisor.title}</p>
            <h3 className="mt-8 font-bold text-cube-navy">{content.whatHappensNext.title}</h3>
            <ol className="mt-4 list-decimal list-inside space-y-2 text-sm text-cube-body">
              {content.whatHappensNext.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-cube-body">{content.trustCopy}</p>
            <p className="mt-4">
              <Link href={content.alternateContact.href} className="text-sm text-cube-sapphire hover:underline">
                {content.alternateContact.label}
              </Link>
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
