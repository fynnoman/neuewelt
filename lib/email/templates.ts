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

export function welcomeEmail(opts: { to: string }) {
  const subject = "Willkommen beim Fahrzeug-Newsletter.";
  const preview = "Sie erfahren als Erster, wenn neue Fahrzeuge in unseren Bestand kommen.";
  const html = layout(
    `
    <tr>
      <td style="padding:0 8px;">
        <h1 style="margin:0 0 20px 0;font-size:30px;line-height:1.1;letter-spacing:-0.02em;color:${INK};font-weight:600;">
          Willkommen beim <span style="color:${SIGNAL};">Fahrzeug-Newsletter.</span>
        </h1>
        <p style="margin:0 0 16px 0;font-size:16px;line-height:1.55;color:${INK_SOFT};">
          Vielen Dank, dass Sie unseren Newsletter abonniert haben. Sie erfahren
          als Erster, wenn neue Fahrzeuge in unseren Bestand kommen.
        </p>
        <p style="margin:0 0 32px 0;font-size:16px;line-height:1.55;color:${INK_SOFT};">
          Haben Sie konkrete Wünsche an Marke, Modell oder Budget?
          Antworten Sie einfach auf diese E-Mail, wir melden uns bei Ihnen zurück.
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:${INK};border-radius:12px;">
              <a href="${SITE_ORIGIN}/fahrzeuge" style="display:inline-block;padding:14px 22px;color:${PAPER};text-decoration:none;font-size:15px;font-weight:600;">
                Aktuellen Bestand ansehen →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    `,
    preview
  );

  const text = `Willkommen beim Fahrzeug-Newsletter.

Vielen Dank, dass Sie unseren Newsletter abonniert haben. Sie erfahren als Erster, wenn neue Fahrzeuge in unseren Bestand kommen.

Haben Sie konkrete Wünsche an Marke, Modell oder Budget? Antworten Sie einfach auf diese E-Mail.

Aktueller Bestand: ${SITE_ORIGIN}/fahrzeuge

${SITE.name}
${SITE.address.line1}
${SITE.address.line2}
${SITE.contact.phoneLandline}
${SITE.contact.email}`;

  return { subject, html, text };
}

export type VehicleEmailData = {
  slug: string;
  brand: string;
  model: string;
  variant?: string;
  year?: number;
  mileage?: number;
  power?: number;
  fuel?: string;
  price?: number;
  image?: string;
};

export function newVehicleEmail(opts: { vehicle: VehicleEmailData }) {
  const v = opts.vehicle;
  const title = `${v.brand} ${v.model}`;
  const subject = `Neu im Bestand: ${title}`;
  const preview = `${title}${v.variant ? ` · ${v.variant}` : ""} ist gerade bei uns eingetroffen.`;
  const url = `${SITE_ORIGIN}/fahrzeuge/${v.slug}`;
  const img = v.image?.startsWith("http") ? v.image : v.image ? `${SITE_ORIGIN}${v.image}` : "";

  const specs: string[] = [];
  if (v.year) specs.push(`EZ ${v.year}`);
  if (v.mileage != null) specs.push(`${v.mileage.toLocaleString("de-DE")} km`);
  if (v.power != null) specs.push(`${v.power} kW`);
  if (v.fuel) specs.push(v.fuel);
  const specLine = specs.join(" · ");
  const priceLine =
    v.price != null ? `${v.price.toLocaleString("de-DE")} €` : "Preis auf Anfrage";

  const html = layout(
    `
    <tr>
      <td style="padding:0 8px;">
        <h1 style="margin:0 0 20px 0;font-size:28px;line-height:1.15;letter-spacing:-0.02em;color:${INK};font-weight:600;">
          Neu im Bestand: <span style="color:${SIGNAL};">${title}.</span>
        </h1>
        ${v.variant ? `<p style="margin:0 0 24px 0;font-size:15px;color:${MUTED};">${v.variant}</p>` : ""}
        ${
          img
            ? `<a href="${url}" style="display:block;margin:0 0 24px 0;"><img src="${img}" alt="${title}" width="544" style="width:100%;max-width:544px;height:auto;display:block;border-radius:12px;" /></a>`
            : ""
        }
        <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px 0;">
          <tr>
            ${specLine ? `<td style="font-size:14px;color:${MUTED};letter-spacing:0.04em;">${specLine}</td>` : ""}
            <td align="right" style="font-size:18px;color:${INK};font-weight:600;letter-spacing:-0.01em;">${priceLine}</td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:${INK};border-radius:12px;">
              <a href="${url}" style="display:inline-block;padding:14px 22px;color:${PAPER};text-decoration:none;font-size:15px;font-weight:600;">
                Fahrzeug ansehen →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    `,
    preview
  );

  const text = `Neu im Bestand: ${title}
${v.variant ?? ""}
${specLine}
${priceLine}

Fahrzeug ansehen: ${url}

${SITE.name}
${SITE.contact.phoneLandline}
${SITE.contact.email}`;

  return { subject, html, text };
}
