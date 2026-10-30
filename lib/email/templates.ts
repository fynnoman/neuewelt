import { SITE } from "@/lib/site";
import { SITE_ORIGIN } from "@/lib/email/resend";

const PAPER = "#FBFBF9";
const INK = "#0A0B0C";
const INK_SOFT = "#26272A";
const MUTED = "#6D6E72";
const SIGNAL = "#D01A20";
const FOG = "#D4D2CC";

function layout(innerHtml: string, previewText: string) {
  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${SITE.name}</title>
  </head>
  <body style="margin:0;padding:0;background:${PAPER};color:${INK_SOFT};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;visibility:hidden;mso-hide:all;">
      ${previewText}
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:${PAPER};">
            <tr>
              <td style="padding:0 8px 32px 8px;">
                <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${MUTED};font-weight:600;">
                  Neue Welt Automobile
                </div>
              </td>
            </tr>
            ${innerHtml}
            <tr>
              <td style="padding:48px 8px 24px 8px;border-top:1px solid ${FOG};">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:13px;color:${MUTED};line-height:1.6;">
                      <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${MUTED};font-weight:600;margin-bottom:8px;">
                        ${SITE.name}
                      </div>
                      ${SITE.address.line1}<br />
                      ${SITE.address.line2}<br />
                      <a href="tel:${SITE.contact.phoneLandlineHref.replace(
                        "tel:",
                        ""
                      )}" style="color:${INK};text-decoration:none;">${SITE.contact.phoneLandline}</a><br />
                      <a href="mailto:${SITE.contact.email}" style="color:${INK};text-decoration:none;">${SITE.contact.email}</a>
                    </td>
                    <td align="right" style="font-size:12px;color:${MUTED};">
                      <a href="${SITE_ORIGIN}/impressum" style="color:${MUTED};text-decoration:none;">Impressum</a>
                      <br />
                      <a href="${SITE_ORIGIN}/datenschutz" style="color:${MUTED};text-decoration:none;">Datenschutz</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export type AnkaufInquiry = {
  name: string;
  email: string;
  phone?: string;
  plz?: string;
  marke: string;
  modell: string;
  ez?: string;
  km?: string;
  kraftstoff?: string;
  getriebe?: string;
  farbe?: string;
  wunschpreis?: string;
  notes?: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function ankaufInquiryEmail(opts: { inquiry: AnkaufInquiry }) {
  const i = opts.inquiry;
  const subject = `Fahrzeugankauf-Anfrage: ${i.marke} ${i.modell}`.trim();
  const preview = `${i.name} möchte ein Fahrzeug anbieten: ${i.marke} ${i.modell}`;

  const rows: Array<[string, string | undefined]> = [
    ["Name", i.name],
    ["E-Mail", i.email],
    ["Telefon", i.phone],
    ["PLZ · Ort", i.plz],
    ["Marke", i.marke],
    ["Modell · Ausstattung", i.modell],
    ["Erstzulassung", i.ez],
    ["Kilometerstand", i.km],
    ["Kraftstoff", i.kraftstoff],
    ["Getriebe", i.getriebe],
    ["Farbe", i.farbe],
    ["Wunschpreis", i.wunschpreis],
  ];

  const rowsHtml = rows
    .filter(([, v]) => v && v.trim().length > 0)
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid ${FOG};font-size:13px;color:${MUTED};width:38%;vertical-align:top;">${k}</td>
          <td style="padding:10px 0;border-bottom:1px solid ${FOG};font-size:15px;color:${INK};">${escapeHtml(v!)}</td>
        </tr>`
    )
    .join("");

  const notesHtml = i.notes && i.notes.trim().length > 0
    ? `
      <tr>
        <td style="padding:24px 0 8px 0;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${MUTED};font-weight:600;" colspan="2">
          Besonderheiten · Schäden · Historie
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding:0 0 8px 0;font-size:15px;color:${INK};line-height:1.55;white-space:pre-wrap;">${escapeHtml(i.notes!)}</td>
      </tr>`
    : "";

  const html = layout(
    `
    <tr>
      <td style="padding:0 8px;">
        <h1 style="margin:0 0 16px 0;font-size:26px;line-height:1.15;letter-spacing:-0.02em;color:${INK};font-weight:600;">
          Neue Ankauf-Anfrage: <span style="color:${SIGNAL};">${escapeHtml(i.marke)} ${escapeHtml(i.modell)}.</span>
        </h1>
        <p style="margin:0 0 24px 0;font-size:14px;color:${MUTED};">
          Antworten geht direkt an <a href="mailto:${escapeHtml(i.email)}" style="color:${INK};">${escapeHtml(i.email)}</a>.
        </p>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px 0;">
          ${rowsHtml}
          ${notesHtml}
        </table>
      </td>
    </tr>
    `,
    preview
  );

  const textRows = rows
    .filter(([, v]) => v && v.trim().length > 0)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const text = `Neue Ankauf-Anfrage: ${i.marke} ${i.modell}

${textRows}
${i.notes && i.notes.trim().length > 0 ? `\nBesonderheiten · Schäden · Historie:\n${i.notes}\n` : ""}
Antwort direkt an: ${i.email}`;

  return { subject, html, text };
}
