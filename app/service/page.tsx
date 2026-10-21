import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

const GROUPS = [
  {
    name: "Werkstatt",
    items: [
      ["Inspektion nach Herstellervorgabe", "ab [X] €"],
      ["Bremsen · Service, Wechsel, Prüfung", "nach Aufwand"],
      ["Klima-Service", "ab [X] €"],
      ["Reifen & Räder · Montage, Wuchten", "ab [X] €"],
      ["Diagnose · Fehlerspeicher auslesen", "ab [X] €"],
      ["HU-Vorbereitung + TÜV-Begleitung", "nach Aufwand"],
    ],
  },
  {
    name: "Rund um das Fahrzeug",
    items: [
      ["Aufbereitung außen · Lackpflege", "ab [X] €"],
      ["Aufbereitung innen · Deep Clean", "ab [X] €"],
      ["Keramikversiegelung", "auf Anfrage"],
      ["Räderwechsel saisonal + Einlagerung", "pro Saison ab [X] €"],
    ],
  },
  {
    name: "Abwicklung & Service",
    items: [
      ["Zulassungsservice (Saarlouis + Umkreis)", "inklusive"],
      ["Fahrzeugüberführung deutschlandweit", "nach Entfernung"],
      ["Hol- und Bringdienst in Saarlouis", "inklusive"],
      ["Finanzierung über Partnerbanken", "auf Anfrage"],
      ["Garantieverlängerung", "auf Anfrage"],
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
              und Zulassung. Alles im Haus. Preise unten sind Richtwerte, der
              Festpreis wird vor Beginn schriftlich bestätigt.
            </p>
          </div>
          <div
            className="order-1 lg:order-2 relative overflow-hidden"
            style={{ aspectRatio: "4 / 3" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=72"
              alt="Werkstatt in Betrieb"
              fill
              sizes="(min-width: 1024px) 55vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mt-20 lg:mt-28 px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <div
              className="radius"
              style={{
                background: "var(--paper-sunk)",
                padding: "56px 48px",
              }}
            >
              {GROUPS.map((g, gi) => (
                <div key={g.name} style={{ marginTop: gi === 0 ? 0 : 48 }}>
                  <div
                    className="display"
                    style={{ fontSize: "1.4rem", color: "var(--on-sunk)" }}
                  >
                    {g.name}
                  </div>
                  <ul className="mt-6 flex flex-col">
                    {g.items.map(([title, price]) => (
                      <li
                        key={title}
                        className="flex items-baseline justify-between gap-6 py-4"
                        style={{
                          borderBottom: "1px dotted var(--sunk-hairline)",
                          fontSize: "1.05rem",
                        }}
                      >
                        <span style={{ color: "var(--on-sunk)" }}>{title}</span>
                        <span
                          style={{
                            color: "var(--on-sunk-muted)",
                            fontSize: "0.95rem",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
          <p className="mt-8 text-center" style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
            Preise sind Richtwerte. Der Festpreis wird vor Beginn schriftlich bestätigt.
          </p>
        </div>
      </section>

      <section className="mt-36 px-6 md:px-10 lg:px-14">
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
