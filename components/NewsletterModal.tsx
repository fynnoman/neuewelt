"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "nwa-newsletter-state";
const DELAY_MS = 15000;

type Stored = {
  status: "dismissed" | "subscribed";
  at: number;
};

function readStored(): Stored | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Stored;
  } catch {
    return null;
  }
}

function writeStored(v: Stored) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
  } catch {
    // ignore
  }
}

export default function NewsletterModal() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const stored = readStored();
    if (stored) return; // schon abgewiesen oder abonniert

    const timer = window.setTimeout(() => setVisible(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const dismiss = () => {
    writeStored({ status: "dismissed", at: Date.now() });
    setVisible(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        if (data.error === "invalid_email") {
          setErrorMsg("Bitte prüfen Sie Ihre E-Mail-Adresse.");
        } else {
          setErrorMsg("Das hat gerade nicht geklappt. Bitte später erneut versuchen.");
        }
        setSubmitting(false);
        return;
      }
      writeStored({ status: "subscribed", at: Date.now() });
      setSubscribed(true);
      setSubmitting(false);
      window.setTimeout(() => setVisible(false), 2600);
    } catch {
      setErrorMsg("Verbindung unterbrochen. Bitte später erneut versuchen.");
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="nl-scrim"
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center safe-x safe-b"
          style={{
            padding: "12px",
            background: "rgba(10,11,12,0.28)",
            backdropFilter: "blur(10px) saturate(140%)",
            WebkitBackdropFilter: "blur(10px) saturate(140%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={dismiss}
          role="dialog"
          aria-modal
          aria-label="Fahrzeug-Newsletter abonnieren"
        >
          <motion.div
            key="nl-panel"
            className="liquid"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 18, scale: 0.97, filter: "blur(10px)" }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 28,
                mass: 0.9,
              },
            }}
            exit={{
              opacity: 0,
              y: 14,
              scale: 0.97,
              filter: "blur(8px)",
              transition: { duration: 0.26, ease: [0.4, 0, 1, 1] },
            }}
            style={{
              width: "100%",
              maxWidth: 460,
              padding: "clamp(22px, 5vw, 40px)",
              position: "relative",
            }}
          >
            <button
              type="button"
              aria-label="Schließen"
              onClick={dismiss}
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                width: 36,
                height: 36,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 999,
                background: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.65)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.95), 0 6px 14px -8px rgba(10,11,12,0.3)",
                color: "var(--ink)",
                cursor: "pointer",
                fontSize: 16,
                lineHeight: 1,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.div
                  key="nl-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                >
                  <div className="mono" style={{ color: "var(--muted)" }}>
                    Fahrzeug-Newsletter
                  </div>
                  <h2
                    className="display mt-4"
                    style={{
                      fontSize: "clamp(1.6rem, 2.6vw, 2rem)",
                      letterSpacing: "-0.025em",
                      lineHeight: 1.1,
                      maxWidth: "22ch",
                      color: "var(--ink)",
                    }}
                  >
                    Neue Fahrzeuge <span style={{ color: "var(--signal)" }}>zuerst.</span>
                  </h2>
                  <p
                    className="mt-4"
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: "0.98rem",
                      lineHeight: 1.5,
                      maxWidth: "38ch",
                    }}
                  >
                    Erfahren Sie als Erster, wenn ein passendes Fahrzeug in unseren Bestand kommt. Jederzeit mit einem Klick wieder abbestellbar.
                  </p>

                  <form className="mt-7" onSubmit={onSubmit} noValidate>
                    <label
                      className="mono"
                      style={{ color: "var(--muted)", display: "block" }}
                    >
                      E-Mail
                    </label>
                    <div className="mt-3 flex flex-col gap-2">
                      <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        placeholder="ihre@email.de"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: "100%",
                          background: "rgba(255,255,255,0.6)",
                          border: "1px solid rgba(10,11,12,0.1)",
                          outline: "none",
                          padding: "0.9rem 1rem",
                          fontSize: "16px",
                          color: "var(--ink)",
                          fontFamily: "var(--font-sans)",
                          borderRadius: "var(--radius)",
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
                        }}
                      />
                      <button
                        type="submit"
                        className="btn justify-center"
                        disabled={submitting}
                        style={{
                          width: "100%",
                          padding: "0.8rem 1rem",
                          fontSize: "0.95rem",
                          opacity: submitting ? 0.65 : 1,
                          cursor: submitting ? "wait" : "pointer",
                        }}
                      >
                        {submitting ? "Wird gesendet…" : "Abonnieren"}
                        {!submitting && <span style={{ color: "var(--signal)" }}>→</span>}
                      </button>
                    </div>
                    {errorMsg && (
                      <p className="mt-3" style={{ color: "var(--signal-deep)", fontSize: "0.85rem" }}>
                        {errorMsg}
                      </p>
                    )}

                    <p
                      className="mt-4"
                      style={{ color: "var(--muted)", fontSize: "0.78rem", lineHeight: 1.5 }}
                    >
                      Mit dem Absenden willige ich in die Verarbeitung meiner E-Mail-Adresse zum Versand des Fahrzeug-Newsletters ein. Hinweise zum Widerruf und Datenschutz finden Sie in unserer{" "}
                      <a href="/datenschutz" style={{ color: "var(--ink)", textDecoration: "underline" }}>
                        Datenschutzerklärung
                      </a>
                      .
                    </p>

                    <button
                      type="button"
                      onClick={dismiss}
                      className="mt-4 mono"
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: 0,
                        color: "var(--muted)",
                        cursor: "pointer",
                      }}
                    >
                      Vielleicht später
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="nl-thanks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ textAlign: "center", padding: "20px 0 10px" }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 999,
                      background: "rgba(208,26,32,0.1)",
                      border: "1px solid rgba(208,26,32,0.25)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                    aria-hidden
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12.5l4.5 4.5L19 7"
                        stroke="var(--signal)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h2
                    className="display"
                    style={{
                      fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)",
                      letterSpacing: "-0.025em",
                      color: "var(--ink)",
                    }}
                  >
                    Vielen Dank.
                  </h2>
                  <p
                    className="mt-3"
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: "0.98rem",
                      maxWidth: "32ch",
                      marginInline: "auto",
                      lineHeight: 1.5,
                    }}
                  >
                    Eine Bestätigung ist in Ihrem Postfach. Wir melden uns, sobald neue Fahrzeuge in unseren Bestand kommen.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
