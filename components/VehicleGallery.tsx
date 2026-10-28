"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";

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
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollInlineBy = useCallback(
    (dir: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const w = track.clientWidth;
      const current = Math.round(track.scrollLeft / w);
      const target = Math.max(0, Math.min(images.length - 1, current + dir));
      track.scrollTo({ left: target * w, behavior: "smooth" });
    },
    [images.length]
  );

  if (images.length === 0) return null;

  return (
    <div className="vehicle-gallery radius" style={{ background: "var(--paper-sunk)" }}>
      <div
        ref={trackRef}
        className="gallery-scroll"
        role="region"
        aria-label={`${brand} ${model} Fahrzeugbilder, horizontal wischen oder Pfeile verwenden`}
      >
        {images.map((src, i) => (
          <div key={`${src}-${i}`} className="gallery-slide">
            <Image
              src={src}
              alt={`${brand} ${model} ${variant} · Bild ${i + 1} von ${images.length}`}
              fill
              priority={i === 0}
              sizes="(min-width:1024px) 55vw, 100vw"
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Vorheriges Bild"
            onClick={() => scrollInlineBy(-1)}
            className="gallery-arrow gallery-arrow-left"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Nächstes Bild"
            onClick={() => scrollInlineBy(1)}
            className="gallery-arrow gallery-arrow-right"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="gallery-count-badge mono">{images.length} Bilder</div>
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
  );
}
