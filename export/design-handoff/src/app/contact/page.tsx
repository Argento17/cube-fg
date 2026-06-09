import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";
import { getContactContent, getSite } from "@/lib/content/loaders";

const content = getContactContent() as {
  title: string;
  seo: { title: string; description: string };
  intro: string;
  meetingLink: { label: string; href: string };
  form: { name: string; phone: string; email: string; message: string; submit: string };
};

const site = getSite();

export const metadata: Metadata = {
  title: content.title,
  description: (content as { seo?: { description: string } }).seo?.description ?? content.intro,
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-cube-neutral py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h1 className="text-4xl font-bold text-cube-navy">{content.title}</h1>
          <p className="mt-4 text-cube-body">{content.intro}</p>
          <div className="mt-6">
            <Button href={content.meetingLink.href} variant="primary">
              {content.meetingLink.label}
            </Button>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:px-6">
          <div className="space-y-6 text-cube-body">
            <div>
              <h2 className="font-bold text-cube-navy">טלפון</h2>
              <a href={`tel:${site.contact.phone}`} className="hover:text-cube-sapphire">
                {site.contact.phone}
              </a>
            </div>
            <div>
              <h2 className="font-bold text-cube-navy">אימייל</h2>
              <a href={`mailto:${site.contact.email}`} className="hover:text-cube-sapphire">
                {site.contact.email}
              </a>
            </div>
            <div>
              <h2 className="font-bold text-cube-navy">WhatsApp</h2>
              <Link
                href={site.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cube-sapphire"
              >
                שלחו הודעה
              </Link>
            </div>
            <div>
              <h2 className="font-bold text-cube-navy">כתובת</h2>
              <p>{site.contact.address}</p>
            </div>
            <div
              className="flex h-48 items-center justify-center rounded-sm border border-dashed border-cube-navy/20 bg-cube-neutral text-sm text-cube-body/60"
              role="img"
              aria-label="מפת Google — יתעדכן"
            >
              Google Maps — יתעדכן
            </div>
          </div>
          <ContactForm labels={content.form} />
        </div>
      </section>
    </>
  );
}
