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
  "w-full rounded-sm border border-cube-navy/20 bg-white px-3 py-2.5 text-cube-navy";

export function ContactForm({ labels }: { labels: Labels }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return <p className="text-lg text-cube-navy">תודה — ההודעה נשלחה.</p>;
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <input required name="name" placeholder={labels.name} className={inputClass} />
      <input required type="tel" name="phone" placeholder={labels.phone} className={inputClass} />
      <input required type="email" name="email" placeholder={labels.email} className={inputClass} />
      <textarea rows={4} name="message" placeholder={labels.message} className={inputClass} />
      <Button type="submit" variant="secondary" className="w-full">
        {labels.submit}
      </Button>
    </form>
  );
}
