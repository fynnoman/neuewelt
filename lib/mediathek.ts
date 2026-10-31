import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

export type MediaItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const MEDIA_DIR = path.join(process.cwd(), "public", "mediathek");
const SUPPORTED = /\.(webp|jpe?g|png|avif)$/i;

let cache: MediaItem[] | null = null;

export async function getMediathek(): Promise<MediaItem[]> {
  if (cache) return cache;

  let entries;
  try {
    entries = await fs.readdir(MEDIA_DIR, { withFileTypes: true });
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      cache = [];
      return cache;
    }
    throw err;
  }

  const files = entries
    .filter((e) => e.isFile() && SUPPORTED.test(e.name))
    .map((e) => e.name)
    .sort();

  const items: MediaItem[] = [];
  for (const name of files) {
    const abs = path.join(MEDIA_DIR, name);
    try {
      const meta = await sharp(abs, { failOn: "none" }).metadata();
      const width = meta.width ?? 1600;
      const height = meta.height ?? 1067;
      items.push({
        src: `/mediathek/${name}`,
        alt: "",
        width,
        height,
      });
    } catch (err) {
      console.warn(`[mediathek] Dimensionen fuer ${name} nicht lesbar:`, err);
    }
  }

  cache = items;
  return cache;
}
