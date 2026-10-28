"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type VehicleGalleryProps = {
  images: string[];
  brand: string;
  model: string;
  variant: string;
  color: string;
  year: number;
  mileage: number;
};

export default function VehicleGallery({
  images,
  brand,
  model,
  variant,
  color,
  year,
  mileage,
}: VehicleGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lightboxTrackRef = useRef<HTMLDivElement | null>(null);

  const open = useCallback((i: number) => setOpenIndex(i), []);
  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(() => {
    setOpenIndex((v) => (v == null ? 0 : (v + 1) % images.length));
  }, [images.length]);
  const prev = useCallback(() => {
    setOpenIndex((v) => (v == null ? 0 : (v - 1 + images.length) % images.length));
  }, [images.length]);

  // Keyboard-Steuerung + Body-Scroll-Lock
  useEffect(() => {
    if (openIndex == null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, next, prev]);

  // Beim Öffnen des Lightbox direkt zum richtigen Slide scrollen
  useEffect(() => {
    if (openIndex == null) return;
    const track = lightboxTrackRef.current;
    if (!track) return;
    const slide = track.children[openIndex] as HTMLElement | undefined;
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft, behavior: "instant" as ScrollBehavior });
    }
  }, [openIndex]);

  // Beim Scrollen im Lightbox den aktuellen Index aktualisieren
  const onLightboxScroll = useCallback(() => {
    const track = lightboxTrackRef.current;
    if (!track) return;
    const idx = Math.round(track.scrollLeft / track.clientWidth);
    if (idx !== openIndex && openIndex != null) setOpenIndex(idx);
  }, [openIndex]);

  if (images.length === 0) return null;

  return (
    <>
      {/* Inline-Carousel */}
      <div className="vehicle-gallery radius" style={{ background: "var(--paper-sunk)" }}>
        <div
          className="gallery-scroll"
          role="region"
          aria-label={`${brand} ${model} Fahrzeugbilder, horizontal wischen oder klicken für Vollansicht`}
        >
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              className="gallery-slide gallery-slide-button"
              onClick={() => open(i)}
              aria-label={`Bild ${i + 1} von ${images.length} vergrößern`}
            >
              <Image
                src={src}
                alt={`${brand} ${model} ${variant} · Bild ${i + 1} von ${images.length}`}
                fill
                priority={i === 0}
                sizes="(min-width:1024px) 55vw, 100vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {images.length > 1 && (
          <div className="gallery-count-badge mono">
            {images.length} Bilder · wischen oder klicken
          </div>
        )}

        <div
          className="absolute inset-x-0 bottom-0 flex items-center justify-between pointer-events-none"
          style={{
            padding: "18px 22px",
            background: "linear-gradient(180deg, transparent, rgba(10,11,12,0.72))",
            color: "var(--paper)",
            fontSize: "0.92rem",
          }}
        >
          <span>
            {brand} {model} · {color}
          </span>
          <span style={{ color: "rgba(251,251,249,0.72)", fontSize: "0.8rem" }}>
            EZ {year} · {mileage.toLocaleString("de-DE")} km
          </span>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openIndex != null && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-[80] flex items-center justify-center"
            style={{ background: "rgba(10,11,12,0.94)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={close}
            role="dialog"
            aria-modal
            aria-label="Bildvollansicht"
          >
            {/* Close */}
            <button
              type="button"
              aria-label="Vollansicht schließen"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              style={{
                position: "absolute",
                top: "max(16px, env(safe-area-inset-top))",
                right: "max(16px, env(safe-area-inset-right))",
                zIndex: 2,
                width: 44,
                height: 44,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 999,
                background: "rgba(255,255,255,0.1)",
                color: "var(--paper)",
                border: "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            {/* Prev */}
            {images.length > 1 && (
              <button
                type="button"
                aria-label="Vorheriges Bild"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="hidden md:inline-flex"
                style={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  width: 52,
                  height: 52,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.1)",
                  color: "var(--paper)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  cursor: "pointer",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {/* Next */}
            {images.length > 1 && (
              <button
                type="button"
                aria-label="Nächstes Bild"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="hidden md:inline-flex"
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  width: 52,
                  height: 52,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.1)",
                  color: "var(--paper)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  cursor: "pointer",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {/* Lightbox-Carousel (swipeable) */}
            <div
              ref={lightboxTrackRef}
              onScroll={onLightboxScroll}
              onClick={(e) => e.stopPropagation()}
              className="lightbox-scroll"
            >
              {images.map((src, i) => (
                <div key={`lb-${src}-${i}`} className="lightbox-slide">
                  <Image
                    src={src}
                    alt={`${brand} ${model} ${variant} · Vollansicht Bild ${i + 1} von ${images.length}`}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "contain" }}
                    quality={95}
                    priority={i === openIndex}
                  />
                </div>
              ))}
            </div>

            {/* Zähler */}
            <div
              className="mono"
              style={{
                position: "absolute",
                bottom: "max(20px, env(safe-area-inset-bottom))",
                left: 0,
                right: 0,
                textAlign: "center",
                color: "rgba(251,251,249,0.8)",
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                pointerEvents: "none",
              }}
            >
              {openIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
