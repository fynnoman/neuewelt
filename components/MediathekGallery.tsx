"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { MediaItem } from "@/lib/mediathek";

type Props = {
  items: MediaItem[];
};

export default function MediathekGallery({ items }: Props) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const total = items.length;

  const goTo = useCallback(
    (next: number, dir: number) => {
      if (total === 0) return;
      const wrapped = ((next % total) + total) % total;
      setState([wrapped, dir]);
    },
    [total]
  );

  const nextSlide = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prevSlide = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      else if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextSlide, prevSlide]);

  if (total === 0) return null;

  const current = items[index];

  return (
    <section
      className="nwa-slideshow"
      aria-roledescription="carousel"
      aria-label="Fotostrecke Neue Welt Automobile"
    >
      <style>{`
        .nwa-slideshow {
          position: relative;
          width: 100%;
          height: calc(100svh - 72px);
          min-height: 420px;
          background: #0A0B0C;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: pan-y;
          user-select: none;
          -webkit-user-select: none;
        }
        .nwa-slide {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(12px, 3vw, 36px);
        }
        .nwa-slide-inner {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nwa-slide-inner img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          display: block;
          object-fit: contain;
        }
        .nwa-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transition: background 0.2s;
        }
        .nwa-arrow:hover { background: rgba(255,255,255,0.18); }
        .nwa-arrow.left { left: clamp(10px, 2vw, 24px); }
        .nwa-arrow.right { right: clamp(10px, 2vw, 24px); }
        @media (min-width: 1024px) {
          .nwa-arrow { width: 56px; height: 56px; }
        }
        .nwa-counter {
          position: absolute;
          bottom: clamp(14px, 2.5vw, 28px);
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.65);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          z-index: 3;
          pointer-events: none;
        }
      `}</style>

      <div
        style={{ position: "absolute", inset: 0 }}
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
          if (dx < 0) nextSlide();
          else prevSlide();
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            className="nwa-slide"
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="nwa-slide-inner">
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="100vw"
                priority
                style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Preload the next and previous image for smooth navigation */}
      <div style={{ display: "none" }} aria-hidden>
        <Image
          src={items[(index + 1) % total].src}
          alt=""
          width={items[(index + 1) % total].width}
          height={items[(index + 1) % total].height}
          priority
        />
        <Image
          src={items[(index - 1 + total) % total].src}
          alt=""
          width={items[(index - 1 + total) % total].width}
          height={items[(index - 1 + total) % total].height}
          priority
        />
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            className="nwa-arrow left"
            onClick={prevSlide}
            aria-label="Vorheriges Bild"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="nwa-arrow right"
            onClick={nextSlide}
            aria-label="Naechstes Bild"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      <div className="nwa-counter">
        {String(index + 1).padStart(3, "0")} / {String(total).padStart(3, "0")}
      </div>
    </section>
  );
}
