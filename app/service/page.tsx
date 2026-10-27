import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

const LEISTUNGEN = [
  {
    id: "werkstatt",
    title: "Werkstatt",
    short: "Inspektion, Reparatur, HU-Vorbereitung.",
    points: [
      "Inspektion nach Herstellervorgabe",
      "Bremsen · Service, Wechsel, Prüfung",
      "Klima-Service",
      "Diagnose · Fehlerspeicher auslesen",
      "HU-Vorbereitung und TÜV-Begleitung",
    ],
  },
  {
    id: "aufbereitung",
    title: "Fahrzeugaufbereitung",
    short: "Innen und außen, Pauschale oder Detail.",
    points: [
      "Aufbereitung außen · Lackpflege",
      "Aufbereitung innen · Deep Clean",
      "Keramikversiegelung auf Anfrage",
    ],
  },
  {
    id: "reifen",
    title: "Reifen & Räder",
    short: "Montage, Wuchten, Saisonwechsel, Einlagerung.",
    points: [
      "Reifenmontage und Auswuchten",
      "Räderwechsel saisonal",
      "Einlagerung über die Saison",
    ],
  },
  {
    id: "zulassung",
    title: "Zulassungsservice",
    short: "Zulassung in Saarlouis und Umkreis.",
    points: [
      "An- und Abmeldung",
      "Umschreibung",
      "Kennzeichen und Papiere auf Anfrage",
    ],
  },
  {
    id: "ueberfuehrung",
    title: "Fahrzeugüberführung deutschlandweit",
    short: "Bis vor Ihre Haustür in ganz Deutschland.",
    points: [
      "Lieferung bundesweit",
      "Transport nach Entfernung kalkuliert",
      "Terminabsprache vor Übergabe",
    ],
  },
  {
    id: "finanzierung",
    title: "Finanzierung über die Targobank",
    short: "Angebot innerhalb von 24 Stunden.",
    points: [
      "Finanzierung über die Targobank",
      "Transparente Konditionen",
      "Barkauf ebenfalls möglich",
    ],
  },
  {
    id: "garantie",
    title: "Garantie bis zu 96 Monate",
    short: "Preis auf Anfrage.",
    points: [
      "Laufzeit bis zu 96 Monate",
      "Preis auf Anfrage",
      "Umfang nach Fahrzeug und Laufzeit",
    ],
  },
];

export default function ServicePage() {
  return (
    <main className="pt-28 lg:pt-36">
      <header className="px-6 md:px-10 lg:px-14">
        <div className="mono" style={{ color: "var(--muted)" }}>Service</div>
        <h1
          className="display mt-6"
          style={{ fontSize: "clamp(2.6rem, 6.4vw, 5.2rem)", maxWidth: "22ch", letterSpacing: "-0.03em" }}
        >
          Werkstatt und Service.
        </h1>
      </header>

      <section className="mt-16 lg:mt-20 px-6 md:px-10 lg:px-14">
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start"
          style={{ maxWidth: 1400, marginInline: "auto" }}
        >
          <div className="order-2 lg:order-1">
            <p className="lead" style={{ fontSize: "1.15rem", maxWidth: "40ch" }}>
              Inspektion, Reparatur, Aufbereitung, Räderwechsel, HU-Vorbereitung
              und Zulassung. Alles aus einer Hand. Festpreis wird vor Beginn
              schriftlich bestätigt.
            </p>
          </div>
          <div
            className="order-1 lg:order-2 relative overflow-hidden"
            style={{ aspectRatio: "4 / 3" }}
          >
            <Image
              src="/photos/showroom-amg.jpg"
              alt="Showroom · Neue Welt Automobile"
              fill
              sizes="(min-width: 1024px) 55vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mt-24 lg:mt-28 px-6 md:px-10 lg:px-14">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-2 radius overflow-hidden"
          style={{ background: "var(--paper-sunk)" }}
        >
          {[
            {
              k: "Fahrzeugüberführung",
              v: "Deutschlandweit — bis vor Ihre Haustür.",
            },
            {
              k: "Finanzierung",
              v: "Über die Targobank. Angebot innerhalb von 24 Stunden.",
            },
            {
              k: "Garantie",
              v: "Preis auf Anfrage. Laufzeit bis zu 96 Monate.",
            },
          ].map((it) => (
            <div
              key={it.k}
              style={{
                padding: "clamp(28px, 4vw, 40px) clamp(24px, 3.5vw, 36px)",
                background: "var(--paper-sunk)",
              }}
            >
              <div className="mono" style={{ color: "var(--on-sunk-muted)" }}>
                {it.k}
              </div>
              <p
                className="mt-4"
                style={{
                  color: "var(--on-sunk)",
                  fontSize: "1.05rem",
                  lineHeight: 1.4,
                }}
              >
                {it.v}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 lg:mt-28 px-6 md:px-10 lg:px-14">
        <div className="mx-auto" style={{ maxWidth: 920 }}>
          <Reveal>
            <div className="mono" style={{ color: "var(--muted)" }}>Leistungen</div>
            <h2
              className="display mt-4"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.03em" }}
            >
              Alles im Überblick.
            </h2>
          </Reveal>

          <ul className="mt-10 flex flex-col" style={{ borderTop: "1px solid var(--fog-200)" }}>
            {LEISTUNGEN.map((l) => (
              <li key={l.id} id={l.id} style={{ borderBottom: "1px solid var(--fog-200)" }}>
                <details className="group">
                  <summary
                    className="flex items-center justify-between gap-6 cursor-pointer py-6 list-none"
                    style={{ outline: "none" }}
                  >
                    <div>
                      <div
                        className="display"
                        style={{ fontSize: "1.2rem", letterSpacing: "-0.02em" }}
                      >
                        {l.title}
                      </div>
                      <div
                        className="mt-1"
                        style={{ color: "var(--muted)", fontSize: "0.95rem" }}
                      >
                        {l.short}
                      </div>
                    </div>
                    <span
                      aria-hidden
                      className="shrink-0 transition-transform duration-300 ease-out group-open:rotate-45"
                      style={{
                        color: "var(--signal)",
                        fontSize: "1.6rem",
                        lineHeight: 1,
                      }}
                    >
                      +
                    </span>
                  </summary>
                  <ul className="pb-7 pr-10 flex flex-col gap-2.5" style={{ color: "var(--ink)" }}>
                    {l.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-baseline gap-3"
                        style={{ fontSize: "0.98rem" }}
                      >
                        <span style={{ color: "var(--signal)" }}>·</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-24 lg:mt-28 px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal>
            <article className="radius" style={{ background: "var(--paper-sunk)", padding: 36 }}>
              <div className="mono" style={{ color: "var(--on-sunk-muted)" }}>Werkstatt-Termine</div>
              <p
                className="display mt-4"
                style={{ fontSize: "1.6rem", lineHeight: 1.15, color: "var(--on-sunk)", letterSpacing: "-0.02em" }}
              >
                Meist innerhalb von drei Werktagen.
              </p>
              <p className="mt-4" style={{ color: "var(--on-sunk-muted)", fontSize: "0.95rem" }}>
                Terminvereinbarung telefonisch oder per Mail.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="radius" style={{ background: "var(--paper-sunk)", padding: 36 }}>
              <div className="mono" style={{ color: "var(--on-sunk-muted)" }}>Hol- und Bringdienst</div>
              <p
                className="display mt-4"
                style={{ fontSize: "1.6rem", lineHeight: 1.15, color: "var(--on-sunk)", letterSpacing: "-0.02em" }}
              >
                In Saarlouis kostenfrei.
              </p>
              <p className="mt-4" style={{ color: "var(--on-sunk-muted)", fontSize: "0.95rem" }}>
                Abholung und Rückgabe durch unser Team. Umkreis gegen Pauschale.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.2}>
            <article className="radius" style={{ background: "var(--ink)", color: "var(--paper)", padding: 36 }}>
              <div className="mono" style={{ color: "var(--muted-fade)" }}>
                Werkstatt direkt
              </div>
              <a
                href={SITE.contact.phoneHref}
                className="display block mt-4"
                style={{ fontSize: "1.6rem", color: "var(--paper)" }}
              >
                {SITE.contact.phone}
              </a>
              <Link
                href="/ankauf"
                className="mt-6 inline-flex items-center gap-2"
                style={{ color: "var(--paper)", fontSize: "0.95rem" }}
              >
                Termin anfragen <span style={{ color: "var(--signal-deep)" }}>→</span>
              </Link>
            </article>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
