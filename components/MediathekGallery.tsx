"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { MediaItem } from "@/lib/mediathek";

type Props = {
  items: MediaItem[];
};

const THUMB_RADIUS_DESKTOP = 3;
const THUMB_RADIUS_MOBILE = 2;

export default function MediathekGallery({ items }: Props) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [isMobile, setIsMobile] = useState(false);

  const total = items.length;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

  const thumbRadius = isMobile ? THUMB_RADIUS_MOBILE : THUMB_RADIUS_DESKTOP;

  const thumbs = useMemo(() => {
    if (total === 0) return [];
    const out: Array<{ item: MediaItem; absIdx: number; offset: number }> = [];
    for (let o = -thumbRadius; o <= thumbRadius; o++) {
      const absIdx = ((index + o) % total + total) % total;
      out.push({ item: items[absIdx], absIdx, offset: o });
    }
    return out;
  }, [index, items, total, thumbRadius]);

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
          min-height: 460px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: pan-y;
          user-select: none;
          -webkit-user-select: none;
          background: var(--paper-sunk, #efede6);
        }
        .nwa-bg {
          position: absolute;
          inset: -8%;
          z-index: 0;
          filter: blur(28px) saturate(140%);
          transform: scale(1.08) translateZ(0);
          opacity: 0.55;
          pointer-events: none;
          will-change: opacity;
        }
        .nwa-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .nwa-bg-tint {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(80% 60% at 50% 30%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%),
            linear-gradient(180deg, rgba(251,251,249,0.35) 0%, rgba(239,237,230,0.6) 100%);
        }
        .nwa-slide {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(12px, 3vw, 36px);
          padding-bottom: clamp(130px, 18vh, 180px);
          will-change: transform, opacity;
          cursor: grab;
        }
        .nwa-slide:active { cursor: grabbing; }
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
          border-radius: 10px;
          box-shadow:
            0 24px 64px -18px rgba(10,11,12,0.35),
            0 6px 20px -8px rgba(10,11,12,0.18);
        }

        .nwa-arrow {
          position: absolute;
          top: calc(50% - clamp(65px, 9vh, 90px));
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 999px;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.7);
          color: var(--ink, #0A0B0C);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.9),
            0 10px 24px -10px rgba(10,11,12,0.25);
          transition: background 0.2s, transform 0.2s;
        }
        .nwa-arrow:hover { background: rgba(255,255,255,0.78); transform: translateY(-50%) scale(1.05); }
        .nwa-arrow.left { left: clamp(10px, 2vw, 24px); }
        .nwa-arrow.right { right: clamp(10px, 2vw, 24px); }
        @media (min-width: 1024px) {
          .nwa-arrow { width: 56px; height: 56px; }
        }

        .nwa-thumbs-wrap {
          position: absolute;
          bottom: clamp(14px, 2.5vw, 26px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          max-width: calc(100% - 24px);
        }
        .nwa-thumbs {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 20px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.46) 100%),
            rgba(251,251,249,0.4);
          backdrop-filter: saturate(180%) blur(32px);
          -webkit-backdrop-filter: saturate(180%) blur(32px);
          border: 1px solid rgba(255,255,255,0.6);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.9),
            0 20px 40px -16px rgba(10,11,12,0.28);
        }
        @media (min-width: 1024px) {
          .nwa-thumbs { gap: 10px; padding: 12px 16px; border-radius: 24px; }
        }
        .nwa-thumb {
          padding: 0;
          margin: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          display: block;
          position: relative;
          height: 56px;
          width: 70px;
          overflow: hidden;
          border-radius: 10px;
          flex-shrink: 0;
          opacity: 0.5;
          transition: opacity 0.25s, transform 0.25s, width 0.25s, height 0.25s;
          outline: none;
        }
        @media (min-width: 1024px) {
          .nwa-thumb { height: 68px; width: 92px; border-radius: 12px; }
        }
        .nwa-thumb:hover { opacity: 0.85; }
        .nwa-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .nwa-thumb-current {
          opacity: 1;
          height: 72px;
          width: 90px;
          box-shadow:
            0 0 0 2px var(--signal, #D01A20),
            0 10px 20px -8px rgba(10,11,12,0.4);
        }
        @media (min-width: 1024px) {
          .nwa-thumb-current { height: 90px; width: 120px; }
        }
        .nwa-counter {
          display: block;
          text-align: center;
          margin-top: 10px;
          color: rgba(10,11,12,0.5);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          pointer-events: none;
        }
      `}</style>

      {/* Blurred backdrop of current image for the glass feel */}
      <div className="nwa-bg" aria-hidden>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={`bg-${index}`}
            src={current.src}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </div>
      <div className="nwa-bg-tint" aria-hidden />

      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            className="nwa-slide"
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 80 : -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -80 : 80 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              const dx = info.offset.x;
              const vx = info.velocity.x;
              const flickVel = 400;
              const minDist = 60;
              if (dx < -minDist || vx < -flickVel) nextSlide();
              else if (dx > minDist || vx > flickVel) prevSlide();
            }}
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

      {/* Preload neighbors */}
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

      {total > 1 && (
        <div className="nwa-thumbs-wrap">
          <div className="nwa-thumbs">
            {thumbs.map(({ item, absIdx, offset }) => (
              <button
                key={`thumb-${offset}-${absIdx}`}
                type="button"
                className={`nwa-thumb${offset === 0 ? " nwa-thumb-current" : ""}`}
                onClick={() => goTo(absIdx, offset >= 0 ? 1 : -1)}
                aria-label={`Zum Bild ${absIdx + 1} springen`}
                aria-current={offset === 0 ? "true" : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
          <div className="nwa-counter">
            {String(index + 1).padStart(3, "0")} / {String(total).padStart(3, "0")}
          </div>
        </div>
      )}
    </section>
  );
}
