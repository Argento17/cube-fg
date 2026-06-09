"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Labels = {
  name: string;
  phone: string;
  email: string;
  message: string;
  submit: string;
};

const inputClass =
  "w-full rounded-sm border border-cube-navy/20 bg-white px-3 py-2.5 text-cube-navy focus:border-cube-gold focus:outline-none focus:ring-1 focus:ring-cube-gold";

export function ContactForm({ labels }: { labels: Labels }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return <p className="text-lg text-cube-navy">תודה — ההודעה נשלחה.</p>;
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div>
        <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-cube-navy">
          {labels.name}
        </label>
        <input id="contact-name" required name="name" className={inputClass} />
      </div>
      <div>
        <label htmlFor="contact-phone" className="mb-1 block text-sm font-medium text-cube-navy">
          {labels.phone}
        </label>
        <input id="contact-phone" required type="tel" name="phone" className={inputClass} />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-cube-navy">
          {labels.email}
        </label>
        <input id="contact-email" required type="email" name="email" className={inputClass} />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-cube-navy">
          {labels.message}
        </label>
        <textarea id="contact-message" rows={4} name="message" className={inputClass} />
      </div>
      <Button type="submit" variant="primary" className="w-full">
        {labels.submit}
      </Button>
    </form>
  );
}
