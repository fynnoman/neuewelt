"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import type { MediaItem } from "@/lib/mediathek";

type Props = {
  items: MediaItem[];
};

const THUMB_RADIUS_DESKTOP = 3;
const THUMB_RADIUS_MOBILE = 2;

export default function MediathekGallery({ items }: Props) {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const dragX = useMotionValue(0);
  const isAnimatingRef = useRef(false);

  const total = items.length;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setSlideWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (total === 0 || isAnimatingRef.current) return;
      const wrapped = ((next % total) + total) % total;
      setIndex(wrapped);
    },
    [total]
  );

  const nextSlide = useCallback(() => {
    if (isAnimatingRef.current || slideWidth === 0) return;
    isAnimatingRef.current = true;
    animate(dragX, -slideWidth, {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        setIndex((prev) => (prev + 1) % total);
        dragX.set(0);
        isAnimatingRef.current = false;
      },
    });
  }, [dragX, slideWidth, total]);

  const prevSlide = useCallback(() => {
    if (isAnimatingRef.current || slideWidth === 0) return;
    isAnimatingRef.current = true;
    animate(dragX, slideWidth, {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        setIndex((prev) => (prev - 1 + total) % total);
        dragX.set(0);
        isAnimatingRef.current = false;
      },
    });
  }, [dragX, slideWidth, total]);

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

  const prevItem = items[(index - 1 + total) % total];
  const currItem = items[index];
  const nextItem = items[(index + 1) % total];

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
          touch-action: pan-y;
          user-select: none;
          -webkit-user-select: none;
          background:
            radial-gradient(70% 55% at 50% 20%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 60%),
            radial-gradient(60% 60% at 50% 100%, rgba(214,208,196,0.5) 0%, rgba(239,237,230,0) 70%),
            linear-gradient(180deg, #f6f4ee 0%, #e9e6dc 100%);
        }

        .nwa-viewport {
          position: absolute;
          inset: 0;
          padding-bottom: clamp(130px, 18vh, 180px);
          overflow: hidden;
          z-index: 1;
        }
        .nwa-track {
          display: flex;
          width: 300%;
          height: 100%;
          margin-left: -100%;
          will-change: transform;
          cursor: grab;
        }
        .nwa-track:active { cursor: grabbing; }
        .nwa-cell {
          flex: 0 0 33.3333%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(12px, 3vw, 36px);
        }
        .nwa-cell > img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          display: block;
          object-fit: contain;
          border-radius: 10px;
          box-shadow:
            0 24px 64px -18px rgba(10,11,12,0.3),
            0 6px 20px -8px rgba(10,11,12,0.14);
          pointer-events: none;
        }

        .nwa-arrow {
          position: absolute;
          top: calc(50% - clamp(65px, 9vh, 90px));
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 999px;
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.7);
          color: var(--ink, #0A0B0C);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
          backdrop-filter: saturate(180%) blur(16px);
          -webkit-backdrop-filter: saturate(180%) blur(16px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.9),
            0 10px 24px -10px rgba(10,11,12,0.2);
          transition: background 0.2s, transform 0.2s;
        }
        .nwa-arrow:hover { background: rgba(255,255,255,0.82); transform: translateY(-50%) scale(1.05); }
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
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          border: 1px solid rgba(255,255,255,0.6);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.9),
            0 20px 40px -16px rgba(10,11,12,0.22);
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
          transition: opacity 0.2s, box-shadow 0.2s, width 0.2s, height 0.2s;
          outline: none;
        }
        @media (min-width: 1024px) {
          .nwa-thumb { height: 68px; width: 92px; border-radius: 12px; }
        }
        .nwa-thumb:hover { opacity: 0.9; }
        .nwa-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }
        .nwa-thumb-current {
          opacity: 1;
          height: 72px;
          width: 90px;
          box-shadow:
            0 0 0 2px var(--signal, #D01A20),
            0 10px 20px -8px rgba(10,11,12,0.35);
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

      <div className="nwa-viewport" ref={trackRef}>
        <motion.div
          className="nwa-track"
          style={{ x: dragX }}
          drag="x"
          dragDirectionLock
          dragConstraints={{ left: -slideWidth, right: slideWidth }}
          dragElastic={0.15}
          dragMomentum={false}
          onDragStart={() => {
            if (isAnimatingRef.current) return;
          }}
          onDragEnd={(_, info) => {
            if (isAnimatingRef.current || slideWidth === 0) return;
            const off = info.offset.x;
            const vel = info.velocity.x;
            const distThresh = slideWidth * 0.18;
            const velThresh = 450;
            if (off < -distThresh || vel < -velThresh) {
              isAnimatingRef.current = true;
              animate(dragX, -slideWidth, {
                type: "spring",
                stiffness: 320,
                damping: 36,
                mass: 0.9,
                onComplete: () => {
                  setIndex((prev) => (prev + 1) % total);
                  dragX.set(0);
                  isAnimatingRef.current = false;
                },
              });
            } else if (off > distThresh || vel > velThresh) {
              isAnimatingRef.current = true;
              animate(dragX, slideWidth, {
                type: "spring",
                stiffness: 320,
                damping: 36,
                mass: 0.9,
                onComplete: () => {
                  setIndex((prev) => (prev - 1 + total) % total);
                  dragX.set(0);
                  isAnimatingRef.current = false;
                },
              });
            } else {
              animate(dragX, 0, {
                type: "spring",
                stiffness: 350,
                damping: 32,
              });
            }
          }}
        >
          <div className="nwa-cell">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={prevItem.src} alt="" draggable={false} />
          </div>
          <div className="nwa-cell">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={currItem.src} alt={currItem.alt} draggable={false} />
          </div>
          <div className="nwa-cell">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={nextItem.src} alt="" draggable={false} />
          </div>
        </motion.div>
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
                onClick={() => goTo(absIdx)}
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
