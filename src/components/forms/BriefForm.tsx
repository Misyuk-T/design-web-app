"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Locale } from "@/lib/locale-shared";

type BriefFormProps = {
  locale: Locale;
  recipient: string;
  initialService?: string;
  initialBrief?: string;
};

const COPY = {
  uk: {
    fields: {
      name: "Ім’я та прізвище",
      email: "Email",
      clientType: "Хто ви",
      service: "Потрібна послуга",
      location: "Локація проєкту",
      stage: "Поточна стадія",
      area: "Орієнтовна площа",
      budget: "Бюджетний діапазон",
      start: "Бажаний старт",
      brief: "Коротко про задачу",
      consent:
        "Погоджуюсь передати ці дані через власну поштову програму для відповіді на запит.",
    },
    placeholders: {
      name: "Ваше ім’я",
      email: "name@company.com",
      location: "Місто, країна",
      area: "Наприклад, 180 м²",
      start: "Наприклад, осінь 2026",
      brief:
        "Що потрібно зробити, що вже є та яке рішення має з’явитися після першого етапу?",
    },
    options: {
      choose: "Оберіть варіант",
      clientTypes: [
        "Приватний клієнт",
        "Девелопер / hospitality",
        "Архітектурна або дизайн-студія",
        "Підрядник / виробник",
      ],
      services: [
        "Архітектура",
        "Інтер’єр",
        "3D-візуалізація",
        "Документація",
        "3D-друк / прототип",
        "Ще не визначено",
      ],
      stages: [
        "Ділянка або перша ідея",
        "Є план / обміри",
        "Є концепція",
        "Є 3D-модель",
        "Потрібна документація",
        "Проєкт уже в реалізації",
      ],
      budgets: [
        "Ще визначається",
        "До €25k",
        "€25k–€75k",
        "€75k–€200k",
        "€200k+",
      ],
    },
    submit: "Сформувати лист",
    submitting: "Відкриваємо пошту…",
    note:
      "Після натискання відкриється ваш поштовий клієнт із готовим структурованим листом.",
    subject: "Новий проєктний бриф",
  },
  en: {
    fields: {
      name: "Full name",
      email: "Email",
      clientType: "You are",
      service: "Service needed",
      location: "Project location",
      stage: "Current stage",
      area: "Approximate area",
      budget: "Budget range",
      start: "Preferred start",
      brief: "Briefly describe the task",
      consent:
        "I agree to pass this information through my own email application for a response to this enquiry.",
    },
    placeholders: {
      name: "Your name",
      email: "name@company.com",
      location: "City, country",
      area: "For example, 180 m²",
      start: "For example, autumn 2026",
      brief:
        "What needs to be done, what already exists, and what decision should the first stage produce?",
    },
    options: {
      choose: "Choose an option",
      clientTypes: [
        "Private client",
        "Developer / hospitality",
        "Architecture or design studio",
        "Contractor / maker",
      ],
      services: [
        "Architecture",
        "Interiors",
        "3D visualization",
        "Documentation",
        "3D printing / prototype",
        "Not yet defined",
      ],
      stages: [
        "Site or first idea",
        "Plan / survey available",
        "Concept available",
        "3D model available",
        "Documentation needed",
        "Already in delivery",
      ],
      budgets: [
        "Still being defined",
        "Under €25k",
        "€25k–€75k",
        "€75k–€200k",
        "€200k+",
      ],
    },
    submit: "Prepare email",
    submitting: "Opening email…",
    note:
      "Your email application will open with a prepared, structured message.",
    subject: "New project brief",
  },
} as const;

const inputClass =
  "mt-3 min-h-12 w-full rounded-frame border border-rule bg-transparent px-4 py-3 text-base text-ink outline-none transition-colors focus:border-clay";
const labelClass =
  "text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-stone";

export function BriefForm({
  locale,
  recipient,
  initialService,
  initialBrief,
}: BriefFormProps) {
  const copy = COPY[locale];
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const lines = Array.from(data.entries())
      .filter(([key]) => key !== "consent")
      .map(([key, value]) => `${key}: ${String(value)}`);

    window.dispatchEvent(
      new CustomEvent("studio:analytics", {
        detail: {
          event: "contact_submit",
          service: data.get(copy.fields.service),
          clientType: data.get(copy.fields.clientType),
        },
      }),
    );

    setSubmitting(true);
    const subject = encodeURIComponent(
      `${copy.subject} — ${String(data.get(copy.fields.name) ?? "")}`,
    );
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    window.setTimeout(() => setSubmitting(false), 1200);
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-rule pt-8">
      <div className="grid grid-cols-1 gap-x-7 gap-y-8 sm:grid-cols-2">
        <label className={labelClass}>
          {copy.fields.name}
          <input
            required
            name={copy.fields.name}
            autoComplete="name"
            placeholder={copy.placeholders.name}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          {copy.fields.email}
          <input
            required
            type="email"
            name={copy.fields.email}
            autoComplete="email"
            placeholder={copy.placeholders.email}
            className={inputClass}
          />
        </label>
        <SelectField
          label={copy.fields.clientType}
          options={copy.options.clientTypes}
          choose={copy.options.choose}
        />
        <SelectField
          label={copy.fields.service}
          options={copy.options.services}
          choose={copy.options.choose}
          initialValue={initialService}
        />
        <label className={labelClass}>
          {copy.fields.location}
          <input
            required
            name={copy.fields.location}
            autoComplete="country-name"
            placeholder={copy.placeholders.location}
            className={inputClass}
          />
        </label>
        <SelectField
          label={copy.fields.stage}
          options={copy.options.stages}
          choose={copy.options.choose}
        />
        <label className={labelClass}>
          {copy.fields.area}
          <input
            name={copy.fields.area}
            placeholder={copy.placeholders.area}
            className={inputClass}
          />
        </label>
        <SelectField
          label={copy.fields.budget}
          options={copy.options.budgets}
          choose={copy.options.choose}
        />
        <label className={`${labelClass} sm:col-span-2`}>
          {copy.fields.start}
          <input
            name={copy.fields.start}
            placeholder={copy.placeholders.start}
            className={inputClass}
          />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          {copy.fields.brief}
          <textarea
            required
            name={copy.fields.brief}
            rows={7}
            placeholder={copy.placeholders.brief}
            defaultValue={initialBrief}
            className={inputClass}
          />
        </label>
      </div>

      <label className="mt-7 flex items-start gap-3 text-sm leading-6 text-stone">
        <input
          required
          type="checkbox"
          name="consent"
          className="mt-1 h-4 w-4 accent-clay"
        />
        {copy.fields.consent}
      </label>

      <div className="mt-9 flex flex-col gap-4 border-t border-rule pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[48ch] text-sm leading-6 text-stone">{copy.note}</p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-4 rounded-frame bg-ink px-6 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-bone transition-colors hover:bg-clay disabled:cursor-wait disabled:opacity-60"
        >
          {submitting ? copy.submitting : copy.submit}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}

function SelectField({
  label,
  options,
  choose,
  initialValue,
}: {
  label: string;
  options: readonly string[];
  choose: string;
  initialValue?: string;
}) {
  const defaultValue =
    initialValue && options.includes(initialValue) ? initialValue : "";
  return (
    <label className={labelClass}>
      {label}
      <select
        required
        name={label}
        defaultValue={defaultValue}
        className={inputClass}
      >
        <option value="" disabled>
          {choose}
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export default BriefForm;
