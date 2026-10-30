import { NextResponse } from "next/server";
import { resend, ANKAUF_FROM, ANKAUF_TO } from "@/lib/email/resend";
import { ankaufInquiryEmail, type AnkaufInquiry } from "@/lib/email/templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD = 500;
const MAX_NOTES = 4000;

function str(v: unknown, max = MAX_FIELD): string {
  if (typeof v !== "string") return "";
  const trimmed = v.trim();
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { ok: false, error: "server_not_configured" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;

  const inquiry: AnkaufInquiry = {
    name: str(b.name),
    email: str(b.email).toLowerCase(),
    phone: str(b.phone),
    plz: str(b.plz),
    marke: str(b.marke),
    modell: str(b.modell),
    ez: str(b.ez),
    km: str(b.km),
    kraftstoff: str(b.kraftstoff),
    getriebe: str(b.getriebe),
    farbe: str(b.farbe),
    wunschpreis: str(b.wunschpreis),
    notes: str(b.notes, MAX_NOTES),
  };

  if (!inquiry.name || !inquiry.email || !inquiry.marke || !inquiry.modell) {
    return NextResponse.json(
      { ok: false, error: "missing_fields" },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(inquiry.email) || inquiry.email.length > 254) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 }
    );
  }

  const { subject, html, text } = ankaufInquiryEmail({ inquiry });

  try {
    const result = await resend.emails.send({
      from: ANKAUF_FROM,
      to: ANKAUF_TO,
      replyTo: inquiry.email,
      subject,
      html,
      text,
    });

    const resendError = (result as { error?: { name?: string; message?: string } | null }).error;
    if (resendError) {
      console.error("[ankauf] send error:", resendError);
      return NextResponse.json(
        { ok: false, error: "send_failed" },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[ankauf] send threw:", err);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
