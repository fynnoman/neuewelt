import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  // Nicht sofort werfen, damit Build nicht bricht. Routen werfen bei Request.
  console.warn("[ankauf] RESEND_API_KEY ist nicht gesetzt");
}

export const resend = new Resend(apiKey ?? "missing-key");

// Absender des Ankauf-Benachrichtigungs-Mails.
// Default ist der Resend-Testabsender — funktioniert ohne verifizierte Domain,
// solange ANKAUF_TO die auf dem Resend-Account registrierte E-Mail ist.
// Sobald die eigene Domain in Resend verifiziert ist, einfach die env-Var auf
// z. B. "Neue Welt Automobile <ankauf@neue-welt-automobile.de>" setzen.
export const ANKAUF_FROM =
  process.env.ANKAUF_FROM_EMAIL ||
  "Neue Welt Automobile <onboarding@resend.dev>";

export const ANKAUF_TO =
  process.env.ANKAUF_TO_EMAIL || "info@neue-welt-automobile.de";

export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL || "https://neue-welt-automobile.de";
