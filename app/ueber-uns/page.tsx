import Image from "next/image";
import SlideIn from "@/components/SlideIn";

const FACTS = [
  ["Gründung", "2001"],
  ["Standort", "Saarlouis"],
];

const LEISTUNGEN = [
  "Neu- und Gebrauchtwagenhandel",
  "Neuwagenbeschaffung",
  "Fahrzeugankauf",
  "Zulassungsservice",
  "Fahrzeugaufbereitung",
  "Fahrzeugfolierungen und Scheibentönung",
  "Fahrzeugüberführung deutschlandweit",
  "Finanzierung über die Targobank",
  "Garantie bis zu 36 Monate",
];

function StarRow({ rating }: { rating: number }) {
  const percent = Math.max(0, Math.min(5, rating)) / 5 * 100;
  return (
    <div
      className="mt-3 relative inline-flex"
      aria-label={`${rating.toString().replace(".", ",")} von 5 Sternen`}
    >
      <StarIcons color="var(--fog-200)" />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${percent}%` }}
        aria-hidden
      >
        <StarIcons color="#FBBC04" />
      </div>
    </div>
  );
}

function StarIcons({ color }: { color: string }) {
  return (
    <div className="flex gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={color}
          aria-hidden
        >
          <path d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9.7l7.1-.6L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function UeberUnsPage() {
  return (
    <main className="pt-28 lg:pt-36">
      <section className="px-5 md:px-10 lg:px-14">
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
      </section>

      {/* FACTS */}
      <section className="mt-24 px-5 md:px-10 lg:px-14">
        <SlideIn
          direction="up"
          stagger={0.08}
          className="grid grid-cols-2 gap-y-10"
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
      <section className="mt-32 lg:mt-44 px-5 md:px-10 lg:px-14">
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

            <div className="mt-10" style={{ width: "clamp(180px, 22vw, 260px)" }}>
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "1036 / 1416",
                  borderRadius: "10px",
                  border: "1px solid var(--fog-200)",
                  background: "var(--paper)",
                }}
              >
                <Image
                  src="/images/mobile-de-urkunde-15-jahre.png"
                  alt="mobile.de Urkunde — 15 Jahre Händler seit 15. Januar 2010"
                  fill
                  sizes="(min-width: 1024px) 260px, 22vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div
                className="mono mt-4"
                style={{ color: "var(--muted)", fontSize: "0.72rem", lineHeight: 1.5 }}
              >
                mobile.de — Händler seit 15. Januar 2010
              </div>

              <div
                className="mt-10 pt-8"
                style={{ borderTop: "1px solid var(--fog-200)" }}
              >
                <div
                  className="mono"
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  Google Bewertungen
                </div>
                <div
                  className="display mt-4"
                  style={{
                    fontSize: "clamp(2.4rem, 4vw, 3.2rem)",
                    letterSpacing: "-0.035em",
                    color: "var(--ink)",
                    lineHeight: 1,
                  }}
                >
                  4,6
                  <span
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.42em",
                      marginLeft: "0.3em",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    / 5
                  </span>
                </div>
                <StarRow rating={4.6} />
                <div
                  className="mono mt-4"
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.72rem",
                    lineHeight: 1.5,
                  }}
                >
                  266 Rezensionen
                </div>
              </div>
            </div>
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

    </main>
  );
}
