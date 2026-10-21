import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicle, getVehicles } from "@/lib/vehicles";
import { SITE } from "@/lib/site";

export async function generateStaticParams() {
  const vehicles = await getVehicles();
  return vehicles.map((v) => ({ slug: v.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;
  const v = await getVehicle(slug);
  if (!v) return notFound();

  return (
    <main className="pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-3 px-3">
        {/* Sticky photo */}
        <div className="order-1">
          <div
            className="relative overflow-hidden"
            style={{ position: "sticky", top: 12, height: "calc(100svh - 24px)" }}
          >
            <Image
              src={v.image}
              alt={`${v.brand} ${v.model} ${v.variant}`}
              fill
              priority
              sizes="(min-width:1024px) 55vw, 100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-x-0 bottom-0 flex items-center justify-between"
              style={{
                padding: "18px 22px",
                background: "rgba(251,251,249,0.92)",
                color: "var(--ink)",
                fontSize: "0.92rem",
              }}
            >
              <span>
                {v.brand} {v.model} · {v.color}
              </span>
              <span style={{ color: "var(--muted)", fontSize: "0.8rem" }}>
                EZ {v.year} · {v.mileage.toLocaleString("de-DE")} km
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-2 px-6 lg:px-10 py-20">
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
          <div style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
            inkl. Mehrwertsteuer · Finanzierung möglich
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-10 gap-y-6">
            {[
              ["Erstzulassung", v.year.toString()],
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

          <h2 className="display mt-16" style={{ fontSize: "1.4rem" }}>
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

          <div className="mt-16 flex flex-wrap gap-6">
            <a
              href={`${SITE.contact.emailHref}?subject=${encodeURIComponent(
                `Interesse an ${v.brand} ${v.model}`
              )}`}
              className="btn"
            >
              Probefahrt anfragen
              <span>→</span>
            </a>
            <a href={SITE.contact.phoneHref} className="btn-ghost rule-arrow">
              {SITE.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
