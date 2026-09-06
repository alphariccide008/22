"use client";

import { useState } from "react";
import { ArrowIcon, CheckIcon } from "./ui";

const products = [
  "Multilingual Live Streaming",
  "On-site AI plan",
  "Multilingual Simulive Streaming",
  "Multilingual Live Webinar",
  "Live Streaming — single language",
  "Live Webinar — single language",
  "Simulive Streaming — single language",
  "SabioCast Learning",
];

const sources = ["Search engine", "Recommended", "Google Ads", "Social media", "Email", "Other"];

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink-800">{label}</span>
      {hint && <span className="mt-0.5 block text-xs text-ink-400">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

export function ContactForm({ defaultIntent }: { defaultIntent?: string }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white">
          <CheckIcon />
        </div>
        <h3 className="mt-4 text-lg font-bold text-ink-900">Thanks — we&apos;ve got it</h3>
        <p className="mt-2 text-sm text-ink-600">
          A member of the SabioCast team will reply to your business email within
          one working day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-5 rounded-2xl border border-ink-100 bg-white p-6 sm:p-8"
    >
      {defaultIntent === "quote" && (
        <p className="rounded-lg bg-accent-50 px-3 py-2 text-xs font-medium text-accent-700">
          You&apos;re requesting a quote. Tell us about your event and expected
          audience and we&apos;ll size a plan.
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name">
          <input required className={inputCls} autoComplete="name" />
        </Field>
        <Field label="Business email" hint="A business email is required">
          <input required type="email" className={inputCls} autoComplete="email" />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company or organisation" hint="You must represent a company or organisation">
          <input required className={inputCls} autoComplete="organization" />
        </Field>
        <Field label="Company website" hint="Use your real company website">
          <input required type="url" placeholder="https://" className={inputCls} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Country">
          <input required className={inputCls} autoComplete="country-name" />
        </Field>
        <Field label="Product of interest">
          <select required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Select a product
            </option>
            {products.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Your question">
        <textarea required rows={4} className={inputCls} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="How did you hear about us?">
          <select required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Select an option
            </option>
            {sources.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="How did you find us?">
          <input className={inputCls} />
        </Field>
      </div>
      <label className="flex items-start gap-2.5 text-xs text-ink-600">
        <input required type="checkbox" className="mt-0.5 h-4 w-4 rounded border-ink-300 accent-brand-600" />
        <span>
          I agree to the{" "}
          <a href="/legal/privacy" className="font-semibold text-brand-700 underline">
            privacy policy
          </a>{" "}
          and{" "}
          <a href="/legal/terms" className="font-semibold text-brand-700 underline">
            terms of use
          </a>
          .
        </span>
      </label>
      <label className="flex items-start gap-2.5 text-xs text-ink-600">
        <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-ink-300 accent-brand-600" />
        <span>Keep me updated with SabioCast product news (optional).</span>
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
      >
        Send message <ArrowIcon />
      </button>
    </form>
  );
}
