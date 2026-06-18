import type { Metadata } from "next";
import Link from "next/link";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactForm } from "@/components/contact/ContactForm";
import { getContactContent, getSite } from "@/lib/content/loaders";

const content = getContactContent() as {
  title: string;
  seo: { title: string; description: string };
  intro: string;
  meetingLink: { label: string; href: string };
  labels: {
    name: string;
    role: string;
    phone: string;
    email: string;
    office: string;
    address: string;
    whatsapp: string;
    whatsappCta: string;
  };
  form: { name: string; phone: string; email: string; message: string; submit: string };
};

const site = getSite();

export const metadata: Metadata = {
  title: content.title,
  description: content.seo.description,
};

export default function ContactPage() {
  const hasMap = site.contact.mapEmbed.length > 0;

  return (
    <>
      <section className="bg-cube-neutral py-10 sm:py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <h1 className="text-2xl font-extrabold text-cube-navy sm:text-3xl md:text-4xl">
            {content.title}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-cube-body sm:mt-4 sm:text-lg">{content.intro}</p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="mb-8 rounded-sm border border-cube-navy/10 bg-cube-neutral/60 p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-cube-gold">
                  {content.labels.name}
                </p>
                <p className="mt-1 text-2xl font-bold text-cube-navy">{site.contact.name}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-cube-gold">
                  {content.labels.role}
                </p>
                <p className="mt-1 text-base leading-relaxed text-cube-body">{site.contact.role}</p>
              </div>

              <ContactChannels
                labels={content.labels}
                phone={site.contact.phone}
                email={site.contact.email}
                address={site.contact.address}
                whatsapp={site.contact.whatsapp}
              />

              <p className="mt-8 border-t border-cube-navy/10 pt-6 text-sm text-cube-body">
                <Link
                  href={content.meetingLink.href}
                  className="inline-flex items-center gap-2 font-semibold text-cube-sapphire hover:underline"
                >
                  {content.meetingLink.label}
                  <span aria-hidden>←</span>
                </Link>
              </p>
            </div>

            <div className="rounded-sm border border-cube-navy/10 bg-cube-neutral p-5 sm:p-6 md:p-8 lg:col-span-7">
              <ContactForm labels={content.form} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cube-neutral pb-12 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          {hasMap ? (
            <div
              className="overflow-hidden rounded-sm border border-cube-navy/10 shadow-sm"
              dangerouslySetInnerHTML={{ __html: site.contact.mapEmbed }}
            />
          ) : (
            <div className="overflow-hidden rounded-sm border border-cube-navy/10 bg-white shadow-sm">
              <iframe
                title="מפת Google — מיקום המשרד"
                className="h-64 w-full border-0 sm:h-80 md:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(site.contact.address)}&hl=he&z=16&output=embed`}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
