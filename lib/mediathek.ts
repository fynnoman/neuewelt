export type MediaItem = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

// Bilder in /public/mediathek/ ablegen und hier referenzieren.
// Werte für width/height sind native Bildmaße (für korrektes Aspect-Ratio).
export const MEDIATHEK: MediaItem[] = [
  // Beispielplatzhalter — ersetzen durch echte Dateien in /public/mediathek/
  // { src: "/mediathek/fahrzeug-01.jpg", alt: "Fahrzeug 01", caption: "Showroom", width: 1600, height: 1067 },
];
