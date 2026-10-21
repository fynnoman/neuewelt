"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export type Scene = {
  id: string;
  image: string;
  caption: string;
};

type Props = {
  scenes: Scene[];
  // children = scrolling column
  children: React.ReactNode;
  heightClass?: string;
};

export default function StickyStage({ scenes, children }: Props) {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.scene);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { threshold: 0.55 }
    );
    sectionsRef.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [reduced]);

  const scene = scenes[active] ?? scenes[0];

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.08fr] gap-3 px-3">
      {/* Reading column (scrolls) */}
      <div className="order-2 lg:order-1 py-16 lg:py-24">
        <div className="mx-auto measure" style={{ paddingLeft: "clamp(0px, 2vw, 32px)" }}>
          {Array.isArray(children)
            ? (children as React.ReactElement[]).map((child, i) => (
                <div
                  key={i}
                  data-scene={i}
                  ref={(el) => {
                    if (el) sectionsRef.current[i] = el;
                  }}
                  className="min-h-[72svh] flex flex-col justify-center py-10"
                >
                  {child}
                </div>
              ))
            : children}
        </div>
      </div>

      {/* Sticky stage (horizon photo) */}
      <div className="order-1 lg:order-2">
        <div
          ref={stageRef}
          className="relative overflow-hidden rounded-[var(--radius)]"
          style={{
            position: "sticky",
            top: "12px",
            height: "calc(100svh - 24px)",
            background: "var(--paper-sunk)",
          }}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${scene.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-hidden
            />
          </AnimatePresence>

          {/* Soft scrim for low-contrast legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(14,15,16,0.0) 55%, rgba(14,15,16,0.42) 100%)",
            }}
            aria-hidden
          />

          {/* Caption bar */}
          <div
            className="absolute inset-x-0 bottom-0 flex items-center justify-between"
            style={{
              padding: "18px 22px",
              background: "rgba(251,251,249,0.92)",
              color: "var(--ink)",
              fontSize: "0.92rem",
              letterSpacing: "-0.005em",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={scene.id + "-cap"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5 }}
              >
                {scene.caption}
              </motion.span>
            </AnimatePresence>
            <span style={{ color: "var(--muted)", fontSize: "0.8rem" }}>
              {String(active + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}
            </span>
          </div>

          {/* Signal mark — the compass */}
          <div
            className="absolute left-5 top-5 flex items-center gap-2"
            style={{ color: "var(--paper)", fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                background: "var(--signal)",
                display: "inline-block",
                borderRadius: "var(--radius)",
              }}
            />
            Horizont
          </div>
        </div>
      </div>
    </div>
  );
}
