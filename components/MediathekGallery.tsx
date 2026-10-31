"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { MediaItem } from "@/lib/mediathek";

type Props = {
  items: MediaItem[];
};

export default function MediathekGallery({ items }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const openAt = useCallback((idx: number) => setOpen(idx), []);
  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(() => {
    setOpen((v) => (v === null ? v : (v + 1) % items.length));
  }, [items.length]);
  const prev = useCallback(() => {
    setOpen((v) => (v === null ? v : (v - 1 + items.length) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev]);

  if (items.length === 0) return null;

  const current = open !== null ? items[open] : null;

  return (
    <>
      <style>{`
        .nwa-flow {
          --row-h: 160px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        @media (min-width: 640px) { .nwa-flow { --row-h: 220px; gap: 8px; } }
        @media (min-width: 1024px) { .nwa-flow { --row-h: 280px; gap: 10px; } }
        @media (min-width: 1440px) { .nwa-flow { --row-h: 320px; } }
        .nwa-flow > button {
          padding: 0;
          margin: 0;
          border: 0;
          background: transparent;
          cursor: zoom-in;
          display: block;
          position: relative;
          height: var(--row-h);
          overflow: hidden;
          flex-grow: 1;
        }
        .nwa-flow > button > img {
          display: block;
          height: 100%;
          width: auto;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nwa-flow > button:hover > img {
          transform: scale(1.03);
        }
      `}</style>

      <div className="nwa-flow">
        {items.map((it, i) => {
          const ratio = it.width / it.height;
          return (
            <button
              key={it.src}
              type="button"
              onClick={() => openAt(i)}
              aria-label="Bild in Vollansicht oeffnen"
              style={{
                flexBasis: `calc(var(--row-h) * ${ratio})`,
                aspectRatio: `${it.width} / ${it.height}`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.src} alt={it.alt} loading={i < 8 ? "eager" : "lazy"} />
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            key="nwa-lightbox"
            className="fixed inset-0"
            style={{
              zIndex: 100,
              background: "rgba(10,11,12,0.94)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            onTouchStart={(e) => {
              const t = e.touches[0];
              touchStart.current = { x: t.clientX, y: t.clientY };
            }}
            onTouchEnd={(e) => {
              const start = touchStart.current;
              if (!start) return;
              const t = e.changedTouches[0];
              const dx = t.clientX - start.x;
              const dy = t.clientY - start.y;
              touchStart.current = null;
              if (Math.abs(dx) < 50 || Math.abs(dy) > 80) return;
              if (dx < 0) next();
              else prev();
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Schliessen"
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                width: 44,
                height: 44,
                borderRadius: 999,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Vorheriges Bild"
                  style={navBtnStyle("left")}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Naechstes Bild"
                  style={navBtnStyle("right")}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}

            <motion.div
              key={`lb-${open}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "min(92vw, 1600px)",
                maxHeight: "88vh",
                width: `min(92vw, ${current.width}px)`,
                aspectRatio: `${current.width} / ${current.height}`,
              }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="92vw"
                style={{ objectFit: "contain" }}
                priority
              />
            </motion.div>

            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: 0,
                right: 0,
                textAlign: "center",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.82rem",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                letterSpacing: "0.08em",
                pointerEvents: "none",
              }}
            >
              {String(open + 1).padStart(3, "0")} / {String(items.length).padStart(3, "0")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function navBtnStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: 18,
    transform: "translateY(-50%)",
    width: 48,
    height: 48,
    borderRadius: 999,
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  } as React.CSSProperties;
}
