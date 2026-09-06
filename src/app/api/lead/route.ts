import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = Record<string, string | undefined>;

const FIELD_LABELS: Record<string, string> = {
  formType: "Form",
  firstName: "First name",
  lastName: "Last name",
  name: "Name",
  email: "Business email",
  company: "Company",
  website: "Website",
  country: "Country",
  product: "Product of interest",
  question: "Question",
  purpose: "Purpose of trial",
  hearAbout: "How did you hear about us",
  findUs: "How did you find us",
  newsletter: "Newsletter opt-in",
};

const ORDER = [
  "formType",
  "name",
  "firstName",
  "lastName",
  "email",
  "company",
  "website",
  "country",
  "product",
  "purpose",
  "question",
  "hearAbout",
  "findUs",
  "newsletter",
];

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields, humans don't.
  if (body.company_url) {
    return NextResponse.json({ ok: true });
  }

  const formType = body.formType === "trial" ? "Trial request" : "Contact enquiry";

  // Minimal validation
  const email = (body.email || "").trim();
  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { ok: false, error: "A valid business email is required." },
      { status: 422 },
    );
  }

  if (!token || !chatId) {
    console.error("Telegram env vars missing (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID)");
    return NextResponse.json(
      { ok: false, error: "The form isn't configured yet. Please email us directly." },
      { status: 500 },
    );
  }

  const lines = [`<b>🔔 SabioCast — ${formType}</b>`, ""];
  for (const key of ORDER) {
    const raw = body[key];
    if (!raw || key === "formType") continue;
    const value = String(raw).trim();
    if (!value) continue;
    lines.push(`<b>${FIELD_LABELS[key] ?? key}:</b> ${escapeHtml(value)}`);
  }
  // any extra keys not in ORDER
  for (const [key, raw] of Object.entries(body)) {
    if (ORDER.includes(key) || key === "company_url" || !raw) continue;
    lines.push(`<b>${FIELD_LABELS[key] ?? key}:</b> ${escapeHtml(String(raw).trim())}`);
  }
  lines.push("", `<i>${new Date().toUTCString()}</i>`);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Telegram sendMessage failed:", res.status, detail);
      return NextResponse.json(
        { ok: false, error: "Couldn't send your message. Please try again or email us." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Telegram request error:", err);
    return NextResponse.json(
      { ok: false, error: "Network error. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
