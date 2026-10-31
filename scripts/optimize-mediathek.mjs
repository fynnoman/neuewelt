#!/usr/bin/env node
// Batch-Optimierer fuer public/mediathek/.
//
// Nimmt alle JPG/JPEG/PNG/HEIC in /public/mediathek/, skaliert auf max 2400px
// Kantenlaenge, konvertiert zu WebP (Q82), ersetzt das Original durch die
// WebP-Variante und benennt es nummeriert um (mediathek-001.webp usw.).
//
// Aufruf:
//   node scripts/optimize-mediathek.mjs           # Dry-run, nur Vorschau
//   node scripts/optimize-mediathek.mjs --apply   # Wirklich schreiben
//   node scripts/optimize-mediathek.mjs --apply --max=2000 --quality=85

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIR = path.join(process.cwd(), "public", "mediathek");
const SUPPORTED = /\.(jpe?g|png|webp|heic|tiff?)$/i;

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    apply: args.includes("--apply"),
    max: Number(args.find((a) => a.startsWith("--max="))?.split("=")[1] ?? 2400),
    quality: Number(args.find((a) => a.startsWith("--quality="))?.split("=")[1] ?? 82),
    prefix: args.find((a) => a.startsWith("--prefix="))?.split("=")[1] ?? "mediathek",
  };
}

async function listSources(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`Verzeichnis fehlt: ${dir}`);
      process.exit(1);
    }
    throw err;
  }
  return entries
    .filter((e) => e.isFile() && SUPPORTED.test(e.name))
    .map((e) => path.join(dir, e.name))
    .sort();
}

function human(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function run() {
  const { apply, max, quality, prefix } = parseArgs();
  const sources = await listSources(DIR);

  if (sources.length === 0) {
    console.log("Keine Bilder in public/mediathek/ gefunden.");
    return;
  }

  console.log(
    `${apply ? "Verarbeite" : "DRY RUN - zeigt nur, was passieren wuerde"} ` +
      `${sources.length} Bilder (max ${max}px, Q${quality}, Prefix "${prefix}")`
  );
  console.log("");

  const pad = String(sources.length).length;
  let totalBefore = 0;
  let totalAfter = 0;
  let i = 0;

  for (const src of sources) {
    i++;
    const num = String(i).padStart(Math.max(3, pad), "0");
    const targetName = `${prefix}-${num}.webp`;
    const target = path.join(DIR, targetName);

    const beforeStat = await fs.stat(src);
    totalBefore += beforeStat.size;

    const img = sharp(src, { failOn: "none" }).rotate();
    const meta = await img.metadata();

    const needsResize = (meta.width ?? 0) > max || (meta.height ?? 0) > max;

    let pipeline = img;
    if (needsResize) {
      pipeline = pipeline.resize({
        width: max,
        height: max,
        fit: "inside",
        withoutEnlargement: true,
      });
    }
    pipeline = pipeline.webp({ quality, effort: 5 });

    if (!apply) {
      console.log(
        `  ${num} ${path.basename(src).padEnd(40)} ` +
          `${String(meta.width ?? "?").padStart(5)}x${String(meta.height ?? "?").padEnd(5)} ` +
          `${human(beforeStat.size).padStart(9)} -> ${targetName}`
      );
      continue;
    }

    const buffer = await pipeline.toBuffer();
    await fs.writeFile(target, buffer);
    const afterSize = buffer.length;
    totalAfter += afterSize;

    if (path.resolve(src) !== path.resolve(target)) {
      await fs.unlink(src);
    }

    console.log(
      `  ${num} ${path.basename(src).padEnd(40)} ` +
        `${human(beforeStat.size).padStart(9)} -> ${human(afterSize).padStart(9)} ` +
        `(${targetName})`
    );
  }

  console.log("");
  if (apply) {
    console.log(
      `Fertig. ${human(totalBefore)} -> ${human(totalAfter)} ` +
        `(${((1 - totalAfter / totalBefore) * 100).toFixed(0)}% kleiner)`
    );
  } else {
    console.log("DRY RUN beendet. Mit --apply wirklich schreiben.");
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
