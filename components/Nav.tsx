"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE } from "@/lib/site";

function WhatsAppIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill={color}
      aria-hidden
      style={{ display: "block" }}
    >
      <path d="M16.001 2.667c-7.364 0-13.334 5.97-13.334 13.333 0 2.346.617 4.646 1.79 6.666L2.667 29.333l6.828-1.78a13.3 13.3 0 0 0 6.506 1.714h.006c7.363 0 13.333-5.97 13.333-13.333S23.37 2.667 16.001 2.667Zm0 24.333h-.005a11 11 0 0 1-5.606-1.535l-.402-.24-4.051 1.057 1.078-3.95-.263-.418a11.07 11.07 0 0 1-1.689-5.914c0-6.113 4.973-11.084 11.088-11.084A11.095 11.095 0 0 1 27.084 16c0 6.114-4.97 11.084-11.083 11.084Zm6.08-8.303c-.333-.166-1.972-.973-2.278-1.084-.306-.111-.528-.166-.75.166-.223.334-.862 1.084-1.057 1.306-.195.223-.389.25-.722.084-.333-.167-1.407-.519-2.68-1.654-.991-.885-1.661-1.979-1.856-2.313-.195-.333-.021-.513.146-.68.15-.149.333-.389.5-.584.167-.195.223-.333.333-.555.111-.223.056-.417-.028-.584-.083-.166-.75-1.805-1.027-2.472-.271-.65-.546-.562-.75-.572a13.5 13.5 0 0 0-.639-.012c-.223 0-.584.084-.89.417-.306.333-1.167 1.14-1.167 2.779 0 1.639 1.195 3.221 1.361 3.444.167.223 2.351 3.59 5.698 5.034.797.344 1.418.549 1.903.703.8.253 1.527.218 2.102.132.642-.096 1.972-.805 2.251-1.584.278-.779.278-1.446.195-1.584-.083-.139-.306-.223-.639-.389Z" />
    </svg>
  );
}

const SIDE_W = 300;
const SIDE_PX = `${SIDE_W}px`;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Desktop side-nav */}
      <aside
        className="hidden lg:block fixed top-0 left-0 bottom-0 z-40"
        style={{ width: SIDE_PX, padding: "18px 18px 18px 18px" }}
        aria-label="Hauptnavigation"
      >
        <div
          className="liquid flex flex-col"
          style={{ height: "100%", padding: "28px 26px" }}
        >
          <Link
            href="/"
            aria-label={SITE.name}
            className="inline-flex items-center"
          >
            <Image
              src="/brand/logo.png"
              alt={SITE.name}
              width={520}
              height={176}
              priority
              style={{ height: "44px", width: "auto" }}
            />
          </Link>

          <div
            className="mt-6"
            style={{
              fontSize: "0.98rem",
              letterSpacing: "-0.01em",
              color: "var(--ink)",
              lineHeight: 1.3,
            }}
          >
            Machen Sie aus einem Auto,
            <br />
            <span style={{ color: "var(--signal)" }}>Ihr Auto.</span>
          </div>

          <nav className="mt-10 flex-1">
            <ul className="flex flex-col gap-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="side-link"
                    data-active={isActive(n.href)}
                    style={{ fontSize: "1.02rem" }}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/fahrzeuge"
              className="btn"
              style={{ justifyContent: "space-between", width: "100%" }}
            >
              Fahrzeuge ansehen
              <span style={{ color: "var(--signal)" }}>→</span>
            </Link>
            <a
              href={SITE.contact.whatsappHref}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-between gap-3"
              style={{
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "saturate(180%) blur(16px)",
                WebkitBackdropFilter: "saturate(180%) blur(16px)",
                border: "1px solid rgba(255,255,255,0.65)",
                borderRadius: "var(--radius)",
                color: "var(--ink)",
                fontSize: "0.92rem",
                fontWeight: 500,
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.95), 0 10px 22px -14px rgba(10,11,12,0.3)",
              }}
            >
              <span className="inline-flex items-center gap-2">
                <WhatsAppIcon size={18} color="#0A0B0C" />
                WhatsApp
              </span>
              <span style={{ color: "var(--muted)", fontSize: "0.78rem" }}>
                {SITE.contact.whatsapp}
              </span>
            </a>
          </div>

          <div className="mt-6 flex flex-col gap-1" style={{ fontSize: "0.86rem" }}>
            <a href={SITE.contact.phoneHref} style={{ color: "var(--ink)" }}>
              {SITE.contact.phone}
            </a>
            <a href={SITE.contact.emailHref} style={{ color: "var(--muted)" }}>
              {SITE.contact.email}
            </a>
          </div>

          <div
            className="mt-6 pt-5 flex items-center justify-between"
            style={{
              borderTop: "1px solid rgba(10,11,12,0.08)",
              fontSize: "0.72rem",
              color: "var(--muted)",
            }}
          >
            <Link href="/impressum" style={{ color: "inherit" }}>
              Impressum
            </Link>
            <Link href="/datenschutz" style={{ color: "inherit" }}>
              Datenschutz
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile top-bar */}
      <header className="lg:hidden fixed inset-x-0 top-0 z-50" style={{ padding: "10px 12px" }}>
        <div
          className="liquid flex items-center justify-between"
          style={{ padding: "10px 14px" }}
        >
          <Link href="/" aria-label={SITE.name} onClick={() => setOpen(false)}>
            <Image
              src="/brand/logo.png"
              alt={SITE.name}
              width={520}
              height={176}
              priority
              style={{ height: "32px", width: "auto" }}
            />
          </Link>
          <button
            type="button"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex flex-col justify-center items-end relative"
            style={{ width: 32, height: 32, gap: 6 }}
          >
            <span
              style={{
                width: 22,
                height: 1.5,
                background: "var(--ink)",
                transform: open ? "translateY(4px) rotate(45deg)" : "none",
                transition: "transform 320ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
            <span
              style={{
                width: open ? 22 : 16,
                height: 1.5,
                background: "var(--ink)",
                transform: open ? "translateY(-4px) rotate(-45deg)" : "none",
                transition: "transform 320ms cubic-bezier(0.22,1,0.36,1), width 240ms ease",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ padding: "72px 12px 12px" }}
            aria-modal
            role="dialog"
          >
            <div
              className="liquid flex flex-col"
              style={{ height: "100%", padding: "24px 22px" }}
            >
              <div
                style={{
                  fontSize: "1.05rem",
                  letterSpacing: "-0.01em",
                  color: "var(--ink)",
                  lineHeight: 1.3,
                }}
              >
                Machen Sie aus einem Auto,
                <br />
                <span style={{ color: "var(--signal)" }}>Ihr Auto.</span>
              </div>

              <ul className="mt-8 flex flex-col gap-2">
                {NAV.map((n, i) => (
                  <motion.li
                    key={n.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.46,
                      delay: 0.08 + i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="display block"
                      style={{
                        fontSize: "clamp(1.9rem, 7vw, 2.6rem)",
                        color: "var(--ink)",
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                        padding: "6px 0",
                      }}
                    >
                      {n.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3">
                <Link
                  href="/fahrzeuge"
                  onClick={() => setOpen(false)}
                  className="btn"
                  style={{ justifyContent: "space-between" }}
                >
                  Fahrzeuge ansehen
                  <span style={{ color: "var(--signal)" }}>→</span>
                </Link>
                <a
                  href={SITE.contact.whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-between gap-3"
                  style={{
                    padding: "0.8rem 1rem",
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "saturate(180%) blur(16px)",
                    WebkitBackdropFilter: "saturate(180%) blur(16px)",
                    border: "1px solid rgba(255,255,255,0.6)",
                    borderRadius: "var(--radius)",
                    color: "var(--ink)",
                    fontSize: "0.96rem",
                    fontWeight: 500,
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.95), 0 10px 22px -14px rgba(10,11,12,0.3)",
                  }}
                >
                  <span className="inline-flex items-center gap-2">
                    <WhatsAppIcon size={18} color="#0A0B0C" />
                    WhatsApp
                  </span>
                  <span style={{ color: "var(--muted)", fontSize: "0.82rem" }}>
                    {SITE.contact.whatsapp}
                  </span>
                </a>

                <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(10,11,12,0.08)", fontSize: "0.82rem" }}>
                  <a href={SITE.contact.phoneHref} style={{ color: "var(--ink)" }}>
                    {SITE.contact.phone}
                  </a>
                  <a href={SITE.contact.emailHref} style={{ color: "var(--muted)" }}>
                    {SITE.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
