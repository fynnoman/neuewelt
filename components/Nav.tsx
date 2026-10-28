"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

const SIDE_W = 300;

const ITEM_VARIANTS = {
  hidden: { opacity: 0, x: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 340,
      damping: 32,
      mass: 0.8,
    },
  },
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<number | null>(null);

  const openPanel = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  };
  const schedulClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 220);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  useEffect(() => {
    setOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Desktop: fester Menü-Trigger rechts, nur sichtbar, Panel öffnet bei Hover */}
      <div
        className="hidden lg:block fixed top-0 right-0 bottom-0 z-50"
        style={{ pointerEvents: "none" }}
      >
        {/* Hover-Zone: schmaler, immer da, triggert Panel */}
        <div
          onMouseEnter={openPanel}
          onMouseLeave={schedulClose}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: 20,
            pointerEvents: "auto",
          }}
          aria-hidden
        />

        {/* Menü-Trigger (immer sichtbar) */}
        <motion.button
          type="button"
          onMouseEnter={openPanel}
          onFocus={openPanel}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          className="liquid liquid-hover"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 52,
            height: 52,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 999,
            pointerEvents: "auto",
            color: "var(--ink)",
          }}
        >
          <span
            aria-hidden
            style={{
              position: "relative",
              width: 20,
              height: 14,
              display: "inline-block",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 1.6,
                background: "var(--ink)",
                transform: open ? "translateY(6px) rotate(45deg)" : "none",
                transition: "transform 320ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "50%",
                height: 1.6,
                background: "var(--ink)",
                opacity: open ? 0 : 1,
                transition: "opacity 240ms ease",
                transform: "translateY(-50%)",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 1.6,
                background: "var(--ink)",
                transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
                transition: "transform 320ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          </span>
        </motion.button>

        {/* Side-Panel (sliding) */}
        <AnimatePresence>
          {open && (
            <motion.aside
              key="side-panel"
              initial={{ x: SIDE_W + 24, opacity: 0, scale: 0.985 }}
              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  x: { type: "spring", stiffness: 320, damping: 30, mass: 0.9 },
                  scale: { type: "spring", stiffness: 320, damping: 32, mass: 0.9 },
                  opacity: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              exit={{
                x: SIDE_W + 24,
                opacity: 0,
                scale: 0.985,
                transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
              }}
              onMouseEnter={openPanel}
              onMouseLeave={schedulClose}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: SIDE_W,
                padding: "18px 18px 18px 18px",
                pointerEvents: "auto",
                transformOrigin: "top right",
                willChange: "transform, opacity",
              }}
              aria-label="Hauptnavigation"
            >
              <motion.div
                className="liquid flex flex-col"
                style={{
                  height: "100%",
                  padding: "22px 22px",
                  overflowY: "auto",
                  overscrollBehavior: "contain",
                }}
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      delayChildren: 0.14,
                      staggerChildren: 0.045,
                    },
                  },
                }}
              >
                <motion.div variants={ITEM_VARIANTS}>
                  <Link
                    href="/"
                    aria-label={SITE.name}
                    className="inline-flex items-center"
                    onClick={() => setOpen(false)}
                  >
                    <Image
                      src="/brand/logo.png"
                      alt={SITE.name}
                      width={520}
                      height={176}
                      priority
                      style={{ height: "38px", width: "auto" }}
                    />
                  </Link>
                </motion.div>

                <motion.div
                  variants={ITEM_VARIANTS}
                  className="mt-4"
                  style={{
                    fontSize: "0.92rem",
                    letterSpacing: "-0.01em",
                    color: "var(--ink)",
                    lineHeight: 1.3,
                  }}
                >
                  Machen Sie aus einem Auto,
                  <br />
                  <span style={{ color: "var(--signal)" }}>Ihr Auto.</span>
                </motion.div>

                <motion.nav
                  className="mt-6"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        delayChildren: 0.05,
                        staggerChildren: 0.055,
                      },
                    },
                  }}
                >
                  <ul className="flex flex-col">
                    {NAV.map((n) => (
                      <motion.li key={n.href} variants={ITEM_VARIANTS}>
                        <Link
                          href={n.href}
                          className="side-link"
                          data-active={isActive(n.href)}
                          style={{ fontSize: "0.96rem", padding: "7px 0" }}
                          onClick={() => setOpen(false)}
                        >
                          {n.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.nav>

                <motion.div variants={ITEM_VARIANTS} className="mt-5 flex flex-col gap-2">
                  <Link
                    href="/fahrzeuge"
                    className="btn"
                    style={{ justifyContent: "space-between", width: "100%", padding: "0.7rem 1rem", fontSize: "0.9rem" }}
                    onClick={() => setOpen(false)}
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
                      padding: "0.6rem 0.9rem",
                      background: "rgba(255,255,255,0.55)",
                      backdropFilter: "saturate(180%) blur(16px)",
                      WebkitBackdropFilter: "saturate(180%) blur(16px)",
                      border: "1px solid rgba(255,255,255,0.65)",
                      borderRadius: "var(--radius)",
                      color: "var(--ink)",
                      fontSize: "0.86rem",
                      fontWeight: 500,
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.95), 0 10px 22px -14px rgba(10,11,12,0.3)",
                    }}
                  >
                    <span className="inline-flex items-center gap-2">
                      <WhatsAppIcon size={16} color="#0A0B0C" />
                      WhatsApp
                    </span>
                  </a>
                  <a
                    href={SITE.social.instagram}
                    target="_blank"
                    rel="noopener"
                    aria-label="Instagram @neueweltautomobile"
                    className="inline-flex items-center justify-between gap-3"
                    style={{
                      padding: "0.6rem 0.9rem",
                      background: "rgba(255,255,255,0.55)",
                      backdropFilter: "saturate(180%) blur(16px)",
                      WebkitBackdropFilter: "saturate(180%) blur(16px)",
                      border: "1px solid rgba(255,255,255,0.65)",
                      borderRadius: "var(--radius)",
                      color: "var(--ink)",
                      fontSize: "0.86rem",
                      fontWeight: 500,
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.95), 0 10px 22px -14px rgba(10,11,12,0.3)",
                    }}
                  >
                    <span className="inline-flex items-center gap-2">
                      <InstagramIcon size={16} color="#0A0B0C" />
                      Instagram
                    </span>
                  </a>
                </motion.div>

                <motion.div variants={ITEM_VARIANTS} className="mt-5 flex flex-col gap-0.5" style={{ fontSize: "0.82rem" }}>
                  <a href={SITE.contact.phoneLandlineHref} style={{ color: "var(--ink)" }}>
                    {SITE.contact.phoneLandline}
                  </a>
                  <a href={SITE.contact.phoneHref} style={{ color: "var(--ink-soft)", fontSize: "0.78rem" }}>
                    {SITE.contact.phone}
                  </a>
                  <a href={SITE.contact.emailHref} style={{ color: "var(--muted)", fontSize: "0.78rem" }}>
                    {SITE.contact.email}
                  </a>
                </motion.div>

                <motion.div
                  variants={ITEM_VARIANTS}
                  className="mt-5 pt-4 flex items-center justify-between"
                  style={{
                    borderTop: "1px solid rgba(10,11,12,0.08)",
                    fontSize: "0.7rem",
                    color: "var(--muted)",
                  }}
                >
                  <Link href="/impressum" style={{ color: "inherit" }}>
                    Impressum
                  </Link>
                  <Link href="/datenschutz" style={{ color: "inherit" }}>
                    Datenschutz
                  </Link>
                </motion.div>
              </motion.div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile top-bar */}
      <header className="lg:hidden fixed inset-x-0 top-0 z-50" style={{ padding: "10px 12px" }}>
        <div
          className="liquid flex items-center justify-between"
          style={{ padding: "10px 14px" }}
        >
          <Link href="/" aria-label={SITE.name} onClick={() => setMobileOpen(false)}>
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
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex flex-col justify-center items-end relative"
            style={{ width: 32, height: 32, gap: 6 }}
          >
            <span
              style={{
                width: 22,
                height: 1.5,
                background: "var(--ink)",
                transform: mobileOpen ? "translateY(4px) rotate(45deg)" : "none",
                transition: "transform 320ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
            <span
              style={{
                width: mobileOpen ? 22 : 16,
                height: 1.5,
                background: "var(--ink)",
                transform: mobileOpen ? "translateY(-4px) rotate(-45deg)" : "none",
                transition: "transform 320ms cubic-bezier(0.22,1,0.36,1), width 240ms ease",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
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
                      onClick={() => setMobileOpen(false)}
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
                  onClick={() => setMobileOpen(false)}
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
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram @neueweltautomobile"
                  onClick={() => setMobileOpen(false)}
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
                    <InstagramIcon size={18} color="#0A0B0C" />
                    Instagram
                  </span>
                  <span style={{ color: "var(--muted)", fontSize: "0.82rem" }}>
                    @neueweltautomobile
                  </span>
                </a>

                <div className="pt-3 flex flex-col gap-1" style={{ borderTop: "1px solid rgba(10,11,12,0.08)", fontSize: "0.82rem" }}>
                  <a href={SITE.contact.phoneLandlineHref} style={{ color: "var(--ink)" }}>
                    {SITE.contact.phoneLandline}
                  </a>
                  <a href={SITE.contact.phoneHref} style={{ color: "var(--ink-soft)", fontSize: "0.78rem" }}>
                    {SITE.contact.phone}
                  </a>
                  <a href={SITE.contact.emailHref} style={{ color: "var(--muted)", fontSize: "0.78rem" }}>
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
