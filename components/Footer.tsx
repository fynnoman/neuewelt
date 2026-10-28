import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

function InstagramIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ display: "block" }}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill={color} stroke="none" />
    </svg>
  );
}

const LEISTUNGEN = [
  { label: "Neuwagenbeschaffung", href: "/service" },
  { label: "Fahrzeugaufbereitung", href: "/service" },
  { label: "Fahrzeugfolierungen & Scheibentönung", href: "/service" },
  { label: "Zulassungsservice", href: "/service" },
  { label: "Fahrzeugüberführung deutschlandweit", href: "/service" },
  { label: "Finanzierung über die Targobank", href: "/service" },
  { label: "Garantie bis zu 36 Monate", href: "/service" },
];

export default function Footer() {
  return (
    <footer
      className="mt-32 relative overflow-hidden"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      {/* Top edge accent */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(208,26,32,0.4), transparent)",
        }}
      />

      <div className="px-5 md:px-10 lg:px-14 pt-20 lg:pt-28 pb-10">
        {/* TOP: Brand + CTA line */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-end pb-16"
          style={{ borderBottom: "1px solid var(--fog-200)" }}
        >
          <div>
            <h2
              className="display"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.6rem)",
                letterSpacing: "-0.035em",
                color: "var(--ink)",
                maxWidth: "22ch",
                lineHeight: 1.02,
              }}
            >
              Machen Sie aus einem Auto,{" "}
              <span style={{ color: "var(--signal)" }}>Ihr Auto.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <a
              href={SITE.contact.phoneLandlineHref}
              className="display"
              style={{
                fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
                color: "var(--ink)",
                letterSpacing: "-0.03em",
              }}
            >
              {SITE.contact.phoneLandline}
            </a>
            <a
              href={SITE.contact.phoneHref}
              style={{
                fontSize: "1rem",
                color: "var(--ink-soft)",
                letterSpacing: "-0.02em",
                marginTop: "-0.5rem",
              }}
            >
              {SITE.contact.phone}
            </a>
            <a
              href={SITE.contact.emailHref}
              style={{ color: "var(--muted)", fontSize: "1rem" }}
            >
              {SITE.contact.email}
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener"
              aria-label="Instagram @neueweltautomobile"
              className="inline-flex items-center gap-3"
              style={{
                alignSelf: "flex-start",
                padding: "0.55rem 0.95rem",
                background: "transparent",
                color: "var(--ink)",
                border: "1px solid var(--fog-200)",
                borderRadius: 999,
                fontSize: "0.9rem",
                fontWeight: 500,
                marginTop: "0.25rem",
              }}
            >
              <InstagramIcon size={18} color="#0A0B0C" />
              @neueweltautomobile
            </a>
            <Link
              href="/ankauf"
              className="btn mt-3"
              style={{
                background: "var(--ink)",
                color: "var(--paper)",
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
            <div className="mono" style={{ color: "var(--muted)", fontWeight: 700 }}>
              Seite
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="footer-link"
                    style={{ color: "var(--ink)", fontSize: "0.98rem", fontWeight: 600 }}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Leistungen */}
          <div>
            <div className="mono" style={{ color: "var(--muted)", fontWeight: 700 }}>
              Leistungen
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {LEISTUNGEN.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="footer-link"
                    style={{ color: "var(--ink)", fontSize: "0.98rem", fontWeight: 600 }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <div className="mono" style={{ color: "var(--muted)", fontWeight: 700 }}>
              Kontakt
            </div>
            <ul className="mt-6 flex flex-col gap-3" style={{ fontSize: "0.98rem" }}>
              <li>
                <a href={SITE.contact.phoneLandlineHref} style={{ color: "var(--ink)", fontWeight: 600 }}>
                  {SITE.contact.phoneLandline}
                </a>
              </li>
              <li>
                <a href={SITE.contact.phoneHref} style={{ color: "var(--ink)", fontWeight: 600 }}>
                  {SITE.contact.phone}
                </a>
              </li>
              <li>
                <a href={SITE.contact.emailHref} style={{ color: "var(--ink)", fontWeight: 600 }}>
                  {SITE.contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 mono" style={{ color: "var(--muted)", fontWeight: 700 }}>
              Öffnungszeiten
            </div>
            <ul
              className="mt-4 flex flex-col gap-1.5"
              style={{ fontSize: "0.95rem", color: "var(--ink)", fontWeight: 600 }}
            >
              <li>{SITE.hours.weekday}</li>
              <li>{SITE.hours.saturday}</li>
            </ul>
          </div>

          {/* Adresse */}
          <div>
            <div className="mono" style={{ color: "var(--muted)", fontWeight: 700 }}>
              Adresse
            </div>
            <div
              className="mt-6"
              style={{ color: "var(--ink)", fontSize: "0.98rem", lineHeight: 1.6, fontWeight: 600 }}
            >
              {SITE.name}
              <br />
              <span style={{ color: "var(--ink)", fontWeight: 600 }}>
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
              style={{ color: "var(--ink)", fontWeight: 700 }}
            >
              Route planen <span style={{ color: "var(--signal)" }}>→</span>
            </a>
          </div>
        </div>

        {/* BOTTOM: legal */}
        <div
          className="pt-8 flex flex-wrap items-center justify-between gap-4"
          style={{
            fontSize: "0.82rem",
            color: "var(--muted)",
            borderTop: "1px solid var(--fog-200)",
          }}
        >
          <span>
            © {new Date().getFullYear()} {SITE.name}. Alle Rechte vorbehalten.
          </span>
          <div className="flex items-center gap-6">
            <Link href="/impressum" style={{ color: "var(--ink-soft)" }}>
              Impressum
            </Link>
            <Link href="/datenschutz" style={{ color: "var(--ink-soft)" }}>
              Datenschutz
            </Link>
            <span style={{ opacity: 0.6 }}>{SITE.domain}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
