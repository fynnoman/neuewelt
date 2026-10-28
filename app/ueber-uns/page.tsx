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
