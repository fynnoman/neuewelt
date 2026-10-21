import Link from "next/link";
import Image from "next/image";
import { NAV, SITE } from "@/lib/site";

const LEISTUNGEN = [
  { label: "Werkstatt", href: "/service" },
  { label: "Fahrzeugaufbereitung", href: "/service" },
  { label: "Reifen & Räder", href: "/service" },
  { label: "Zulassungsservice", href: "/service" },
  { label: "Fahrzeugüberführung", href: "/service" },
  { label: "Finanzierung", href: "/service" },
];

export default function Footer() {
  return (
    <footer
      className="mt-32 relative overflow-hidden"
      style={{ background: "var(--void)", color: "var(--paper)" }}
    >
      {/* Top edge accent */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(208,26,32,0.55), transparent)",
        }}
      />

      <div className="px-6 md:px-10 lg:px-14 pt-20 lg:pt-28 pb-10">
        {/* TOP: Brand + CTA line */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-end pb-16 border-b border-white/10">
          <div>
            <Image
              src="/brand/logo.png"
              alt="Neue Welt Automobile"
              width={520}
              height={176}
              style={{
                height: "44px",
                width: "auto",
                filter: "invert(1) brightness(1.4)",
              }}
            />
            <h2
              className="display mt-10"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.6rem)",
                letterSpacing: "-0.035em",
                color: "var(--paper)",
                maxWidth: "20ch",
                lineHeight: 1.02,
              }}
            >
              Vorbeikommen oder anrufen.
            </h2>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <a
              href={SITE.contact.phoneHref}
              className="display"
              style={{
                fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
                color: "var(--paper)",
                letterSpacing: "-0.03em",
              }}
            >
              {SITE.contact.phone}
            </a>
            <a
              href={SITE.contact.emailHref}
              style={{ color: "rgba(251,251,249,0.72)", fontSize: "1rem" }}
            >
              {SITE.contact.email}
            </a>
            <Link
              href="/ankauf"
              className="btn mt-3"
              style={{
                background: "var(--paper)",
                color: "var(--ink)",
                alignSelf: "flex-start",
              }}
            >
              Fahrzeug anbieten
              <span style={{ color: "var(--signal)" }}>→</span>
            </Link>
          </div>
        </div>

        {/* MIDDLE: 4 column link grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-14 py-16">
          {/* Navigation */}
          <div>
            <div
              className="mono"
              style={{ color: "rgba(251,251,249,0.5)" }}
            >
              Seite
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="footer-link"
                    style={{ color: "var(--paper)", fontSize: "0.98rem" }}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Leistungen */}
          <div>
            <div className="mono" style={{ color: "rgba(251,251,249,0.5)" }}>
              Leistungen
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {LEISTUNGEN.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="footer-link"
                    style={{ color: "rgba(251,251,249,0.82)", fontSize: "0.98rem" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <div className="mono" style={{ color: "rgba(251,251,249,0.5)" }}>
              Kontakt
            </div>
            <ul className="mt-6 flex flex-col gap-3" style={{ fontSize: "0.98rem" }}>
              <li>
                <a href={SITE.contact.phoneHref} style={{ color: "var(--paper)" }}>
                  {SITE.contact.phone}
                </a>
              </li>
              <li>
                <a href={SITE.contact.emailHref} style={{ color: "rgba(251,251,249,0.82)" }}>
                  {SITE.contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 mono" style={{ color: "rgba(251,251,249,0.5)" }}>
              Öffnungszeiten
            </div>
            <ul className="mt-4 flex flex-col gap-1.5" style={{ fontSize: "0.95rem", color: "rgba(251,251,249,0.82)" }}>
              <li>{SITE.hours.weekday}</li>
              <li>{SITE.hours.saturday}</li>
            </ul>
          </div>

          {/* Adresse */}
          <div>
            <div className="mono" style={{ color: "rgba(251,251,249,0.5)" }}>
              Adresse
            </div>
            <div
              className="mt-6"
              style={{ color: "var(--paper)", fontSize: "0.98rem", lineHeight: 1.6 }}
            >
              {SITE.name}
              <br />
              <span style={{ color: "rgba(251,251,249,0.82)" }}>
                {SITE.address.line1}
                <br />
                {SITE.address.line2}
              </span>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${SITE.address.line1} ${SITE.address.line2}`
              )}`}
              target="_blank"
              rel="noopener"
              className="mono mt-6 inline-flex items-center gap-2"
              style={{ color: "var(--paper)" }}
            >
              Route planen <span style={{ color: "var(--signal)" }}>→</span>
            </a>
          </div>
        </div>

        {/* BIG WORDMARK */}
        <div className="pt-10 pb-8 border-t border-white/10">
          <div
            className="display select-none"
            style={{
              fontSize: "clamp(3rem, 12vw, 14rem)",
              letterSpacing: "-0.045em",
              color: "var(--paper)",
              lineHeight: 0.9,
              opacity: 0.95,
            }}
          >
            Neue Welt Automobile<span style={{ color: "var(--signal)" }}>.</span>
          </div>
        </div>

        {/* BOTTOM: legal */}
        <div
          className="pt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10"
          style={{ fontSize: "0.82rem", color: "rgba(251,251,249,0.55)" }}
        >
          <span>© {new Date().getFullYear()} {SITE.name}. Alle Rechte vorbehalten.</span>
          <div className="flex items-center gap-6">
            <Link href="/impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </Link>
            <span style={{ opacity: 0.6 }}>{SITE.domain}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
