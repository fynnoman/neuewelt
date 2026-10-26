"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE } from "@/lib/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Only home has a dark hero behind the nav.
  const hasDarkHero = pathname === "/";
  // Dark hero + top of page = transparent/light-text nav. Everything else = glass/dark-text nav.
  const lightMode = hasDarkHero && !scrolled && !open;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{ transition: "padding 420ms cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        <div
          className={lightMode ? "" : "glass"}
          style={{
            padding: scrolled || open ? "12px 20px" : "22px 28px",
            transition:
              "padding 420ms cubic-bezier(0.22,1,0.36,1), background 320ms ease",
          }}
        >
          <div
            className="mx-auto flex items-center justify-between gap-8"
            style={{ maxWidth: "1680px" }}
          >
            <Link
              href="/"
              aria-label={SITE.name}
              className="flex items-center"
              onClick={() => setOpen(false)}
            >
              <Image
                src="/brand/logo.png"
                alt="Neue Welt Automobile"
                width={520}
                height={176}
                priority
                style={{
                  height: scrolled ? "42px" : "56px",
                  width: "auto",
                  filter: lightMode ? "invert(1) brightness(1.4)" : "none",
                  transition:
                    "height 420ms cubic-bezier(0.22,1,0.36,1), filter 320ms ease",
                }}
              />
            </Link>

            <nav>
              <ul className="hidden md:flex items-center gap-9">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      className="nav-link"
                      style={{
                        fontSize: "0.92rem",
                        color: lightMode ? "var(--paper)" : "var(--ink-soft)",
                        transition: "color 320ms ease",
                      }}
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Link
              href={SITE.contact.phoneHref}
              className="hidden sm:inline-flex items-center gap-2"
              style={{
                color: lightMode ? "var(--paper)" : "var(--ink)",
                fontSize: "0.9rem",
                transition: "color 320ms ease",
              }}
            >
              Termin vereinbaren
              <span style={{ color: "var(--signal)" }}>→</span>
            </Link>

            <button
              type="button"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex flex-col justify-center items-end relative z-10"
              style={{ width: 32, height: 32, gap: 7 }}
            >
              <span
                style={{
                  width: 22,
                  height: 1.5,
                  background: lightMode ? "var(--paper)" : "var(--ink)",
                  transformOrigin: "center",
                  transform: open ? "translateY(4.5px) rotate(45deg)" : "none",
                  transition:
                    "transform 320ms cubic-bezier(0.22,1,0.36,1), background 320ms ease",
                }}
              />
              <span
                style={{
                  width: open ? 22 : 16,
                  height: 1.5,
                  background: lightMode ? "var(--paper)" : "var(--ink)",
                  transformOrigin: "center",
                  transform: open ? "translateY(-5px) rotate(-45deg)" : "none",
                  transition:
                    "transform 320ms cubic-bezier(0.22,1,0.36,1), width 240ms ease, background 320ms ease",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: "var(--paper)" }}
            aria-modal
            role="dialog"
          >
            <div className="h-full flex flex-col justify-between px-7 pt-28 pb-10">
              <ul className="flex flex-col gap-4">
                {NAV.map((n, i) => (
                  <motion.li
                    key={n.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.56,
                      delay: 0.1 + i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="display block"
                      style={{
                        fontSize: "clamp(2.6rem, 11vw, 3.4rem)",
                        color: "var(--ink)",
                        lineHeight: 1,
                        letterSpacing: "-0.035em",
                        padding: "4px 0",
                      }}
                    >
                      {n.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-5"
              >
                <div className="mono" style={{ color: "var(--muted)" }}>Direkt sprechen</div>
                <a
                  href={SITE.contact.phoneHref}
                  className="display"
                  style={{ fontSize: "1.3rem", color: "var(--ink)", letterSpacing: "-0.02em" }}
                  onClick={() => setOpen(false)}
                >
                  {SITE.contact.phone}
                </a>
                <a
                  href={SITE.contact.emailHref}
                  style={{ color: "var(--ink-soft)", fontSize: "0.95rem" }}
                  onClick={() => setOpen(false)}
                >
                  {SITE.contact.email}
                </a>
                <div
                  className="pt-5 hairline flex items-center justify-between"
                  style={{ color: "var(--muted)", fontSize: "0.82rem" }}
                >
                  <span>{SITE.address.line2}</span>
                  <span>{SITE.hours.weekday}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
