"use client";

import { useMemo, useState } from "react";

type Props = {
  price: number;
  vehicleTitle: string;
  contactEmailHref: string;
};

const EURO = new Intl.NumberFormat("de-DE");
const EURO_DEC = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Fester Zins für die Rate-Vorschau. Verbindliche Konditionen kommen von der Targobank.
const DEFAULT_RATE = 4.99;

function monthlyPayment(principal: number, annualRatePct: number, months: number, balloon = 0): number {
  if (months <= 0 || principal <= 0) return 0;
  const i = annualRatePct / 100 / 12;
  if (i === 0) return (principal - balloon) / months;
  // PMT = (PV - FV / (1+i)^n) * i / (1 - (1+i)^(-n))
  const factor = Math.pow(1 + i, -months);
  const pmt = (principal - balloon * factor) * i / (1 - factor);
  return pmt;
}

export default function VehicleFinanceCalculator({ price, vehicleTitle, contactEmailHref }: Props) {
  const [anzahlung, setAnzahlung] = useState<number>(Math.round(price * 0.2));
  const [laufzeit, setLaufzeit] = useState<number>(48);
  const [withSchluss, setWithSchluss] = useState<boolean>(false);
  const [schlussrate, setSchlussrate] = useState<number>(Math.round(price * 0.25));
  // Zinssatz wird nicht in der UI gezeigt. Fester Default rein für die Rate-Vorschau.
  const rate = DEFAULT_RATE;

  const maxAnzahlung = Math.max(0, price - 500);
  const financedAmount = Math.max(0, price - Math.min(anzahlung, maxAnzahlung));
  const effectiveSchluss = withSchluss ? Math.min(schlussrate, financedAmount * 0.9) : 0;

  const monthly = useMemo(
    () => monthlyPayment(financedAmount, rate, laufzeit, effectiveSchluss),
    [financedAmount, rate, laufzeit, effectiveSchluss]
  );

  const totalPaid = anzahlung + monthly * laufzeit + effectiveSchluss;

  const anfrageHref =
    `${contactEmailHref}?subject=${encodeURIComponent(`Finanzierungsanfrage · ${vehicleTitle}`)}` +
    `&body=${encodeURIComponent(
      `Fahrzeug: ${vehicleTitle}\nPreis: ${EURO.format(price)} €\n\n` +
        `Wunschkonditionen:\n` +
        `· Anzahlung: ${EURO.format(anzahlung)} €\n` +
        `· Laufzeit: ${laufzeit} Monate\n` +
        `${withSchluss ? `· Schlussrate: ${EURO.format(Math.round(effectiveSchluss))} €\n` : ""}` +
        `· Monatliche Beispielrate: ca. ${EURO_DEC.format(monthly)} €\n\n` +
        `Bitte um ein verbindliches Angebot über die Targobank. Vielen Dank.`
    )}`;

  const inputBase: React.CSSProperties = {
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--ink)",
    padding: "6px 2px",
    fontSize: "0.98rem",
    color: "var(--ink)",
    outline: "none",
    width: "100%",
  };

  return (
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
          Finanzierung berechnen
        </span>
        <span
          aria-hidden
          className="transition-transform duration-300 ease-out group-open:rotate-45"
          style={{ color: "var(--signal)", fontSize: "1.4rem", lineHeight: 1 }}
        >
          +
        </span>
      </summary>

      <div className="pb-8" style={{ color: "var(--ink)" }}>
        <p className="mono mb-6" style={{ color: "var(--muted)", fontSize: "0.78rem" }}>
          Beispielrechnung · Finanzierung über die Targobank
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          {/* Anzahlung */}
          <div>
            <label className="mono block" style={{ color: "var(--muted)", marginBottom: 8 }}>
              Anzahlung
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={maxAnzahlung}
                step={100}
                value={Math.min(anzahlung, maxAnzahlung)}
                onChange={(e) => setAnzahlung(Number(e.target.value))}
                className="flex-1"
                style={{ accentColor: "var(--signal)" }}
              />
              <input
                type="number"
                min={0}
                max={maxAnzahlung}
                step={100}
                value={anzahlung}
                onChange={(e) => setAnzahlung(Math.max(0, Math.min(maxAnzahlung, Number(e.target.value) || 0)))}
                style={{ ...inputBase, width: 110, textAlign: "right" }}
              />
              <span style={{ color: "var(--muted)" }}>€</span>
            </div>
          </div>

          {/* Laufzeit */}
          <div>
            <label className="mono block" style={{ color: "var(--muted)", marginBottom: 8 }}>
              Laufzeit
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={6}
                max={96}
                step={6}
                value={laufzeit}
                onChange={(e) => setLaufzeit(Number(e.target.value))}
                className="flex-1"
                style={{ accentColor: "var(--signal)" }}
              />
              <div className="display" style={{ fontSize: "1.1rem", minWidth: 110, textAlign: "right" }}>
                {laufzeit} Monate
              </div>
            </div>
          </div>

          {/* Schlussrate */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
              <label className="mono" style={{ color: "var(--muted)" }}>
                Schlussrate
              </label>
              <label className="flex items-center gap-2" style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
                <input
                  type="checkbox"
                  checked={withSchluss}
                  onChange={(e) => setWithSchluss(e.target.checked)}
                  style={{ accentColor: "var(--signal)" }}
                />
                <span>Mit Schlussrate</span>
              </label>
            </div>
            {withSchluss ? (
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={Math.round(financedAmount * 0.9)}
                  step={100}
                  value={Math.min(schlussrate, Math.round(financedAmount * 0.9))}
                  onChange={(e) => setSchlussrate(Number(e.target.value))}
                  className="flex-1"
                  style={{ accentColor: "var(--signal)" }}
                />
                <input
                  type="number"
                  min={0}
                  max={Math.round(financedAmount * 0.9)}
                  step={100}
                  value={schlussrate}
                  onChange={(e) =>
                    setSchlussrate(Math.max(0, Math.min(Math.round(financedAmount * 0.9), Number(e.target.value) || 0)))
                  }
                  style={{ ...inputBase, width: 110, textAlign: "right" }}
                />
                <span style={{ color: "var(--muted)" }}>€</span>
              </div>
            ) : (
              <p style={{ fontSize: "0.86rem", color: "var(--muted)" }}>
                Ohne Schlussrate wird der gesamte Finanzierungsbetrag über die Laufzeit abbezahlt.
              </p>
            )}
          </div>

        </div>

        {/* Ergebnis */}
        <div
          className="mt-10 p-6 radius"
          style={{ background: "var(--paper-sunk)", color: "var(--on-sunk)" }}
        >
          <div className="mono" style={{ color: "var(--on-sunk-muted)" }}>
            Monatliche Rate
          </div>
          <div
            className="display mt-2"
            style={{
              fontSize: "clamp(2.4rem, 4.2vw, 3.4rem)",
              letterSpacing: "-0.03em",
              color: "var(--signal)",
            }}
          >
            {monthly > 0 ? `${EURO_DEC.format(monthly)} €` : "— € / Monat"}
          </div>

          <dl className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4" style={{ fontSize: "0.86rem" }}>
            <div>
              <dt className="mono" style={{ color: "var(--on-sunk-muted)" }}>Fahrzeugpreis</dt>
              <dd className="mt-1" style={{ color: "var(--on-sunk)" }}>{EURO.format(price)} €</dd>
            </div>
            <div>
              <dt className="mono" style={{ color: "var(--on-sunk-muted)" }}>Anzahlung</dt>
              <dd className="mt-1" style={{ color: "var(--on-sunk)" }}>{EURO.format(Math.min(anzahlung, maxAnzahlung))} €</dd>
            </div>
            {withSchluss && (
              <div>
                <dt className="mono" style={{ color: "var(--on-sunk-muted)" }}>Schlussrate</dt>
                <dd className="mt-1" style={{ color: "var(--on-sunk)" }}>{EURO.format(Math.round(effectiveSchluss))} €</dd>
              </div>
            )}
            <div>
              <dt className="mono" style={{ color: "var(--on-sunk-muted)" }}>Laufzeit</dt>
              <dd className="mt-1" style={{ color: "var(--on-sunk)" }}>{laufzeit} Monate</dd>
            </div>
          </dl>

          <a
            href={anfrageHref}
            className="btn mt-6"
            style={{ background: "var(--paper)", color: "var(--ink)" }}
          >
            Finanzierungsangebot anfragen
            <span style={{ color: "var(--signal)" }}>→</span>
          </a>
        </div>

        <p className="mt-5" style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.5 }}>
          Unverbindliche Beispielrechnung ohne Berücksichtigung Ihrer persönlichen Bonität. Finanzierung über die Targobank, Laufzeiten von 6 bis 96 Monaten möglich, mit oder ohne Schlussrate, auf Wunsch auch ohne Anzahlung. Das verbindliche Angebot stellen wir Ihnen innerhalb von Minuten zur Verfügung.
        </p>
      </div>
    </details>
  );
}
