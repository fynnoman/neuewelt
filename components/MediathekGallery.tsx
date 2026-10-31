"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { MediaItem } from "@/lib/mediathek";

type Props = {
  items: MediaItem[];
};

const BENTO_COUNT = 5;

export default function MediathekGallery({ items }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const bento = useMemo(() => items.slice(0, BENTO_COUNT), [items]);
  const masonry = useMemo(() => items.slice(BENTO_COUNT), [items]);

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
        .nwa-bento {
          display: grid;
          grid-template-columns: 1fr;
          grid-auto-rows: 56vw;
          gap: 10px;
        }
        .nwa-bento > button { padding: 0; margin: 0; border: 0; background: transparent; cursor: zoom-in; display: block; position: relative; overflow: hidden; border-radius: 14px; }
        @media (min-width: 640px) {
          .nwa-bento {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 220px;
            gap: 12px;
          }
          .nwa-bento > button:nth-child(1) { grid-column: span 2; grid-row: span 2; }
        }
        @media (min-width: 1024px) {
          .nwa-bento {
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 230px;
            gap: 14px;
          }
          .nwa-bento > button:nth-child(1) { grid-column: span 2; grid-row: span 2; }
          .nwa-bento > button:nth-child(2) { grid-column: span 2; grid-row: span 1; }
          .nwa-bento > button:nth-child(3) { grid-column: span 1; grid-row: span 1; }
          .nwa-bento > button:nth-child(4) { grid-column: span 1; grid-row: span 1; }
          .nwa-bento > button:nth-child(5) { grid-column: span 4; grid-row: span 1; }
        }

        .nwa-masonry {
          column-count: 1;
          column-gap: 10px;
          margin-top: 10px;
        }
        @media (min-width: 640px) {
          .nwa-masonry { column-count: 2; column-gap: 12px; margin-top: 12px; }
        }
        @media (min-width: 1024px) {
          .nwa-masonry { column-count: 3; column-gap: 14px; margin-top: 14px; }
        }
        .nwa-masonry > button {
          display: block;
          width: 100%;
          padding: 0;
          margin: 0 0 10px 0;
          border: 0;
          background: transparent;
          cursor: zoom-in;
          break-inside: avoid;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }
        @media (min-width: 640px) {
          .nwa-masonry > button { margin-bottom: 12px; border-radius: 14px; }
        }
        @media (min-width: 1024px) {
          .nwa-masonry > button { margin-bottom: 14px; }
        }

        .nwa-tile-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nwa-bento > button:hover .nwa-tile-img,
        .nwa-masonry > button:hover .nwa-tile-img {
          transform: scale(1.03);
        }
      `}</style>

      <div className="nwa-bento">
        {bento.map((it, i) => (
          <button
            key={it.src}
            type="button"
            onClick={() => openAt(i)}
            aria-label="Bild in Vollansicht oeffnen"
          >
            <Image
              src={it.src}
              alt={it.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="nwa-tile-img"
              priority={i === 0}
            />
          </button>
        ))}
      </div>

      <div className="nwa-masonry">
        {masonry.map((it, i) => (
          <button
            key={it.src}
            type="button"
            onClick={() => openAt(i + BENTO_COUNT)}
            aria-label="Bild in Vollansicht oeffnen"
            style={{ aspectRatio: `${it.width} / ${it.height}` }}
          >
            <Image
              src={it.src}
              alt={it.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="nwa-tile-img"
              loading="lazy"
            />
          </button>
        ))}
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
