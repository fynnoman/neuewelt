"use client";

import Link from "next/link";
import { useState } from "react";
import SlideIn from "@/components/SlideIn";
import { SITE } from "@/lib/site";

function WhatsAppIcon({ size = 18, color = "#0A0B0C" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill={color} aria-hidden style={{ display: "block" }}>
      <path d="M16.001 2.667c-7.364 0-13.334 5.97-13.334 13.333 0 2.346.617 4.646 1.79 6.666L2.667 29.333l6.828-1.78a13.3 13.3 0 0 0 6.506 1.714h.006c7.363 0 13.333-5.97 13.333-13.333S23.37 2.667 16.001 2.667Zm0 24.333h-.005a11 11 0 0 1-5.606-1.535l-.402-.24-4.051 1.057 1.078-3.95-.263-.418a11.07 11.07 0 0 1-1.689-5.914c0-6.113 4.973-11.084 11.088-11.084A11.095 11.095 0 0 1 27.084 16c0 6.114-4.97 11.084-11.083 11.084Zm6.08-8.303c-.333-.166-1.972-.973-2.278-1.084-.306-.111-.528-.166-.75.166-.223.334-.862 1.084-1.057 1.306-.195.223-.389.25-.722.084-.333-.167-1.407-.519-2.68-1.654-.991-.885-1.661-1.979-1.856-2.313-.195-.333-.021-.513.146-.68.15-.149.333-.389.5-.584.167-.195.223-.333.333-.555.111-.223.056-.417-.028-.584-.083-.166-.75-1.805-1.027-2.472-.271-.65-.546-.562-.75-.572a13.5 13.5 0 0 0-.639-.012c-.223 0-.584.084-.89.417-.306.333-1.167 1.14-1.167 2.779 0 1.639 1.195 3.221 1.361 3.444.167.223 2.351 3.59 5.698 5.034.797.344 1.418.549 1.903.703.8.253 1.527.218 2.102.132.642-.096 1.972-.805 2.251-1.584.278-.779.278-1.446.195-1.584-.083-.139-.306-.223-.639-.389Z" />
    </svg>
  );
}

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.6)",
  border: "1px solid rgba(10,11,12,0.1)",
  padding: "0.85rem 1rem",
  fontSize: "0.98rem",
  color: "var(--ink)",
  outline: "none",
  borderRadius: "var(--radius)",
  fontFamily: "var(--font-sans)",
};

export default function KontaktPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // UI only — Submit noch nicht verdrahtet.
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <main className="pt-28 lg:pt-20 px-6 md:px-10 lg:px-14 pb-24">
      <header>
        <SlideIn direction="up">
          <div className="mono" style={{ color: "var(--muted)" }}>Kontakt</div>
        </SlideIn>
        <SlideIn direction="up" delay={0.1}>
          <h1
            className="display mt-6"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", maxWidth: "22ch", letterSpacing: "-0.03em" }}
          >
            Schreiben Sie uns.
          </h1>
        </SlideIn>
        <SlideIn direction="up" delay={0.2}>
          <p className="lead mt-6" style={{ maxWidth: "50ch" }}>
            Persönlich im Haus, telefonisch, per E-Mail oder WhatsApp. Nutzen Sie
            das Formular — wir melden uns innerhalb eines Werktages zurück.
          </p>
        </SlideIn>
      </header>

      <section className="mt-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-10 items-start">
        {/* Formular */}
        <SlideIn direction="up" delay={0.3}>
          <form
            className="liquid"
            style={{ padding: "clamp(28px, 4vw, 44px)" }}
            onSubmit={onSubmit}
            noValidate
          >
            <div className="mono" style={{ color: "var(--muted)" }}>Anfrage</div>
            <h2
              className="display mt-4"
              style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)", letterSpacing: "-0.025em" }}
            >
              Ihr direkter Draht zu uns.
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="flex flex-col gap-2">
                <span className="mono" style={{ color: "var(--muted)" }}>Name</span>
                <input type="text" name="name" required style={INPUT_STYLE} placeholder="Vor- und Nachname" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="mono" style={{ color: "var(--muted)" }}>E-Mail</span>
                <input type="email" name="email" required style={INPUT_STYLE} placeholder="name@domain.de" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="mono" style={{ color: "var(--muted)" }}>Telefon</span>
                <input type="tel" name="phone" style={INPUT_STYLE} placeholder="Optional" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="mono" style={{ color: "var(--muted)" }}>Interesse</span>
                <select name="interesse" style={{ ...INPUT_STYLE, appearance: "none" }}>
                  <option>Fahrzeug kaufen</option>
                  <option>Fahrzeug verkaufen</option>
                  <option>Werkstatt und Service</option>
                  <option>Finanzierung</option>
                  <option>Garantie</option>
                  <option>Sonstiges</option>
                </select>
              </label>
            </div>

            <label className="mt-5 flex flex-col gap-2">
              <span className="mono" style={{ color: "var(--muted)" }}>Nachricht</span>
              <textarea
                name="nachricht"
                required
                rows={5}
                style={{ ...INPUT_STYLE, resize: "vertical" }}
                placeholder="Was können wir für Sie tun?"
              />
            </label>

            <label className="mt-5 flex items-start gap-3" style={{ fontSize: "0.86rem", color: "var(--muted)" }}>
              <input type="checkbox" required style={{ marginTop: 4 }} />
              <span>
                Ich habe die <Link href="/datenschutz" className="underline" style={{ color: "var(--ink)" }}>Datenschutzerklärung</Link> gelesen und bin mit der Verarbeitung meiner Daten zum Zweck der Kontaktaufnahme einverstanden.
              </span>
            </label>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="submit" className="btn" style={{ background: "var(--ink)", color: "var(--paper)" }}>
                Nachricht senden <span style={{ color: "var(--signal)" }}>→</span>
              </button>
              {sent && (
                <span style={{ color: "var(--signal)", fontSize: "0.9rem" }}>
                  Danke — der Formular-Versand ist noch nicht verdrahtet.
                </span>
              )}
            </div>
          </form>
        </SlideIn>

        {/* Kontaktpanel */}
        <SlideIn direction="up" delay={0.4}>
          <aside className="flex flex-col gap-4">
            <div className="liquid" style={{ padding: "clamp(24px, 3vw, 32px)" }}>
              <div className="mono" style={{ color: "var(--muted)" }}>Direkt sprechen</div>
              <a
                href={SITE.contact.phoneHref}
                className="display block mt-4"
                style={{ fontSize: "1.4rem", color: "var(--ink)", letterSpacing: "-0.02em" }}
              >
                {SITE.contact.phone}
              </a>
              <a
                href={SITE.contact.emailHref}
                className="block mt-2"
                style={{ color: "var(--muted)", fontSize: "0.95rem" }}
              >
                {SITE.contact.email}
              </a>
            </div>

            <a
              href={SITE.contact.whatsappHref}
              target="_blank"
              rel="noopener"
              className="liquid liquid-hover inline-flex items-center justify-between gap-4"
              style={{ padding: "clamp(20px, 3vw, 28px) clamp(22px, 3vw, 32px)", color: "var(--ink)" }}
            >
              <span className="inline-flex items-center gap-3">
                <WhatsAppIcon size={22} color="#0A0B0C" />
                <span className="display" style={{ fontSize: "1.1rem", letterSpacing: "-0.015em" }}>
                  WhatsApp
                </span>
              </span>
              <span className="mono" style={{ color: "var(--muted)" }}>
                {SITE.contact.whatsapp}
              </span>
            </a>

            <div className="liquid" style={{ padding: "clamp(24px, 3vw, 32px)" }}>
              <div className="mono" style={{ color: "var(--muted)" }}>Adresse</div>
              <div className="mt-4" style={{ color: "var(--ink)", lineHeight: 1.5 }}>
                {SITE.name}
                <br />
                <span style={{ color: "var(--muted)" }}>
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                </span>
              </div>
            </div>

            <div className="liquid" style={{ padding: "clamp(24px, 3vw, 32px)" }}>
              <div className="mono" style={{ color: "var(--muted)" }}>Öffnungszeiten</div>
              <div className="mt-4" style={{ color: "var(--ink)", lineHeight: 1.5 }}>
                {SITE.hours.weekday}
                <br />
                {SITE.hours.saturday}
                <br />
                <span style={{ color: "var(--muted)" }}>{SITE.hours.note}</span>
              </div>
            </div>
          </aside>
        </SlideIn>
      </section>
    </main>
  );
}
