import Image from "next/image";
import Link from "next/link";
import SlideIn from "@/components/SlideIn";
import { SITE } from "@/lib/site";

const FACTS = [
  ["Gründung", "[Jahr]"],
  ["Standort", "Saarlouis"],
  ["Mitarbeiter", "[Zahl]"],
  ["Werkstatt", "im Haus"],
];

const LEISTUNGEN = [
  "Gebrauchtwagenhandel",
  "Fahrzeugankauf",
  "Werkstatt und Service",
  "Zulassungsservice",
  "Fahrzeugaufbereitung",
  "Finanzierung über Partnerbanken",
];

export default function UeberUnsPage() {
  return (
    <main className="pt-28 lg:pt-36">
      <section className="px-6 md:px-10 lg:px-14">
        <SlideIn direction="up">
          <div className="mono" style={{ color: "var(--muted)" }}>Über uns</div>
        </SlideIn>
        <SlideIn direction="up" delay={0.1}>
          <h1
            className="display mt-6"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5.6rem)",
              maxWidth: "22ch",
              letterSpacing: "-0.035em",
            }}
          >
            Autohaus in Saarlouis.
          </h1>
        </SlideIn>
        <SlideIn direction="up" delay={0.2}>
          <p className="lead mt-6 measure" style={{ fontSize: "1.15rem" }}>
            Inhabergeführter Gebrauchtwagenhandel mit eigener Werkstatt.
            Saarlouis und Umkreis. Alle Marken, alle Baujahre.
          </p>
        </SlideIn>
      </section>

      {/* FACTS */}
      <section className="mt-24 px-6 md:px-10 lg:px-14">
        <SlideIn
          direction="up"
          stagger={0.08}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-10"
        >
          {FACTS.map(([k, v]) => (
            <div key={k} className="flex flex-col">
              <div className="mono" style={{ color: "var(--muted)" }}>{k}</div>
              <div
                className="display mt-4"
                style={{ fontSize: "1.8rem", letterSpacing: "-0.025em" }}
              >
                {v}
              </div>
            </div>
          ))}
        </SlideIn>
      </section>

      {/* LEISTUNGEN LIST */}
      <section className="mt-32 lg:mt-44 px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-14 items-start">
          <SlideIn direction="up">
            <div className="mono" style={{ color: "var(--muted)" }}>Leistungen</div>
            <h2
              className="display mt-5"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                letterSpacing: "-0.03em",
                maxWidth: "20ch",
              }}
            >
              Was wir machen.
            </h2>
          </SlideIn>
          <SlideIn direction="up" delay={0.15} stagger={0.06} className="flex flex-col">
            {LEISTUNGEN.map((t, i) => (
              <div
                key={t}
                className="grid grid-cols-[auto_1fr] items-baseline gap-6 py-7 hairline"
                style={{ borderTop: i === 0 ? "1px solid var(--fog-200)" : undefined }}
              >
                <span
                  className="mono"
                  style={{ color: "var(--signal)" }}
                >
                  0{i + 1}
                </span>
                <div
                  className="display"
                  style={{ fontSize: "1.4rem", color: "var(--ink)", letterSpacing: "-0.025em" }}
                >
                  {t}
                </div>
              </div>
            ))}
          </SlideIn>
        </div>
      </section>

      {/* BIG IMAGE */}
      <section className="mt-36 px-3">
        <SlideIn direction="up">
          <div className="relative aspect-[21/9] overflow-hidden rounded-[var(--radius)]">
            <Image
              src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=2400&q=70"
              alt="Neue Welt Automobile Saarlouis"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, rgba(10,11,12,0.55))",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 p-10 lg:p-16 flex items-end justify-between" style={{ color: "var(--paper)" }}>
              <div
                className="display"
                style={{ fontSize: "clamp(1.8rem, 3.4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
              >
                Saarlouis.
              </div>
              <Link
                href={SITE.contact.phoneHref}
                className="btn-ghost rule-arrow"
                style={{ color: "var(--paper)", borderColor: "var(--paper)" }}
              >
                Termin
              </Link>
            </div>
          </div>
        </SlideIn>
      </section>
    </main>
  );
}
