import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicle } from "@/lib/vehicles";
import { SITE } from "@/lib/site";
import VehicleGallery from "@/components/VehicleGallery";
import VehicleFinanceCalculator from "@/components/VehicleFinanceCalculator";

// ISR: Seite spätestens alle 15 Minuten neu generieren. Daten aus mobile.de
// werden auf Fetch-Ebene identisch gecacht; neue und geänderte Inserate
// erscheinen also ohne Rebuild.
export const revalidate = 900;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;
  const v = await getVehicle(slug);
  if (!v) return notFound();

  const gallery = v.images && v.images.length > 0 ? v.images : v.image ? [v.image] : [];

  return (
    <main className="pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-3 px-3">
        {/* Image gallery (horizontal swipe + lightbox) */}
        <div className="order-1 vehicle-gallery-wrap">
          <VehicleGallery
            images={gallery}
            brand={v.brand}
            model={v.model}
            variant={v.variant}
            color={v.color}
            year={v.year}
            mileage={v.mileage}
          />
        </div>

        {/* Content */}
        <div className="order-2 px-5 lg:px-10 py-12 md:py-16 lg:py-20">
          <Link href="/fahrzeuge" className="small-caps rule-arrow inline-block">
            Zurück zum Bestand
          </Link>

          <h1 className="display mt-10" style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)" }}>
            {v.brand} {v.model}
          </h1>
          <div className="mt-2 lead" style={{ color: "var(--muted)" }}>
            {v.variant}
          </div>

          <div
            className="display mt-10"
            style={{ fontSize: "clamp(2.4rem, 4vw, 3.4rem)", color: "var(--signal)" }}
          >
            {v.price.toLocaleString("de-DE")} €
          </div>
          {v.vatable ? (
            <div style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
              Brutto · inkl. {v.vatRate ? Math.round(v.vatRate * 100) : 19}% MwSt. ausweisbar
              <br />
              Netto {Math.round(v.price / (1 + (v.vatRate ?? 0.19))).toLocaleString("de-DE")} €
              {" · "}
              Finanzierung möglich
            </div>
          ) : (
            <div style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
              Differenzbesteuert nach §25a UStG · MwSt. nicht ausweisbar · Finanzierung möglich
            </div>
          )}

          <dl className="mt-14 grid grid-cols-2 gap-x-10 gap-y-6">
            {[
              ["Erstzulassung", v.firstRegistration ?? v.year.toString()],
              ["Kilometerstand", `${v.mileage.toLocaleString("de-DE")} km`],
              ["Kraftstoff", v.fuel],
              ["Leistung", `${v.power} kW (${Math.round(v.power * 1.36)} PS)`],
              ["Getriebe", v.gearbox],
              ["Farbe", v.color],
            ].map(([k, val]) => (
              <div key={k} className="flex flex-col">
                <dt className="small-caps">{k}</dt>
                <dd className="mt-2" style={{ color: "var(--ink)", fontSize: "1.05rem" }}>
                  {val}
                </dd>
              </div>
            ))}
          </dl>

          {v.description && (
            <details
              className="mt-14 group"
              style={{
                borderTop: "1px solid var(--fog-200)",
                borderBottom: "1px solid var(--fog-200)",
              }}
            >
              <summary
                className="flex items-center justify-between cursor-pointer list-none"
                style={{ padding: "18px 0" }}
              >
                <span className="display" style={{ fontSize: "1.2rem", letterSpacing: "-0.02em" }}>
                  Beschreibung
                </span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-out group-open:rotate-45"
                  style={{ color: "var(--signal)", fontSize: "1.4rem", lineHeight: 1 }}
                >
                  +
                </span>
              </summary>
              <div
                className="pb-6"
                style={{
                  color: "var(--ink-soft)",
                  fontSize: "0.98rem",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                {v.description}
              </div>
            </details>
          )}

          <VehicleFinanceCalculator
            price={v.price}
            vehicleTitle={`${v.brand} ${v.model}${v.variant ? ` ${v.variant}` : ""}`}
            contactEmailHref={SITE.contact.emailHref}
          />

          <h2 className="display mt-14" style={{ fontSize: "1.4rem" }}>
            Ausstattung · Auszug
          </h2>
          <ul className="mt-6 flex flex-col">
            {v.highlights.map((h) => (
              <li
                key={h}
                className="flex items-baseline justify-between gap-6 py-3"
                style={{ borderBottom: "1px dotted var(--fog-300)" }}
              >
                <span style={{ color: "var(--ink)" }}>{h}</span>
                <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>· enthalten</span>
              </li>
            ))}
          </ul>
          <p className="mt-6" style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
            Vollständige Ausstattungs- und Historienliste senden wir auf Anfrage.
          </p>

          <div className="mt-16 flex flex-wrap gap-4">
            <a
              href={`${SITE.contact.emailHref}?subject=${encodeURIComponent(
                `Interesse an ${v.brand} ${v.model}`
              )}`}
              className="btn"
            >
              Probefahrt anfragen
              <span>→</span>
            </a>
            <a
              href={`/fahrzeuge/${v.slug}/expose`}
              target="_blank"
              rel="noopener"
              className="btn"
              style={{ background: "var(--paper)", color: "var(--ink)", border: "1px solid var(--ink)" }}
            >
              Exposé
              <span style={{ color: "var(--signal)" }}>↓</span>
            </a>
            {v.mobileAdUrl && (
              <a
                href={v.mobileAdUrl}
                target="_blank"
                rel="noopener"
                className="btn-ghost rule-arrow"
                style={{ alignSelf: "center" }}
              >
                Auf mobile.de ansehen
              </a>
            )}
          </div>
          <div className="mt-6 flex flex-col gap-1">
            <a href={SITE.contact.phoneLandlineHref} className="btn-ghost rule-arrow">
              {SITE.contact.phoneLandline}
            </a>
            <a href={SITE.contact.phoneHref} style={{ color: "var(--muted)", fontSize: "0.86rem" }}>
              {SITE.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
