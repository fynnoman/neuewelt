import Link from "next/link";
import Image from "next/image";
import SlideIn from "@/components/SlideIn";
import Marquee from "@/components/Marquee";
import MagneticButton from "@/components/MagneticButton";
import { SITE } from "@/lib/site";
import { getVehicles } from "@/lib/vehicles";

const HERO_IMAGE = "/images/neue-welt-automobile.webp";
const ANKAUF_IMAGE = "/photos/showroom-bright.jpg";
const TEASER_IMAGE = "/photos/showroom-amg.jpg";

const SERVICES = [
  { title: "Neuwagenbeschaffung", body: "Ihr Wunschfahrzeug direkt vom Hersteller.", href: "/service" },
  { title: "Fahrzeugaufbereitung", body: "Innen und außen, Pauschale oder Detail.", href: "/service" },
  { title: "Fahrzeugfolierungen & Scheibentönung", body: "Vollfolierung, Teilfolierung, Scheibentönung.", href: "/service" },
  { title: "Zulassungsservice", body: "Bundesweite Zulassung inklusive Wunschkennzeichen.", href: "/service" },
  { title: "Fahrzeugüberführung deutschlandweit", body: "Bis vor Ihre Haustür in ganz Deutschland.", href: "/service" },
  { title: "Fahrzeugankauf", body: "Angebot innerhalb von Minuten.", href: "/ankauf" },
];

const PROZESS = [
  ["01", "Beratung", "Termin im Haus oder telefonisch. Wir hören zu, bevor wir reden."],
  ["02", "Probefahrt", "Jedes Fahrzeug kann vor dem Kauf gefahren werden."],
  ["03", "Finanzierung", "Barkauf oder Finanzierung über die Targobank. Transparente Konditionen."],
  ["04", "Übergabe", "Zulassung, Übergabe im Haus oder Lieferung bis vor die Tür."],
];

export default async function Home() {
  const latest = await getVehicles({ limit: 6 });
  const totalCount = (await getVehicles()).length;

  return (
    <main>
      {/* HERO — full-bleed to top */}
      <section className="relative" style={{ minHeight: "100svh" }}>
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Neue Welt Automobile"
            fill
            priority
            quality={95}
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 55%",
            }}
            aria-hidden
          />
        </div>
        {/* Horizontal fade — dark on the left for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,11,12,0.92) 0%, rgba(10,11,12,0.78) 20%, rgba(10,11,12,0.45) 48%, rgba(10,11,12,0.0) 72%)",
          }}
        />
        {/* Subtle bottom vignette for the caption line */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,11,12,0.0) 70%, rgba(10,11,12,0.5) 100%)",
          }}
        />

        <div
          className="relative h-full flex flex-col justify-between"
          style={{ minHeight: "100svh" }}
        >
          <div className="flex items-center justify-between px-7 md:px-11 pt-28 lg:pt-32">
            <div className="mono" style={{ color: "var(--paper)", opacity: 0.72 }}>
              Saarlouis — Saarland · DE
            </div>
            <div className="mono hidden md:block" style={{ color: "var(--signal)" }}>
              {SITE.hours.weekday}
            </div>
          </div>

          <div className="px-7 md:px-14 pb-16 lg:pb-24">
              <SlideIn direction="up" delay={0.1}>
                <div
                  className="mono"
                  style={{ color: "var(--paper)", opacity: 0.72 }}
                >
                  Neuwagen · Gebrauchtwagen · Fahrzeugankauf
                </div>
              </SlideIn>

              <SlideIn direction="up" delay={0.2}>
                <h1
                  className="display mt-6"
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    maxWidth: "22ch",
                    color: "var(--paper)",
                  }}
                >
                  Machen Sie aus einem Auto,
                  <br />
                  <span style={{ color: "var(--signal)" }}>Ihr Auto.</span>
                </h1>
              </SlideIn>

              <SlideIn direction="up" delay={0.4}>
                <p
                  className="lead mt-6"
                  style={{ color: "rgba(251,251,249,0.84)", maxWidth: "40ch" }}
                >
                  Gepflegte Neu- und Gebrauchtwagen in Saarlouis. Fahrzeugankauf
                  zum fairen Marktpreis. Alle Leistungen aus einer Hand.
                </p>
              </SlideIn>

              <SlideIn direction="up" delay={0.5}>
                <div className="mt-10 flex flex-wrap gap-5">
                  <MagneticButton href="/fahrzeuge" variant="solid">
                    Fahrzeuge ansehen <span>→</span>
                  </MagneticButton>
                  <Link
                    href="/ankauf"
                    className="btn"
                    style={{
                      background: "transparent",
                      color: "var(--paper)",
                      border: "1px solid rgba(251,251,249,0.4)",
                    }}
                  >
                    Fahrzeug verkaufen
                  </Link>
                </div>
              </SlideIn>
            </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="mt-24">
        <Marquee />
      </section>

      {/* AKTUELLE FAHRZEUGE */}
      <section className="mt-16 md:mt-20 lg:mt-24 px-6 md:px-10 lg:px-14">
        <SlideIn direction="up">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div className="mono" style={{ color: "var(--muted)" }}>Fahrzeuge</div>
              <h2
                className="display mt-3"
                style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", letterSpacing: "-0.03em" }}
              >
                Aktueller Bestand
              </h2>
            </div>
            <Link
              href="/fahrzeuge"
              className="btn-ghost rule-arrow"
            >
              Alle {totalCount} Fahrzeuge
            </Link>
          </div>
        </SlideIn>

        <SlideIn direction="up" stagger={0.08} className="mt-9 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-9">
          {latest.map((v) => (
            <Link key={v.slug} href={`/fahrzeuge/${v.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden radius" style={{ background: "var(--paper-sunk)" }}>
                <Image
                  src={v.image}
                  alt={`${v.brand} ${v.model}`}
                  fill
                  sizes="(min-width: 1280px) 32vw, (min-width: 768px) 48vw, 94vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <span
                  className="liquid-chip absolute left-3 top-3"
                  style={{ fontSize: "0.66rem" }}
                >
                  {v.fuel.toUpperCase()}
                </span>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <div>
                  <div className="display" style={{ fontSize: "1.05rem", letterSpacing: "-0.02em", color: "var(--ink)" }}>
                    {v.brand} {v.model}
                  </div>
                  <div className="mt-1" style={{ color: "var(--muted)", fontSize: "0.82rem" }}>
                    {v.variant}
                  </div>
                </div>
                <div className="display" style={{ fontSize: "1.05rem", color: "var(--ink)", letterSpacing: "-0.01em" }}>
                  {v.price.toLocaleString("de-DE")} €
                </div>
              </div>
              <div
                className="mt-2 flex items-center gap-3 mono"
                style={{ color: "var(--muted)", fontVariantNumeric: "tabular-nums", fontSize: "0.7rem" }}
              >
                <span>EZ {v.year}</span>
                <span>·</span>
                <span>{v.mileage.toLocaleString("de-DE")} km</span>
                <span>·</span>
                <span>{v.power} kW</span>
              </div>
            </Link>
          ))}
        </SlideIn>
      </section>

      {/* FAHRZEUGANKAUF — split image/text, sticky image */}
      <section className="mt-24 md:mt-32 lg:mt-44 px-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="relative overflow-hidden rounded-[var(--radius)]" style={{ aspectRatio: "4 / 5", minHeight: "60svh" }}>
            <div
              style={{
                position: "sticky",
                top: "90px",
                height: "90vh",
                width: "100%",
              }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-[var(--radius)]">
                <Image
                  src={ANKAUF_IMAGE}
                  alt="Fahrzeugankauf"
                  fill
                  sizes="(min-width: 1024px) 48vw, 94vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="px-4 md:px-8 py-16 lg:py-28 flex items-center">
            <div style={{ maxWidth: "48ch" }}>
              <SlideIn direction="right">
                <div className="mono" style={{ color: "var(--muted)" }}>Fahrzeugankauf</div>
              </SlideIn>
              <SlideIn direction="right" delay={0.1}>
                <h2
                  className="display mt-5"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", letterSpacing: "-0.03em" }}
                >
                  Wir kaufen Ihr Fahrzeug.
                </h2>
              </SlideIn>
              <SlideIn direction="right" delay={0.2}>
                <p className="lead mt-6">
                  Faire Bewertung zum aktuellen Marktpreis. Barkauf oder Überweisung,
                  Abmeldung und Transport auf Wunsch. Angebot innerhalb von Minuten.
                </p>
              </SlideIn>
              <SlideIn direction="right" delay={0.3} stagger={0.08}>
                <ul className="mt-10 flex flex-col">
                  {[
                    "Alle Marken und Baujahre",
                    "Keine versteckten Kosten",
                    "Abholung bundesweit möglich",
                    "Barzahlung bei Übergabe",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-4 py-4 hairline"
                      style={{ fontSize: "1rem", color: "var(--ink)" }}
                    >
                      <span style={{ color: "var(--signal)" }}>—</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </SlideIn>
              <SlideIn direction="right" delay={0.4}>
                <div className="mt-10">
                  <MagneticButton href="/ankauf" variant="solid">
                    Fahrzeug anbieten <span>→</span>
                  </MagneticButton>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE GRID */}
      <section className="mt-24 md:mt-32 lg:mt-44 px-6 md:px-10 lg:px-14">
        <SlideIn direction="up">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div className="mono" style={{ color: "var(--muted)" }}>Service</div>
              <h2
                className="display mt-4"
                style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", letterSpacing: "-0.03em" }}
              >
                Alles aus einer Hand.
              </h2>
            </div>
            <Link href="/service" className="btn-ghost rule-arrow">
              Alle Leistungen
            </Link>
          </div>
        </SlideIn>

        <SlideIn
          direction="up"
          stagger={0.07}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
        >
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group block lift radius"
              style={{
                background: "var(--paper-sunk)",
                padding: "clamp(24px, 4vw, 36px) clamp(22px, 3.5vw, 32px)",
                minHeight: "180px",
              }}
            >
              <div className="display" style={{ fontSize: "1.3rem", letterSpacing: "-0.02em", color: "var(--on-sunk)" }}>
                {s.title}
              </div>
              <p className="mt-3" style={{ color: "var(--on-sunk-muted)", fontSize: "0.95rem" }}>
                {s.body}
              </p>
              <div
                className="mt-10 mono inline-flex items-center gap-2"
                style={{ color: "var(--on-sunk)" }}
              >
                Mehr <span style={{ color: "var(--signal)" }}>→</span>
              </div>
            </Link>
          ))}
        </SlideIn>
      </section>

      {/* KAUFPROZESS — 4 steps */}
      <section className="mt-24 md:mt-32 lg:mt-44 px-6 md:px-10 lg:px-14">
        <SlideIn direction="up">
          <div className="mono" style={{ color: "var(--muted)" }}>Ablauf</div>
          <h2
            className="display mt-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", letterSpacing: "-0.03em", maxWidth: "22ch" }}
          >
            So läuft der Kauf.
          </h2>
        </SlideIn>

        <SlideIn
          direction="up"
          stagger={0.08}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14"
        >
          {PROZESS.map(([num, title, body]) => (
            <div key={num}>
              <div
                className="display"
                style={{
                  fontSize: "2.2rem",
                  color: "var(--signal)",
                  fontWeight: 400,
                  letterSpacing: "-0.03em",
                }}
              >
                {num}
              </div>
              <div
                className="display mt-5"
                style={{ fontSize: "1.3rem", letterSpacing: "-0.02em" }}
              >
                {title}
              </div>
              <p className="mt-3" style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
                {body}
              </p>
            </div>
          ))}
        </SlideIn>
      </section>

      {/* MARKEN */}
      <section className="mt-24 md:mt-32 lg:mt-44 py-16 md:py-20 lg:py-28 px-6 md:px-10 lg:px-14">
        <SlideIn direction="up">
          <div className="mono" style={{ color: "var(--muted)" }}>Marken</div>
          <h2
            className="display mt-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              letterSpacing: "-0.03em",
              maxWidth: "28ch",
              color: "var(--ink)",
            }}
          >
            Jede Marke. Jedes Modell.
          </h2>
        </SlideIn>

        <p className="mt-10 mono" style={{ color: "var(--muted)" }}>
          Was Sie suchen, beschaffen wir auf Anfrage.
        </p>
      </section>

      {/* ÜBER UNS teaser */}
      <section className="mt-24 md:mt-32 lg:mt-44 px-3">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-3">
          <div className="px-4 md:px-8 py-12 lg:py-20 flex items-center">
            <div style={{ maxWidth: "46ch" }}>
              <SlideIn direction="up">
                <div className="mono" style={{ color: "var(--muted)" }}>Über uns</div>
              </SlideIn>
              <SlideIn direction="up" delay={0.1}>
                <h2
                  className="display mt-5"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", letterSpacing: "-0.03em" }}
                >
                  Autohaus in Saarlouis.
                </h2>
              </SlideIn>
              <SlideIn direction="up" delay={0.2}>
                <p className="lead mt-6">
                  Familiengeführt. Breiter Bestand, hohe Prüfungstiefe, offene
                  Beratung. Zulassung und Finanzierung aus einer Hand.
                </p>
              </SlideIn>
              <SlideIn direction="up" delay={0.3}>
                <div className="mt-10">
                  <MagneticButton href="/ueber-uns" variant="ghost">
                    Mehr über uns
                  </MagneticButton>
                </div>
              </SlideIn>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[var(--radius)]" style={{ aspectRatio: "5 / 4", minHeight: "50svh" }}>
            <Image
              src={TEASER_IMAGE}
              alt="Neue Welt Automobile Saarlouis"
              fill
              sizes="(min-width: 1024px) 48vw, 94vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* SUCHAUFTRAG */}
      <section
        className="mt-24 md:mt-32 lg:mt-44 px-6 md:px-10 lg:px-14 py-20"
        style={{ background: "var(--paper)" }}
      >
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
            <div>
              <SlideIn direction="up">
                <div className="mono" style={{ color: "var(--signal)", letterSpacing: "0.2em" }}>
                  SUCHAUFTRAG
                </div>
              </SlideIn>
              <SlideIn direction="up" delay={0.1}>
                <h2
                  className="display mt-5"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.4rem)",
                    letterSpacing: "-0.03em",
                    color: "var(--ink)",
                    maxWidth: "22ch",
                  }}
                >
                  Nicht fündig geworden?
                </h2>
              </SlideIn>
              <SlideIn direction="up" delay={0.2}>
                <p
                  className="lead mt-5"
                  style={{ color: "var(--ink-soft)", maxWidth: "48ch" }}
                >
                  Sagen Sie uns, was Sie suchen. Marke, Budget, Mindestanforderungen.
                  Wir melden uns, sobald ein passender Wagen in den Hof kommt.
                </p>
              </SlideIn>
            </div>
            <SlideIn direction="right" delay={0.3}>
              <Link
                href={SITE.contact.emailHref}
                className="btn"
                style={{ background: "var(--ink)", color: "var(--paper)" }}
              >
                Suchauftrag starten <span style={{ color: "var(--signal)" }}>→</span>
              </Link>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section className="mt-24 md:mt-32 lg:mt-44 px-6 md:px-10 lg:px-14">
        <SlideIn direction="up">
          <div className="mono" style={{ color: "var(--muted)" }}>Kontakt</div>
          <h2
            className="display mt-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", letterSpacing: "-0.03em", maxWidth: "22ch" }}
          >
            Vorbeikommen oder anrufen.
          </h2>
        </SlideIn>

        <SlideIn
          direction="up"
          stagger={0.08}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-2"
        >
          <div
            className="radius"
            style={{
              background: "var(--fog-100)",
              padding: "clamp(24px, 4vw, 36px) clamp(22px, 3.5vw, 32px)",
            }}
          >
            <div className="mono" style={{ color: "var(--muted)" }}>Adresse</div>
            <div style={{ marginTop: 18, color: "var(--muted)" }}>
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
            </div>
          </div>
          <div
            className="radius"
            style={{
              background: "var(--fog-100)",
              padding: "clamp(24px, 4vw, 36px) clamp(22px, 3.5vw, 32px)",
            }}
          >
            <div className="mono" style={{ color: "var(--muted)" }}>Öffnungszeiten</div>
            <div style={{ marginTop: 18, color: "var(--muted)" }}>
              {SITE.hours.weekday}
              <br />
              {SITE.hours.saturday}
              <br />
              {SITE.hours.note}
            </div>
          </div>
          <div
            className="radius"
            style={{
              background: "var(--fog-100)",
              padding: "clamp(24px, 4vw, 36px) clamp(22px, 3.5vw, 32px)",
              color: "var(--muted)",
            }}
          >
            <div className="mono" style={{ color: "var(--muted)" }}>Direkt sprechen</div>
            <a
              href={SITE.contact.phoneLandlineHref}
              className="block"
              style={{ marginTop: 18, color: "var(--muted)" }}
            >
              {SITE.contact.phoneLandline}
            </a>
            <a href={SITE.contact.phoneHref} className="block" style={{ color: "var(--muted)" }}>
              {SITE.contact.phone}
            </a>
            <a href={SITE.contact.emailHref} className="block" style={{ color: "var(--muted)" }}>
              {SITE.contact.email}
            </a>
          </div>
        </SlideIn>
      </section>
    </main>
  );
}
