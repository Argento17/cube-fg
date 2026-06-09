"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Button } from "@/components/ui/Button";

type MeetingContent = {
  form: {
    name: string;
    phone: string;
    email: string;
    subject: string;
    preferredTime: string;
    notes: string;
    submit: string;
    subjects: { value: string; label: string }[];
    timeOptions: { value: string; label: string }[];
  };
};

function MeetingFormInner({ content }: { content: MeetingContent }) {
  const searchParams = useSearchParams();
  const defaultSubject = searchParams.get("subject") ?? "";
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-sm border border-cube-gold/30 bg-cube-neutral p-8 text-center">
        <p className="text-lg font-semibold text-cube-navy">תודה — הבקשה התקבלה</p>
        <p className="mt-2 text-cube-body">ניצור איתכם קשר בהקדם לתיאום הפגישה.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label={content.form.name} name="name" required />
      <Field label={content.form.phone} name="phone" type="tel" required />
      <Field label={content.form.email} name="email" type="email" required />
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium text-cube-navy">
          {content.form.subject}
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue={defaultSubject}
          className="w-full rounded-sm border border-cube-navy/20 bg-white px-3 py-2.5 text-cube-navy"
        >
          <option value="">בחרו נושא</option>
          {content.form.subjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="time" className="mb-1 block text-sm font-medium text-cube-navy">
          {content.form.preferredTime}
        </label>
        <select
          id="time"
          name="time"
          className="w-full rounded-sm border border-cube-navy/20 bg-white px-3 py-2.5 text-cube-navy"
        >
          <option value="">בחרו מועד</option>
          {content.form.timeOptions.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="notes" className="mb-1 block text-sm font-medium text-cube-navy">
          {content.form.notes}
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className="w-full rounded-sm border border-cube-navy/20 bg-white px-3 py-2.5 text-cube-navy"
        />
      </div>
      <Button type="submit" variant="primary" className="w-full">
        {content.form.submit}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-cube-navy">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-sm border border-cube-navy/20 bg-white px-3 py-2.5 text-cube-navy"
      />
    </div>
  );
}

export function MeetingForm({ content }: { content: MeetingContent }) {
  return (
    <Suspense fallback={<p className="text-cube-body">טוען...</p>}>
      <MeetingFormInner content={content} />
    </Suspense>
  );
}
