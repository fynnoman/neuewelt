"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { MediaItem } from "@/lib/mediathek";

type Props = {
  items: MediaItem[];
};

const THUMB_RADIUS_DESKTOP = 3;
const THUMB_RADIUS_MOBILE = 2;
const SNAP_MS = 320;
const SNAP_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function MediathekGallery({ items }: Props) {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);

  // mutable refs so pointer handlers don't trigger re-renders
  const indexRef = useRef(0);
  const slideWidthRef = useRef(0);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, t: 0 });
  const dragOffset = useRef(0);
  const lastMove = useRef({ x: 0, t: 0 });
  const axisLocked = useRef<"x" | "y" | null>(null);
  const snapping = useRef(false);

  const total = items.length;

  // keep refs in sync with state
  useEffect(() => {
    indexRef.current = index;
  }, [index]);
  useEffect(() => {
    slideWidthRef.current = slideWidth;
  }, [slideWidth]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // measure viewport (one slide width)
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setSlideWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // write the track transform imperatively (no React state in the hot path)
  const applyTransform = useCallback((baseIdx: number, offset: number, animate: boolean) => {
    const el = trackRef.current;
    if (!el || slideWidthRef.current === 0) return;
    const base = -baseIdx * slideWidthRef.current;
    el.style.transition = animate ? `transform ${SNAP_MS}ms ${SNAP_EASE}` : "none";
    el.style.transform = `translate3d(${base + offset}px, 0, 0)`;
  }, []);

  // whenever index or slide width changes and we're not mid-swipe, re-pin
  useLayoutEffect(() => {
    if (snapping.current) return;
    applyTransform(index, 0, false);
  }, [index, slideWidth, applyTransform]);

  const snapTo = useCallback(
    (newIdx: number) => {
      if (snapping.current || slideWidthRef.current === 0 || total === 0) return;
      const wrapped = ((newIdx % total) + total) % total;
      snapping.current = true;
      // animate from current (indexRef at offset 0 OR wherever) to new baseline
      // We animate the track from its current translateX to the target.
      // Target translateX = -wrapped * slideWidth. During snap, we treat the drag
      // offset as 0 relative to the new base.
      applyTransform(wrapped, 0, true);

      const el = trackRef.current;
      const done = () => {
        snapping.current = false;
        dragOffset.current = 0;
        if (indexRef.current !== wrapped) {
          indexRef.current = wrapped;
          setIndex(wrapped);
        }
        el?.removeEventListener("transitionend", done);
      };
      // Fallback timer in case transitionend is missed
      el?.addEventListener("transitionend", done, { once: true });
      window.setTimeout(done, SNAP_MS + 60);
    },
    [applyTransform, total]
  );

  // Pointer handling
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const onDown = (e: PointerEvent) => {
      if (snapping.current) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging.current = true;
      axisLocked.current = null;
      dragStart.current = { x: e.clientX, y: e.clientY, t: performance.now() };
      lastMove.current = { x: e.clientX, t: performance.now() };
      dragOffset.current = 0;
      // Don't call setPointerCapture yet — wait until axis is locked to X.
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;

      if (!axisLocked.current) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        axisLocked.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axisLocked.current === "y") {
          dragging.current = false;
          return;
        }
        // We're swiping horizontally — capture the pointer so we keep events
        try {
          vp.setPointerCapture(e.pointerId);
        } catch {}
      }

      if (axisLocked.current !== "x") return;

      // Rubber-band at ends: not strictly needed with wrap-around, but applies
      // a small resistance for visual feedback.
      let offset = dx;
      const sw = slideWidthRef.current;
      if (sw > 0) {
        const max = sw;
        if (offset > max) offset = max + (offset - max) * 0.25;
        else if (offset < -max) offset = -max + (offset + max) * 0.25;
      }
      dragOffset.current = offset;
      applyTransform(indexRef.current, offset, false);

      const now = performance.now();
      lastMove.current = { x: e.clientX, t: now };
      // Only call preventDefault if we have a non-passive listener. We attach
      // via { passive: false } below, so this is OK.
      if (e.cancelable) e.preventDefault();
    };

    const finish = (clientX: number) => {
      if (!dragging.current) return;
      dragging.current = false;

      if (axisLocked.current !== "x") {
        axisLocked.current = null;
        return;
      }
      axisLocked.current = null;

      const sw = slideWidthRef.current;
      const offset = dragOffset.current;
      const now = performance.now();
      const dt = Math.max(1, now - lastMove.current.t);
      const velocity = ((clientX - lastMove.current.x) / dt) * 1000; // px/s

      const distThresh = sw * 0.18;
      const velThresh = 450;

      if (offset < -distThresh || velocity < -velThresh) {
        snapTo(indexRef.current + 1);
      } else if (offset > distThresh || velocity > velThresh) {
        snapTo(indexRef.current - 1);
      } else {
        snapTo(indexRef.current);
      }
    };

    const onUp = (e: PointerEvent) => {
      try {
        vp.releasePointerCapture(e.pointerId);
      } catch {}
      finish(e.clientX);
    };
    const onCancel = (e: PointerEvent) => {
      try {
        vp.releasePointerCapture(e.pointerId);
      } catch {}
      if (!dragging.current) return;
      dragging.current = false;
      axisLocked.current = null;
      snapTo(indexRef.current);
    };

    vp.addEventListener("pointerdown", onDown);
    vp.addEventListener("pointermove", onMove, { passive: false });
    vp.addEventListener("pointerup", onUp);
    vp.addEventListener("pointercancel", onCancel);
    return () => {
      vp.removeEventListener("pointerdown", onDown);
      vp.removeEventListener("pointermove", onMove);
      vp.removeEventListener("pointerup", onUp);
      vp.removeEventListener("pointercancel", onCancel);
    };
  }, [applyTransform, snapTo]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") snapTo(indexRef.current + 1);
      else if (e.key === "ArrowLeft") snapTo(indexRef.current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [snapTo]);

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
          touch-action: pan-y;
        }
        .nwa-track {
          display: flex;
          height: 100%;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          cursor: grab;
        }
        .nwa-track:active { cursor: grabbing; }
        .nwa-cell {
          flex: 0 0 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(12px, 3vw, 36px);
          contain: layout paint;
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
          -webkit-user-drag: none;
          user-select: none;
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

      <div className="nwa-viewport" ref={viewportRef}>
        <div ref={trackRef} className="nwa-track">
          {items.map((it, i) => {
            const dist = Math.min(
              Math.abs(i - index),
              Math.abs(i - index - total),
              Math.abs(i - index + total)
            );
            return (
              <div key={it.src} className="nwa-cell">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={it.src}
                  alt={i === index ? it.alt : ""}
                  draggable={false}
                  loading={dist <= 2 ? "eager" : "lazy"}
                  decoding={dist <= 1 ? "sync" : "async"}
                  fetchPriority={dist === 0 ? "high" : "low"}
                />
              </div>
            );
          })}
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            className="nwa-arrow left"
            onClick={() => snapTo(indexRef.current - 1)}
            aria-label="Vorheriges Bild"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="nwa-arrow right"
            onClick={() => snapTo(indexRef.current + 1)}
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
                onClick={() => snapTo(absIdx)}
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
