import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  // Nicht sofort werfen, damit Build nicht bricht. Routen werfen bei Request.
  console.warn("[newsletter] RESEND_API_KEY ist nicht gesetzt");
}

export const resend = new Resend(apiKey ?? "missing-key");

export const NEWSLETTER_FROM =
  process.env.NEWSLETTER_FROM_EMAIL ||
  "Neue Welt Automobile <newsletter@neue-welt-automobile.de>";

export const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || "";

export const NEWSLETTER_NOTIFY_TOKEN = process.env.NEWSLETTER_NOTIFY_TOKEN || "";

export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL || "https://neue-welt-automobile.de";
