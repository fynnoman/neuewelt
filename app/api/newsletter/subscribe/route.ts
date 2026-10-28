import { NextResponse } from "next/server";
import {
  resend,
  NEWSLETTER_FROM,
  RESEND_AUDIENCE_ID,
} from "@/lib/email/resend";
import { welcomeEmail } from "@/lib/email/templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email: unknown }).email ?? "").trim().toLowerCase()
      : "";

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 }
    );
  }

  // 1) Kontakt zur Resend-Audience hinzufügen (idempotent – vorhandene Kontakte sind kein Fehler)
  if (RESEND_AUDIENCE_ID) {
    try {
      await resend.contacts.create({
        email,
        audienceId: RESEND_AUDIENCE_ID,
        unsubscribed: false,
      });
    } catch (err) {
      // Resend wirft nicht zuverlässig bei Duplicate – wir ignorieren Fehler und senden Welcome trotzdem.
      console.warn("[newsletter] contacts.create warning:", err);
    }
  }

  // 2) Welcome-Mail
  const { subject, html, text } = welcomeEmail({ to: email });

  try {
    const result = await resend.emails.send({
      from: NEWSLETTER_FROM,
      to: email,
      subject,
      html,
      text,
    });

    if ((result as { error?: unknown }).error) {
      console.error("[newsletter] welcome send error:", (result as { error: unknown }).error);
      return NextResponse.json(
        { ok: false, error: "send_failed" },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[newsletter] welcome send threw:", err);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
