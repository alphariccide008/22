"use client";

import { useState } from "react";
import { ArrowIcon, CheckIcon } from "./ui";

const inputCls =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink-800">{label}</span>
      {hint && <span className="mt-0.5 block text-xs text-ink-400">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export function TrialForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    payload.formType = "trial";

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white">
          <CheckIcon />
        </div>
        <h3 className="mt-4 text-lg font-bold text-ink-900">Request received</h3>
        <p className="mt-2 text-sm text-ink-600">
          Once we&apos;ve reviewed your details we&apos;ll email your trial account
          credentials. The trial is valid for 7 days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-ink-100 bg-white p-6 sm:p-8">
      {/* honeypot */}
      <input type="text" name="company_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name">
          <input name="firstName" required className={inputCls} autoComplete="given-name" />
        </Field>
        <Field label="Last name">
          <input name="lastName" required className={inputCls} autoComplete="family-name" />
        </Field>
      </div>
      <Field label="Business email" hint="No gmail, yahoo or hotmail addresses">
        <input name="email" required type="email" className={inputCls} autoComplete="email" />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company or organisation">
          <input name="company" required className={inputCls} autoComplete="organization" />
        </Field>
        <Field label="Company website" hint="Use your real company website">
          <input name="website" required type="url" placeholder="https://" className={inputCls} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Country">
          <input name="country" required className={inputCls} autoComplete="country-name" />
        </Field>
        <Field label="Product of interest">
          <select name="product" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Select a product
            </option>
            <option>Multilingual Live Streaming</option>
            <option>Multilingual Live Webinar</option>
          </select>
        </Field>
      </div>
      <Field label="Purpose of trial account" hint="Max 60 characters">
        <input name="purpose" required maxLength={60} className={inputCls} />
      </Field>
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

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request trial account"}
        {status !== "sending" && <ArrowIcon />}
      </button>
    </form>
  );
}
