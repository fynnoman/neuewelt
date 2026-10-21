"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function AnkaufPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = Array.from(data.entries())
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    const mail = `mailto:${SITE.contact.email.replace(/[\[\]]/g, "")}?subject=${encodeURIComponent(
      "Fahrzeugankauf-Anfrage"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mail;
    setSent(true);
  }

  return (
    <main className="pt-28 lg:pt-36">
      <header className="px-6 md:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-end">
        <div>
          <div className="mono" style={{ color: "var(--muted)" }}>Fahrzeugankauf</div>
          <h1
            className="display mt-6"
            style={{ fontSize: "clamp(2.6rem, 6.5vw, 5.4rem)", maxWidth: "20ch", letterSpacing: "-0.03em" }}
          >
            Wir kaufen Ihr Fahrzeug.
          </h1>
          <p className="lead mt-6 measure" style={{ fontSize: "1.15rem" }}>
            Faire Bewertung zum aktuellen Marktpreis. Angebot innerhalb eines
            Werktages. Barkauf oder Überweisung. Abmeldung und Transport auf
            Wunsch.
          </p>
        </div>

        <aside
          className="relative overflow-hidden radius"
          style={{
            background: "var(--paper-sunk)",
            padding: "40px 36px",
            minHeight: 320,
          }}
        >
          <div className="mono" style={{ color: "var(--on-sunk-muted)" }}>Ablauf</div>
          <ol className="mt-8 flex flex-col gap-6" style={{ fontSize: "1.02rem" }}>
            {[
              ["Formular", "Angaben und Fotos. Vier Minuten."],
              ["Bewertung", "Schätzung am gleichen Werktag."],
              ["Termin vor Ort", "Besichtigung in Saarlouis."],
              ["Übergabe", "Zahlung bei Abgabe. Abmeldung auf Wunsch."],
            ].map(([t, d], i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] items-baseline gap-5">
                <span
                  className="display"
                  style={{ fontSize: "1.1rem", color: "var(--signal)" }}
                >
                  0{i + 1}
                </span>
                <div>
                  <div style={{ color: "var(--on-sunk)" }}>{t}</div>
                  <div style={{ color: "var(--on-sunk-muted)", marginTop: 4, fontSize: "0.95rem" }}>
                    {d}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </header>

      <section className="mt-28 px-6 md:px-10 lg:px-14">
        <Reveal>
          <div className="mono" style={{ color: "var(--muted)" }}>Fahrzeugdaten</div>
          <h2 className="display mt-5" style={{ fontSize: "clamp(2rem, 3.4vw, 2.8rem)", maxWidth: "20ch", letterSpacing: "-0.03em" }}>
            Fahrzeug anbieten.
          </h2>
        </Reveal>

        <form
          onSubmit={handleSubmit}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8"
        >
          <Field name="name" label="Ihr Name" required />
          <Field name="email" label="E-Mail" type="email" required />
          <Field name="phone" label="Telefon (optional)" />
          <Field name="plz" label="PLZ · Ort" />

          <Field name="marke" label="Marke" required />
          <Field name="modell" label="Modell · Ausstattung" required />
          <Field name="ez" label="Erstzulassung (MM/JJJJ)" />
          <Field name="km" label="Kilometerstand" />

          <Field name="kraftstoff" label="Kraftstoff" />
          <Field name="getriebe" label="Getriebe" />
          <Field name="farbe" label="Farbe" />
          <Field name="wunschpreis" label="Wunschpreis (optional)" />

          <div className="md:col-span-2">
            <label className="small-caps block">Besonderheiten · Schäden · Historie</label>
            <textarea
              name="notes"
              rows={5}
              className="mt-3 w-full"
              style={{
                background: "transparent",
                borderBottom: "1px solid var(--ink)",
                padding: "10px 0",
                outline: "none",
                color: "var(--ink)",
                fontFamily: "inherit",
                fontSize: "1.05rem",
                resize: "vertical",
              }}
            />
          </div>

          <div className="md:col-span-2 mt-6 flex flex-wrap items-center justify-between gap-6">
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", maxWidth: "48ch" }}>
              Mit dem Absenden öffnet sich Ihr Mailprogramm mit allen Angaben
              zusammengefasst. Die Daten verlassen den Browser erst, wenn Sie die
              Mail wirklich senden.
            </p>
            <button type="submit" className="btn">
              Anfrage senden
              <span>→</span>
            </button>
          </div>
        </form>

        {sent && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
            style={{ color: "var(--signal-deep)" }}
          >
            Mail-Entwurf geöffnet. Wenn nichts passiert ist, schreiben Sie uns
            direkt an {SITE.contact.email}.
          </motion.p>
        )}
      </section>

      <section className="mt-32 px-6 md:px-10 py-24" style={{ background: "var(--paper-sunk)" }}>
        <div className="mx-auto max-w-[900px] text-center">
          <div className="mono" style={{ color: "var(--on-sunk-muted)" }}>Vor Ort</div>
          <p
            className="display mt-6"
            style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", lineHeight: 1.2, letterSpacing: "-0.03em", color: "var(--on-sunk)" }}
          >
            Fahrzeug direkt vorbeibringen.
          </p>
          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-8"
            style={{ fontSize: "1rem" }}
          >
            <a href={SITE.contact.phoneHref} className="rule-arrow" style={{ color: "var(--on-sunk)", borderBottom: "1px solid var(--on-sunk)", paddingBottom: 4 }}>
              {SITE.contact.phone}
            </a>
            <span style={{ color: "var(--on-sunk-muted)" }}>oder</span>
            <a href={SITE.contact.emailHref} className="rule-arrow" style={{ color: "var(--on-sunk)", borderBottom: "1px solid var(--on-sunk)", paddingBottom: 4 }}>
              {SITE.contact.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col">
      <span className="small-caps">
        {label} {required && <span style={{ color: "var(--signal)" }}>*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-3"
        style={{
          background: "transparent",
          borderBottom: "1px solid var(--ink)",
          padding: "10px 0",
          outline: "none",
          color: "var(--ink)",
          fontFamily: "inherit",
          fontSize: "1.05rem",
        }}
      />
    </label>
  );
}
